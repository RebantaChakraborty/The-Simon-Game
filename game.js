let level=0;
let started=false;
userClickedPattern=[]
gamePattern=[];
buttonColors=["red","blue","green","yellow"];
function nextSequence(){
    userClickedPattern=[];
    randomNumber=Math.round(Math.random()*3);
    randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor);
   $("#level-title").text("level "+level);
   ++level;
}
function playSound(name){
    var audio=new Audio(name+".mp3");
    audio.muted=true;
    audio.play();
    audio.muted=false;
    audio.play();
}
function animatePress(currentColour){
   
    $(`#${currentColour}`).addClass("pressed");
    setTimeout(function(){
        $(`#${currentColour}`).removeClass("pressed");

    },100);

}
function checkPattern(currentLevel){
   
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("Success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("Unsuccessful");
        let wrong=new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        
        setTimeout(function(){
            $("body").removeClass("game-over");

        },200);
        $("#level-title").text("Game Over , Press Any Key to Restart");
        startOver();
    }

    
    
}
function startOver(){
    gamePattern=[];
    level=0;
    started=false;
}


$(".btn").click(function(e){
    let userChosenColor=e.target.id;
   userClickedPattern.push(userChosenColor);
   playSound(userChosenColor);
   animatePress(userChosenColor);
   checkPattern(userClickedPattern.length-1);

  
    
})
$(document).keydown(function(e){
    if(!started){
        $("#level-title").text("level "+level);
          nextSequence();
          started=true;
        
    }
    
})


