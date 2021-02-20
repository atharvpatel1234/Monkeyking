
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
function preload(){  monkey_running=
loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
 createCanvas(500,500); 

 PLAY = 1;
 gameState = PLAY
 END = 0;
  
 FoodGroup = new Group();
 obstacleGroup = new Group(); 
  
  monkey = createSprite(70,375,50,50); 
  monkey.addAnimation("moving",monkey_running); 
  monkey.scale = 0.2; 
  
  ground = createSprite(250,400,950,10);
  ground.x = ground.width/2;
  
  invisible = createSprite(250,400,1000,15);
  invisible.x = ground.width/2;
}


function draw() {
 background("white");
  
  if(gameState === PLAY){
    
    if(ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if(invisible.x < 0){
      invisible.x = invisible.width/2;
      }
    invisible.velocityX = -4;
    
    if(keyDown("space") && monkey.isTouching(ground)){
      monkey.velocityX = -24;
    }
    
    score = Math.round(frameCount/3);
    survivalTime = Math.ceil(frameCount/frameRate());
    ground.velocityX = -(5 + 2 * score/100);
    
   if(monkey.isTouching(FoodGroup)){
     FoodGroup.destroyEach();
     
     monkey.velocityY = monkey.velocityY - 0.8;
     
   }
    
    Food();
    Obstacle();
    
    if(monkey.isTouching(obstacleGroup)){
      GameState = END;
    }
    
    else if(gameState === END){
      ground.velocityX =0;
      ground.velocityX = 0;
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      
      FoodGroup.setLifetimeEach(-1);
      obstacleGroup.setLifetimeEach(-1);
    }
    
    
  
  stroke("black");
  textSize(20);
  fill("blue");
  text("Score" + score,350,50);
  
  stroke("black");
  textSize(20);
  fill("red");
  text("Survival Time:" + survivalTime,100,50);
  
  monkey.collide(ground);
    
  drawSprites();
  }
}

function Food(){
  if(frameCount % 80 ===0){
    var banana = createSprite(500,10,10,20);
    banana.addImage("banana",bananaImage);
    banana.velocityX = -(5 + 2 * score/100);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    FoodGroup.add(banana);
    FoodGroup.setLifetimeEach(100);
    
 }
}

function Obstacle(){
  if(frameCount % 300 ===0){
    var obstacle = createSprite(500,10,10,20);
    obstacle.addImage("banana",bananaImage);
    obstacle.velocityX = -(5 + 2 * score/100);
    obstacle.y = Math.round(random(120,200));
    obstacle.scale = 0.1;
   }
}

