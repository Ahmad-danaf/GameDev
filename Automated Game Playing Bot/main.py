from selenium.webdriver.common.by import By
from selenium import webdriver
import time

options = webdriver.ChromeOptions()
options.add_experimental_option("detach", True)
driver = webdriver.Chrome(options=options)
driver.get('https://orteil.dashnet.org/experiments/cookie/')


cookie = driver.find_element(By.ID,'cookie')

# Get upgrade item ids.
items = driver.find_elements(by=By.CSS_SELECTOR, value="#store div")
item_ids = [item.get_attribute("id") for item in items]

timeout = time.time() + 7
seven_min = time.time() + 60*7  # 7 minutes

while True:
    cookie.click()

    # Every 7 seconds:
    if time.time() > timeout:

        # Get all upgrade b tags
        prices = driver.find_elements(by=By.CSS_SELECTOR, value="#store b")
        item_prices = []

        # Convert <b> text into an integer price.
        for price in prices:
            element_text = price.text
            if element_text != "":
                cost = int(element_text.split("-")[1].strip().replace(",", ""))
                item_prices.append(cost)

        # Create dictionary of store items and prices
        cookie_upgrades = {}
        for n in range(len(item_prices)):
            cookie_upgrades[item_prices[n]] = item_ids[n]

        # Get current cookie count
        money_element = driver.find_element(by=By.ID, value="money").text
        if "," in money_element:
            money_element = money_element.replace(",", "")
        cookies_money = int(money_element)

        # Find upgrades that we can currently afford
        affordable_upgrades = {}
        for cost, id in cookie_upgrades.items():
            if cookies_money > cost:
                affordable_upgrades[cost] = id

        # Purchase the most expensive affordable upgrade
        to_purchase_id = affordable_upgrades[max(affordable_upgrades)]

        driver.find_element(by=By.ID, value=to_purchase_id).click()

        # Add another 7 seconds until the next check
        timeout = time.time() + 7

    # After 7 minutes stop the bot and check the cookies per second count.
    if time.time() > seven_min:
        cookie_per_s = driver.find_element(by=By.ID, value="cps").text
        print(cookie_per_s)
        driver.quit()
        break

