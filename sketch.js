var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bg, bgIMG;
var player, playerimg;
var lion, lionimg,rock,rockimg, rockGroup,lionGroup;
var gun, gunimg;
var playerBullets, bulletimg;
var invisibleGround;
var shoot = 0;
var score = 0;

var bullet, bulletimg, bulletGroup
function preload() {
  bgIMG = loadImage("bg1.jpg");
  playerimg = loadImage("Player.png")
  rockimg = loadImage("Rock(NPC).png")
  lionimg = loadImage("Lion.png")
  bulletimg = loadImage("Bullet.png")
  gunimg = loadImage("Gun.png")
}

function setup(){
    createCanvas(600,700);
    bg=createSprite(700,285);
    bg.addImage(bgIMG);
    bg.scale = 3.25;
    bg.velocityX = -3;


player = createSprite(50,400);
player.addImage(playerimg);
player.scale = 0.25;

gun = createSprite(85,370)
gun.addImage(gunimg);
gun.scale = 0.25;

invisibleGround = createSprite(200,490,400,10);
invisibleGround.visible = false;

rockGroup = new Group;
lionGroup = new Group;
bulletGroup = new Group;


score  = 0  ;
stroke("red");
fill("red");
textSize(30);
}

function draw(){
    background(0);
   
    if(gameState === PLAY){
    if(bg.x <105){
        bg.x = bg.width/2;

    }
    

   /* shoot = shoot-1
    if(keyDown("space") && shoot <0){
    bullet = createSprite(140,360);
    bullet.addImage( bulletimg);
    bullet.velocityX = 5 ;
    bulletGroup.add(bullet);
    shoot = bullet.x;
    bullet.scale = 0.15;
   
    }*/

    if(keyIsDown(32)){
      //playerBullets.velocityX = 10;
      //playerBullets.x=playerBullets.x;
      //playerBullets.y=playerBullets.y;
      shootBullet();

  }
    if(lionGroup.overlap(bulletGroup)){
      playerBullets.x=player.x+50
      playerBullets.y = player.y+25
      playerBullets.velocityX = 0;
    
     lionGroup[0].destroy();
      bulletGroup.destroyEach(playerBullets);   
      score+=50; 
  }



    if (keyDown("UP_ARROW") && player.y>=100) {
      player.velocityY = -12 ;
      //player.y = gun.y;
     
    }
    player.velocityY = player.velocityY +2.5; 
   /* if (keyDown("RIGHT_ARROW")) {
        player.x+=1;
      }*/
    /*if (keyDown("LEFT_ARROW")) {
        player.x-=3;
    } */

    if(rockGroup.isTouching(player))
    
    {
    gameState = END
    }
    
    
  
  /*if(lionGroup.collide(player)){
    player.velocityY = 0.0;
    player.visible = false;
    player.y = 350;

    

    gameState = END;
}*/



  else if(gameState === END) {


    bulletGroup.setVisibleEach(false);
    bulletGroup.setVelocityXEach(0); 
    bulletGroup.setVelocityYEach(0); 

    lionGroup.setVisibleEach(false);
    lionGroup.setVelocityXEach(0); 
    lionGroup.setVelocityYEach(0); 

    rockGroup.setVisibleEach(false);
    rockGroup.setVelocityXEach(0); 
    rockGroup.setVelocityYEach(0); 

    player.velocityY = 0.0;
    player.visible = false;

  }
    spawnRocks();
    spawnLions();

    player.collide(invisibleGround);
    drawSprites();

    text("Score:"+score,100,50);
}

}

function shootBullet(){
  playerBullets = createSprite(250,380);
  playerBullets.y= player.y+25;
  playerBullets.addImage(bulletimg);
  playerBullets.velocityX= 10;
  playerBullets.setCollider("circle",0,0,30);
  playerBullets.scale=0.25;  
  bulletGroup.add(playerBullets);
}


function spawnRocks(){
    if(World.frameCount % 300=== 0){
    rock = createSprite(800,375);
    rock.addImage(rockimg);
      rockGroup.add(rock);
    rock.scale = 0.055;
    rock.velocityX= -1;
  }
}


function spawnLions(){
    if(World.frameCount % 500=== 0){
    lion = createSprite(550,375);
    lion.addImage(lionimg);
      lionGroup.add(lion);
    lion.scale = 0.27;
    lion.velocityX= -1;
  }
}
