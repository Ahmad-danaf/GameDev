var buttonColours =["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var gameOn=false;
let level = 0;
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    let randomNum = Math.floor(Math.random() * 4);
    randomChosenColour =buttonColours[randomNum];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(document).keydown(function (e) { 
    if(!gameOn){
        $("h1").text("Level "+level);
        nextSequence();
        gameOn=true
    }
});

// user press on button
$(".btn").click(function(){    
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1)
});

function playSound(name){
    var filepath='sounds/'+name+'.mp3';
    var audio = new Audio(filepath);
    audio.play();
}

function animatePress(currColour){
    $("#"+currColour).addClass("pressed");
    setTimeout(()=>{
        $("#"+currColour).removeClass("pressed");
    },100);
}

function checkAnswer(currLevel){
    console.log("################################################################")
    console.log(currLevel);
    console.log(userClickedPattern);
    console.log(gamePattern);
    
    if(userClickedPattern[currLevel]==gamePattern[currLevel]){
        console.log("success");
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(()=>{
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Wrong!");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    gameOn=false;
}