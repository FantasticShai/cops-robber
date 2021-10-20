var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;

var vehicles, car1, car2, car3, car4;

var robberImg, copImg, obstacleGroup, carSound;

var robberPlr, copPlr;

var track, car1_img, car2_img, car3_img, car4_img;

function preload(){
  track = loadImage("images/background img.png");
  car1_img = loadImage("images/car1.png");
  car2_img = loadImage("images/car2.png");
  car3_img = loadImage("images/car3.png");
  //car4_img = loadImage("images/car4.png");
  ground = loadImage("images/ground.png");
  robberImg = loadImage("images/robber.png");
  copImg = loadImage("images/cop car.png");
  carSound = loadSound("sound/car.mp3");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();

  car1 = createSprite(200, 200, 50, 50);
  car2 = createSprite(400, 300, 50, 50);
  car3 = createSprite(100, 200, 50 ,50);
  obstacleGroup = createGroup();
}


function draw(){
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
    spawnObstacles();
  }
  if(gameState === 2){
    game.end();
  }
}

function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityY = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(car1_img);
              break;
      case 2: obstacle.addImage(car2_img);
              break;
      case 3: obstacle.addImage(car3_img);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.7;
    obstacle.lifetime = 500;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}
