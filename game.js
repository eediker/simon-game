var userClickedPattern = [];
var gamePattern = [];

var gameStart = false;
var level = 0;

var buttonColors = ["red","blue","green","yellow"];

$(document).on("keypress",function(){
    if(!gameStart){
      gameStart = true;
      nextSequence();
      $("#level-title").text("Level " + level);
    }
});

$(".btn").on("click",function(){
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000)
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    startOver();
  }
}


function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push("randomChosenColor");

  $("#" + randomChosenColor).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);

  playSound(randomChosenColor);



}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  },100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStart = false;
}
