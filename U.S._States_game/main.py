import turtle
import pandas

data = pandas.read_csv('50_states.csv')
states = data['state'].to_list()
guessed_states = []

screen = turtle.Screen()
screen.title("U.S. States Game")
img = 'blank_states_img.gif'
turtle.addshape(img)
turtle.shape(img)


while len(guessed_states) < 50:
    user_answer = screen.textinput(title=f"{len(guessed_states)}/50 States Correct",
                                   prompt="what's another state's name?").title()
    if user_answer == "Exit":
        break
    if user_answer in states:
        guessed_states.append(user_answer)
        t = turtle.Turtle()
        t.hideturtle()
        t.penup()
        state_data = data[data['state'] == user_answer]
        t.goto(int(state_data.x), int(state_data.y))
        t.write(user_answer)


missing_states = [s for s in states if s not in guessed_states]
# for s in states:
#     if s not in guessed_states:
#         missing_states.append(s)



new_data = pandas.DataFrame(missing_states)
new_data.to_csv("missing_states.csv")