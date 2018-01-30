import {Bird} from "./Bird.js"
import {Wall} from "./Wall.js"
let bird;
let walls = [];
let WIDTH = 600;
let HEIGHT = 600;
let RUNNING = true;
let BIRD_IMAGE;

function preload() {
    BIRD_IMAGE = loadImage('assets/bird.png');
}

function setup() {
    createCanvas(WIDTH, HEIGHT);
    bird = new Bird(BIRD_IMAGE, 25, HEIGHT/2);
}

let frame_count = 0;
let score = 0;
function draw() {
    if (!RUNNING) {
        return;
    }
    background(0);
    textSize(32);
    text(score, 10, 30);

    for (let i = walls.length - 1; i >= 0; --i) {
        let wall = walls[i];
        wall.Draw();
        wall.Update();

        if (wall.x < 0) {
            walls.splice(i, 1);
            score++;
        }

        if (wall.Collision(bird)) {
            bird.Draw();
            RUNNING = false;
            return;
        }
    }

    if (bird.y >= HEIGHT)
    {
        bird.y = HEIGHT;
        bird.velocity = 0;
        RUNNING = false;
        bird.Draw();
        return;
    }
    if (bird.y < 0)
    {
        bird.y = 0;
        bird.velocity = 0;
    }
    bird.Draw();
    bird.Update();

    if (frame_count % 60 === 0) {
        walls.push( new Wall(WIDTH, 0, HEIGHT, true) );
    }

    frame_count++;
}

function keyPressed() {
    if (key === ' ') {
        bird.Up();
    }
}

window.setup = setup;
window.draw = draw;
window.keyPressed = keyPressed;
window.preload = preload;