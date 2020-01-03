import {Population} from "./Population.js"

let WIDTH = 700;
let HEIGHT = 800;
let population;
let generation_p;
let success_p;
let target;

function setup() {
    createCanvas(WIDTH, HEIGHT);

    target = createVector(WIDTH - 100, 50);
    population = new Population(WIDTH/2, HEIGHT - 50, target);
    generation_p = createP();
    success_p = createP();
}

let it = 0;
let generation = 0;
let GenerationLifetime = 100;
let RocketSpeed = 2.0;
function draw() {
    background(51);

    fill(255);
    ellipse(target.x, target.y, 32, 32);
    fill(0, 0, 255);
    ellipse(target.x, target.y, 24, 24);
    fill(255, 0, 0);
    ellipse(target.x, target.y, 8, 8);

    fill(255);
    let obstacles = []
    let obstacle1 = {x: WIDTH/1.5 - 300, y: HEIGHT/2, w: 550, h: 200};
    let obstacle2 = {x: WIDTH/1.5 - 100, y: HEIGHT/5, w: 550, h: 50};
    let obstacle3 = {x: 200, y: 0, w: 100, h: 200};
    let obstacle4 = {x: WIDTH/4 - 200, y: HEIGHT/3, w: 550, h: 50};
    obstacles.push(obstacle1);
    obstacles.push(obstacle2);
    obstacles.push(obstacle3);
    obstacles.push(obstacle4);
    rect(obstacle1.x, obstacle1.y, obstacle1.w, obstacle1.h);
    rect(obstacle2.x, obstacle2.y, obstacle2.w, obstacle2.h);
    rect(obstacle3.x, obstacle3.y, obstacle3.w, obstacle3.h);
    rect(obstacle4.x, obstacle4.y, obstacle4.w, obstacle4.h);

    let boundary = {w: WIDTH, h: HEIGHT};

    population.Run(obstacles, boundary, RocketSpeed);
    generation_p.html(generation);

    if (it >= GenerationLifetime) {
        success_p.html(population.SuccessPercentage() * 100 + "%");
        population.EvaluateRockets();
        population.Advance();
        it = 0;
        generation++;
    }

    it++;
}

function keyPressed() {
  if (keyCode == UP_ARROW) 
  {
      GenerationLifetime -= 10;
      RocketSpeed += 0.25;
  }
  else if (keyCode == DOWN_ARROW) 
  {
      GenerationLifetime += 10;
      RocketSpeed -= 0.25;
  }
}

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;