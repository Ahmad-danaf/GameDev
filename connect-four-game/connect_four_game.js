var playerOne=prompt("Please enter player One name:");
var playerTwo=prompt("please enter player Two name:");
var gameOn = true;
var turn = 0;
var currentColor= 'red';

function updateInstructions(){
    var ins_text= $("#instructions_text");
    if(turn % 2 == 0){
        ins_text.text(playerOne +" :it is your turn, please pick a column to drop your red chip");
        ins_text.css("color","red");
        currentColor= 'red';
    }
    else{
        ins_text.text(playerTwo +" :it is your turn, please pick a column to drop your yellow chip");
        ins_text.css("color","yellow");
        currentColor= 'yellow';
    }
    turn++;
}

updateInstructions();

var board=$("table tr");

function reportWin(rowNum,colNum)
{
    console.log("You won starting at this row: no "+rowNum+",col: "+colNum+" .");
}

function changeColor(rowIndex,colIndex,color)
{
    return board.eq(rowIndex).find('td').eq(colIndex).find("button").css("background-color",color);
}
function returnColor(rowIndex,colIndex)
{
    return board.eq(rowIndex).find('td').eq(colIndex).find("button").css("background-color");
}

function checkBottom(colIndex) {

    for(row=5;row>=0;row--)
    {
        var colorReport =returnColor(row,colIndex);
        if(colorReport == 'rgb(0, 0, 255)') /* check if the color is blue */
        {
            return row;
        }
    }
    
}
// Check to see if 4 inputs are the same color
function colorMatchCheck(one,two,three,four){
    return (one===two && one===three && one===four && one !== 'rgb(0, 0, 255)' && one !== undefined);
  }

// Check for Horizontal Wins
function horizontalWinCheck() {
    for (var row = 0; row < 6; row++) {
      for (var col = 0; col < 4; col++) {
        if (colorMatchCheck(returnColor(row,col), returnColor(row,col+1) ,returnColor(row,col+2), returnColor(row,col+3))) {
          console.log('horiz');
          reportWin(row,col);
          return true;
        }else {
          continue;
        }
      }
    }
  }
  
  // Check for Vertical Wins
  function verticalWinCheck() {
    for (var col = 0; col < 7; col++) {
      for (var row = 0; row < 3; row++) {
        if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col) ,returnColor(row+2,col), returnColor(row+3,col))) {
          console.log('vertical');
          reportWin(row,col);
          return true;
        }else {
          continue;
        }
      }
    }
  }
  
  // Check for Diagonal Wins
  function diagonalWinCheck() {
    for (var col = 0; col < 5; col++) {
      for (var row = 0; row < 7; row++) {
        if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
          console.log('diag');
          reportWin(row,col);
          return true;
        }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
          console.log('diag');
          reportWin(row,col);
          return true;
        }else {
          continue;
        }
      }
    }
  }
  
  function gameEnd() {
    gameOn = false;
    var winningPlayer = " ";
    if (turn % 2 == 0) {
        winningPlayer = playerTwo;
    } else {
        winningPlayer = playerOne;
    }

    $('h1').text(winningPlayer + " has won! Refresh your browser to play again!").css("fontSize", "50px");
    $('#instructions_text').hide('fast');
}

  

    
  $('.board button').on('click',function() {
        // Recognize what column was chosen
        var col = $(this).closest("td").index();
        if(gameOn){
        // Get back bottom available row to change
        var bottomAvail = checkBottom(col);
  
        // Drop the chip in that column at the bottomAvail Row
        changeColor(bottomAvail,col,currentColor);
    
          // Check for a win or a tie.
    if (horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        gameEnd();
        } 
    
        updateInstructions();
        
    }
        
    })