//creating pc, obstacle, monster, background, coins, score, ground, and image variables
var pc, pcRun, pcJump, pcStand;
var obstacle1, obstacle2, obstacle3, obstacle1Img, obstacle2Img, obstacle3Img, obstacles;
var monster1Img, monster2Img, monster3Img, monsters;
var monsterSpeed;
var cave, caveImg;
var coin, coins, coinImg;
var score = 0;;
var ground;
var gravity = 0;
var gameState = 1;
var back;
var gameOver, gameOverImg;

//loading images
function preload(){
    caveImg = loadImage("images/cave.jpg");
    monster1Img = loadImage("images/monster1.png");
    monster2Img = loadImage("images/monster2.png");
    monster3Img = loadImage("images/monster3.png");
    obstacle1Img = loadImage("images/obstacle1.png");
    obstacle2Img = loadImage("images/obs2.png");
    //obstacle2Img.scale = 0.1;
    obstacle3Img = loadImage("images/obstacle3.png");        
    coinImg = loadImage("images/coin.png");
    pcRun = loadImage("images/runningguy.gif");
    pcJump = loadImage("images/jump.png");
    pcStand = loadImage("images/stickman.png");
    gameOverImg = loadImage("images/gameover.png");
}
function setup(){
    //creating canvas
    var canvas = createCanvas(displayWidth, displayHeight-110);

    //setting cave background
    background(caveImg);
    //making gameOver sprite
    gameOver = createSprite(windowWidth/2-150,windowHeight/10);
    gameOver.addImage(gameOverImg);
    gameOver.visible = false;
    back = createSprite(windowWidth/2 , windowHeight/10 , windowWidth, windowHeight); 
    back.addImage(caveImg);
    back.scale = 1; 
    back.visible = false;
    //creating monster, obstacle, and coin groups
    monsters = new Group();  
    obstacles = new Group();
    coins = new Group();
    /*cave = createSprite();  
    cave.addImage(caveImg);*/
    //making a sprite for pc
    pc = createSprite(400,910);
    pc.addImage(pcStand);
    pc.scale = 0.8;
    //back = createSprite(400,400);
    //back.addImage(caveImg);
    ground = createSprite(0,1150,10000,100);
    ground.visible = false;
    pc.setCollider("circle",0,20,100);
}
function draw(){
    background(caveImg);
    //background("white");
    //making the play function
    if (gameState === 1) {
        textSize(30);
        fill(250);
        text("Score:"+score,100,100); 
        //creating controls
        if (keyDown(RIGHT_ARROW) || keyDown("d")) {
            pc.x += 20;
            pc.addImage(pcRun);
            pc.scale = 0.8;
        } 
        else if (keyDown(LEFT_ARROW)|| keyDown("a")) {
            pc.x -= 20;
            pc.addImage(pcRun);
            pc.scale = 0.8;
        }
        else{
            pc.addImage(pcStand);
            pc.scale = 0.8;
        }    
        if (keyDown(UP_ARROW) && pc.y < 1200 || keyDown("space") && pc.y < 1200) {
            pc.velocityY = -25;
            pc.addImage(pcJump);
            pc.scale = 0.5;
        }   
        if (pc.y > ground.y) {
            pc.addImage(pcJump);
        }
        //adding score
        if(pc.isTouching(coins)){
            score += 2;
            coins.destroyEach();
        }
        //adding gravity
        gravity += 0.8;
        pc.y += gravity;
        if (pc.collide(ground)) {
            gravity = 0;
        }
        //increasing the speed of monsters, obstacles, and coins after every 10 score
        if (score % 10 === 0) {
            monsters.velocityX += 2;
            obstacles.velocityX += 2;
            coins.velocityX += 2;
        }
        //calling all spawn functions
        spawnObstacles();
        spawnMonsters(); 
        spawnCoins();   
        } 
    //making a game over function
    if (pc.isTouching(monsters) || pc.isTouching(obstacles)) {
        gameState = 0;
    }
    //making game over screen
    if(gameState === 0){ 
        back.addImage(gameOverImg);
        gameOver.scale = 0.3;
        gameOver.visible = true;
        textSize(50);
        fill(250);
        text("Score: " + score,windowWidth/2-200,windowHeight/10+300);
        pc.velocityX = 0;
        pc.velocityY = 0;
        pc.addImage(pcStand);
        pc.scale = 0.7;
        monsters.setVelocityXEach(0);
        coins.setVelocityXEach(0);
        obstacles.setVelocityXEach(0);
        monsters.setLifetimeEach(-1);
        coins.setLifetimeEach(-1);
        obstacles.setLifetimeEach(-1);
    }
    //pc.debug=true;
    drawSprites();    
}
//creating function to spawn monsters
function spawnMonsters() {
    if (frameCount % 170 === 0) {
        var monster = createSprite(0,random(950,1050),40,40);
        //monster.debug=true;
        monster.setCollider("circle",0,0,180);
        monster.velocityX = 8;
        monster.scale = 0.4;
        var rand = Math.round(random(1,3));
        switch(rand) {
            case 1: monster.addImage(monster1Img);
                break;
            case 2: monster.addImage(monster2Img);
                break;
            case 3: monster.addImage(monster3Img);
                break;
            default: break;        
        }
        monsters.add(monster);
        monsters.lifetime = 700;
    } 
}
//creating function to spawn obstacles
function spawnObstacles() {
    if (frameCount % 350 === 0) {
        var obstacle = createSprite(2600,random(1000,1100),40,40);
        //obstacle.debug=true;
        obstacle.setCollider("circle",0,0,190);
        obstacle.velocityX = -4;
        obstacle.scale = 0.4;
        var rand = Math.round(random(1,3));
        switch(rand) {
            case 1: obstacle.addImage(obstacle1Img);
                break;
            case 2: obstacle.addImage(obstacle2Img);
                break;
            case 3: obstacle.addImage(obstacle3Img);
                break;
            default: break;
        }
        
        obstacle.lifetime = 700;
        obstacles.add(obstacle);
    }
}
//creating function to spawn coins
function spawnCoins() {
    if (frameCount % 400 === 0) {
        coin = createSprite(2600,random(800,1100),40,40);
        //coin.debug=true;
        coin.setCollider("circle",0,0,120);
        coin.addImage(coinImg);
        coin.velocityX = -4;
        coin.scale = 0.5;
        coin.lifetime = 700;
        coins.add(coin);
    }
}