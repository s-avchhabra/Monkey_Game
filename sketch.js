var monkey,monkey_running;
var jungle,jungleImage;
var score = 1;
var bananaImage;
var ground, groundImage;
var score = 0;
var stoneImg;

function preload(){
  
  jungleImage = loadImage("jungle.jpg");
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png", "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
 bananaImage = loadImage("banana.png");
  
  stoneImg = loadImage("stone.png");
}

function setup() {
  createCanvas(600,600);
  
  //create background jungle
  jungle = createSprite(300,150,10,10)
  jungle.addImage("Image_jungle",jungleImage);
  jungle.scale = 0.8;
  
  //create monkey sprite
  monkey = createSprite(50,245);
  monkey.addAnimation("running_monkey",monkey_running);
  monkey.scale = 0.1;
  
  //create ground sprite
  ground = createSprite(300,290,600,20);
  ground.visible  = false;
  
  //create food group
  foodGroup = new Group();
  
  //create obstacle group
  obstacleGroup = new Group();
}

function draw() {

  spawnFood();  
  spawnObstacles();
  
  //stop monkey from falling
  monkey.collide(ground);
  
  //make monkey jump
    if (keyDown("space")&& monkey.y > 166) {
     monkey.velocityY = -7; 
    }

    //add gravity
    monkey.velocityY = monkey.velocityY + 0.5;
  
  
  if(monkey.isTouching(foodGroup)){
   foodGroup.destroyEach();
    score = score + 2;
  }
  switch(score){
    case 2: monkey.scale = 0.12;
      break;
    case 4: monkey.scale = 0.14;
      break;
    case 6: monkey.scale = 0.16;
      break;
    case 8: monkey.scale = 0.18;
      break;
    case 10: monkey.scale = 0.2;
      break;
      default: break;
  }
  
  
  if (monkey.isTouching(obstacleGroup)) {
    monkey.scale = 0.1;
    score = 0;
  }
  
drawSprites();
  
  //display text
  stroke("white");
  textSize(20);
  fill("white");
  text("score: " + score,510,20);
}

function spawnFood() {
  if (frameCount % 320 === 0) {
    var banana = createSprite(600,random(180,200));
    banana.addImage("imageBanana",bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -2;
    
    banana.depth = monkey.depth;
    monkey.depth++
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (frameCount % 150 === 0) {
    var stone = createSprite(600,265);
    stone.addImage(stoneImg);
    stone.scale = 0.08;
    stone.velocityX = -2;
    
    obstacleGroup.add(stone);
  }
}

