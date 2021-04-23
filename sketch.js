var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var xVelocity = 0;
var yVelocity = 0;

var obstacle;
var obstacleImage;
var obstaclesGroup;

var form, player, game, finishedPlayers = 0, passed;

var goldImage, silverImage, bronzeImage;

var cars, car1, car2, car3, car4;
var track, car1_img, car2_img, car3_img, car4_img;

function preload(){
  track = loadImage("../images/track.jpg");
  car1_img = loadImage("../images/car1.png");
  car2_img = loadImage("../images/car2.png");
  car3_img = loadImage("../images/car3.png");
  car4_img = loadImage("../images/car4.png");
  ground = loadImage("../images/ground.png");
  obstacleImage = loadImage("../images/f1.png");
  goldImage = loadImage("../images/gold.png");
  silverImage = loadImage("../images/silver.png");
  bronzeImage = loadImage("../images/bronze.png");
}

function setup(){
  canvas = createCanvas(displayWidth , displayHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  obstaclesGroup = new Group();
  for(var i = 0; i < 5; i++){
    spawnObstacle();
  }
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(finishedPlayers === 4){
    game.update(2);
  }
  if(gameState === 2){
    game.displayRanks();
  }
  /*if(gameState === 2){
    game.end();
  }*/
  
}

function spawnObstacle(){

  var rand1;
  var rand2;

  rand1 = Math.round(random(200, displayWidth - 200));
  rand2 = Math.round(random( - displayHeight * 4, displayHeight));

  obstacle = createSprite(rand1, rand2);
  obstacle.addImage(obstacleImage);
  obstaclesGroup.add(obstacle);
}
