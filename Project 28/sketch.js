const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;	

var engine,world;
var player;
var playerImage;
var hoop;
var hoopImage;
var backdrop,backdropImage;
var wood,woodImage;
var wall2;
var ball2;
var ballImage;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var count = 0;
var ground;
var score = 0;
var resetButton,resetButtonImage;
var gameOver,gameOverImage;

function preload(){
	
	backdropImage = loadImage("images/background.jpeg");
	hoopImage = loadImage("images/hoop.png");
	playerImage = loadImage("images/player1.png");
	woodImage = loadImage("images/wood2.png");
	ballImage = loadImage("images/basketball.png");
	resetButtonImage = loadImage("images/restart.png");
	gameOverImage = loadImage("images/gameOver.png");
}

function setup(){
	createCanvas(1270,600);

	engine = Engine.create();
	world = engine.world;

	ground = createSprite(635,590,1270,5);
	backdrop = createSprite(635,300,1300,600);
	backdrop.addImage("background",backdropImage);
	backdrop.scale = 4.6;
	hoop = createSprite(1200,300,10,40);
	hoop.scale = 0.3;
	hoop.addImage("basketball_hoop",hoopImage);
	player = createSprite(200,490,10,20);
	player.addImage("PC",playerImage);
	player.scale = 0.5;
	wood = createSprite(635,100,20,10);
	wood.addImage("wood",woodImage);
	wood.velocityX = -5;
	resetButton = createSprite(635,300,10,10);
	resetButton.addImage("restart",resetButtonImage);
	resetButton.scale = 0.7;
	resetButton.visible = false;
	gameOver = createSprite(620,200,10,10);
	gameOver.addImage("over",gameOverImage);
	gameOver.visible = false;

	var options = {
		isStatic: false,
		'restitution': 1,
		'density': 1.2,
	}
	ball2 = Bodies.rectangle(100,490,20,20,options);
	World.add(world,ball2);	
	chain = new Chain(ball2,{x:170,y:505});

	wall = new HoopWall(1219,195,15,100);
	wall3 = new Wall(1270,292,10,580);
	wall4 = new Wall(635,0,1270,10)
	ground1 = new Ground(625,590,1270,5);
	boy1 = new Boy(620,460,90,200);
	boy2 = new Boy2(800,430,90,200);
	boy3 = new Boy3(980,395,90,200);
	platform1 = new Platform(635,575,60,30);
	platform2 = new Platform(815,560,60,60);
	platform3 = new Platform(995,540,60,90);
	rim = new Rim(1150,235,80,10);

	Engine.run(engine);
}

function draw(){

	Engine.update(engine);

	drawSprites();

	edges = createEdgeSprites();
	wood.bounceOff(edges[0]);
	wood.bounceOff(edges[1]);

	if(gameState === PLAY){


	chain.display();
	wall3.display();
	wall.display();
	wall4.display();
	ground1.display();
	boy1.display();
	boy2.display();
	boy3.display();
	platform1.display();
	platform2.display();
	platform3.display();
	rim.display();

	imageMode(CENTER);
	image(ballImage,ball2.position.x,ball2.position.y,60,60);


	if(count === 3){
	gameState = END;
	}
	}

	else if(gameState === END){

		gameOver.visible = true;
		resetButton.visible = true;

		wood.velocityX = 0;
	}

	if(mousePressedOver(resetButton)){
		reset();
	}



	fill("black");
	textSize(20);
	text('Three shots to make as many points as possible!',450,50);

	
	fill("black");
	text("Score : " + score,1120,50);

	text("Tips:",100,40);
	text("- Drag to shoot",100,60);
	text("- Space to reset ball",100,80);

	detectCollision(ball2.body,rim);

}

function mouseDragged(){
	Matter.Body.setPosition(ball2,{x:mouseX,y:mouseY});
}

function mouseReleased(){
	chain.fly();
}

function keyPressed(){
	if(keyCode === 32){
		Matter.Body.setPosition(ball2,{x:100,y:490});
		chain.attach(ball2);
		count++;
	}
}

function detectCollision(lball,lrim){
	console.log(rim);
	console.log(ball2);
	rim1BodyPosition = lrim.body.position;
 	ballBodyPosition = lball.body.position;

	var distance = dist(ballBodyPosition.x,ballBodyPosition.y,rim1BodyPosition.x,rim1BodyPosition.y)
		if(distance <= lball.r + lrim.r){
			score++;
		}
}

function reset(){
	gameState = PLAY;

	gameOver.visible = false;
	resetButton.visible = false;

	wood.velocityX = -5;

	Matter.Body.setPosition(ball2,{x:100,y:490});
	chain.attach(ball2);

	count = 0;
}