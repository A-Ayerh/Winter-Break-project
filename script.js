


let player;
let happinessTimer = 0;
let walkingPic;
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

  Character = new Character();
  currentAction = "running";
}

function draw() {
  background(200);
  Character.update();
  Character.display();

  happinessTimer++;
  if (happinessTimer % 60 === 0) {
    Character.happiness -= 1;
  }



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
  // Add properties for the sprite sheet and animation frame
  spriteSheet; // the image object for the sprite sheet
  frameWidth;  // the width of each frame in the sprite sheet
  frameHeight; // the height of each frame in the sprite sheet
  frameCount;  // the total number of frames in the sprite sheet
  frameDelay;  // the delay between frames in the animation
  animationFrame; // the current frame of the animation
  animationTime;  // the time elapsed since the last frame change
  currentAction;  // the current action of the character

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
    this.currentAction = "standing"; // set the initial action to running

    // Load the sprite sheet image and set the frame properties
    this.spriteSheet = loadImage("path/to/sprite/sheet.png");
    this.frameWidth = 50;
    this.frameHeight = 50;
    this.frameCount = 8; // for example
    this.frameDelay = 100; // in milliseconds

    // Set the initial animation frame and time
    this.animationFrame = 0;
    this.animationTime = 0;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    this.y = constrain(this.y, 0, height - this.size);

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) { // left arrow or A key
      this.x -= this.speed;
      this.currentAction = "running"; // set the action to running
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) { // right arrow or D key
      this.x += this.speed;
      this.currentAction = "running"; // set the action to running
    }
    this.x = constrain(this.x, 0, width - this.size);

    if (keyIsDown(UP_ARROW) || keyIsDown(87)) { // up arrow or W key
      if (this.y === height - this.size) {
        this.velocity = this.jumpForce;
        this.currentAction = "jumping"; // set the action to jumping
      }
    }

    // Update the animation time and frame based on the elapsed time since the last frame
    this.animationTime += deltaTime;
    if (this.animationTime >= this.frameDelay) {
      this.animationTime = 0;
      this.animationFrame = (this.animationFrame + 1) % this.frameCount;
    }
  }

  display() {
    // Calculate the x and y position of the current frame in the sprite sheet
    let frameX = this.animationFrame * this.frameWidth;
    let frameY = 0; // assuming all frames are in a single row

    // Set the frameY value based on the current action
    if (this.currentAction === "running") {
      frameY = 0; // the running frames are in the first row of the sprite sheet
    } else if (this.currentAction === "jumping") {
      frameY = this.frameHeight; // the jumping frames are in the second row of the sprite sheet
    } else if (this.currentAction === "falling") {
      frameY = this.frameHeight * 2; // the falling frames are in the third row of the sprite sheet
    }

    // Display the current frame from the sprite sheet
    image(this.spriteSheet, this.x, this.y, this.size, this.size, frameX, frameY, this.frameWidth, this.frameHeight);
  }
}

