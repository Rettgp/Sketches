import {Dna} from "./Dna.js"

export class Rocket {
    constructor(x, y, dna) {
        this.m_pos = createVector(x, y);
        this.m_velocity = createVector(0,0);
        this.m_acceleration = createVector(0,0);
        this.m_dna = dna ? dna : new Dna();
        this.m_fitness = 0;
        this.m_life = 0;
        this.m_complete = false;
        this.m_crash = false;
    }

    Accelerate(force) {
        this.m_acceleration.add(force);
    }

    Update() {
        let gene = this.m_dna.NextGene(this.m_life);
        if (gene) {
            this.Accelerate(gene);
        }

        this.m_velocity.add(this.m_acceleration);
        this.m_pos.add(this.m_velocity);
        this.m_acceleration.mult(0);
        this.m_life++;
    }

    Draw() {
        push();
        noStroke();
        fill(255, 150);
        translate(this.m_pos.x, this.m_pos.y);
        rotate(this.m_velocity.heading());
        rectMode(CENTER);
        rect(0, 0, 25, 5);
        fill(100, 0, 0);
        rect(-12, 0, 2, 2);
        pop();
    }

    Life() {
        return this.m_life;
    }

    Crash() {
        this.m_crash = true;
    }

    CalculateFitness(target) {
        let distance = dist(this.m_pos.x, this.m_pos.y, target.x, target.y);
        this.m_fitness = 1 / distance;

        if (this.m_crash) {
            this.m_fitness /= 10;
        }

        if (this.m_complete) {
            this.m_fitness = 5;
            this.m_fitness *= (this.m_dna.Lifespan() / this.m_life);
        }
    }

    get pos() {
        return this.m_pos;
    }

    set pos(p) {
        this.m_pos = p;
    }

    set velocity(v) {
        this.m_velocity = v;
    }

    get fitness() {
        return this.m_fitness;
    }

    set fitness(f) {
        this.m_fitness = f;
    }

    get dna() {
        return this.m_dna;
    }

    set complete(c) {
        this.m_complete = c;
    }
}