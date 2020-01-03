import {Firework} from "./Firework.js"

let WIDTH = 1900;
let HEIGHT = 1050;
let GRAVITY;

let fireworks = [];

function setup() {
    createCanvas(WIDTH, HEIGHT);
    stroke(255);
    background(10);

    GRAVITY = createVector(0, 0.2);
    fireworks.push(new Firework(random(WIDTH), HEIGHT));
}

function draw() {
    colorMode(RGB);
    background(0, 0, 0, 25);

    for (let i = fireworks.length - 1; i >= 0; --i) {
        let firework = fireworks[i];

        if (firework.IsFinished()) {
            fireworks.splice(i, 1);
        }

        firework.Update(GRAVITY);
        firework.Draw();
    }

    if (random(1) > 0.90) {
        fireworks.push(new Firework(random(WIDTH), HEIGHT));
    }
}

window.draw = draw;
window.setup = setup;