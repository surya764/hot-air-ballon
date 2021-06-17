var balloon,balloonImage1,balloonImage2;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  createCanvas(800,400);
  database= firebase.database();

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  var balloonPosition= database.ref('balloon/position')
  balloonPosition.on("value",readPosition, showError)

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
   balloonPosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
   balloonPosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    balloonPosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    balloonPosition(0,+1);
  
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function updateHeight(x,y){
  database.ref('balloon/position').set({
    'x': height.x+ x,
    'y': height.y+ y
  })
  }
  function readPosition(data){
    height=data.val();
    balloon2.x = height.x;
    balloon2.y= height.y;
  }
  function showError(){
    console.log("An error in writing the database")
  }