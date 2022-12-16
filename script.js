let character;
let happinessTimer = 0;
let runningImg;
let jumpingImg;
let fallingImg;
let currentAction;
let hunger;

function preload() {
  // load the images in the preload function
  runningImg = loadImage('running.png');
  jumpingImg = loadImage('jumping.png');
  fallingImg = loadImage('falling.png');
}

function setup() {
  createCanvas(windowWidth - 50, windowHeight - 50);

  character = new Character();
  currentAction = "running";
}

function draw() {
  background(200);
  character.update();
  character.display();

  happinessTimer++;
  if (happinessTimer % 60 === 0) {
    character.happiness -= 1;
  }

  // if (this.velocity > 0) {
  //   currentAction = "falling";
  // } else if (this.velocity < 0) {
  //   currentAction = "jumping";
  // } else {
  //   currentAction = "running";
  // }

  // display health bar
  fill(255, 0, 0);
  stroke(0);
  rect(0, 0, character.health, 20);
  text("Health", 110, 15);

  // display stamina bar
  fill(0, 0, 255);
  stroke(0);
  rect(0, 25, character.stamina, 20);
  text("Stamina", 110, 40);

  // display happiness bar
  fill(0, 255, 0);
  stroke(0);
  rect(0, 50, character.happiness, 20);
  text("Happiness", 110, 65);
}

//changing this to new js file
class Character {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.size = 50;
    this.speed = 5;
    this.gravity = 0.5;
    this.health = 100;
    this.stamina = 100;
    this.happiness = 50;
    this.jumpForce = -10;
    this.velocity = 0;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.y = constrain(this.y, 0, height - this.size);

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // left arrow or A key
      this.x -= this.speed;
      this.currentAction = 'running';
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // right arrow or D key
      this.x += this.speed;
      this.currentAction = 'running';
    }
    this.x = constrain(this.x, 0, width - this.size);

    if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // up arrow or W key
      if (this.y === height - this.size) {
        this.velocity = this.jumpForce;
        this.currentAction = 'jumping';
      }
    }
  }

  display() {
    if (currentAction === "running") {
      image(runningImg, this.x, this.y, this.size, this.size);
    } else if (currentAction === "jumping") {
      image(jumpingImg, this.x, this.y, this.size, this.size);
    } else if (currentAction === "falling") {
      image(fallingImg, this.x, this.y, this.size, this.size);
    }
  }
