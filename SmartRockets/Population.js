import {Rocket} from "./Rocket.js"

export class Population {
    constructor(x, y, target) {
        this.m_target = target;
        this.m_start_x = x;
        this.m_start_y = y;
        this.m_rockets = [];
        this.m_size = 500;
        this.m_mating_pool = [];

        for (let i = 0; i < this.m_size; ++i) {
            this.m_rockets[i] = new Rocket(this.m_start_x, this.m_start_y);
        }
    }

    IsCrashed(rocket, obstacles) {
        let crash = false;
        obstacles.forEach( function(obstacle) {
            crash = crash || rocket.pos.x > obstacle.x &&
                rocket.pos.x < (obstacle.x + obstacle.w) &&
                rocket.pos.y > obstacle.y &&
                rocket.pos.y < (obstacle.y + obstacle.h);
        });

        return crash;
    }

    IsOutside(rocket, boundary) {
        return rocket.pos.x > boundary.w || 
            rocket.pos.x < 0 ||
            rocket.pos.y > boundary.h ||
            rocket.pos.y < 0;
    }

    Run(obstacles, boundary, accel_offset) {
        for (let i = 0; i < this.m_size; ++i) {
            let rocket = this.m_rockets[i];
            rocket.SetAccelerationOffset(accel_offset);
            let target_dist = 
                dist(rocket.pos.x, rocket.pos.y, this.m_target.x, this.m_target.y);
            if (this.IsCrashed(rocket, obstacles) ||
                this.IsOutside(rocket, boundary)) {
                rocket.Crash();
            }
            else if (target_dist >= 15) {
                rocket.Update();
            } else {
                rocket.complete = true;
            }
            rocket.Draw();
        }
    }

    RocketAvgLife() {
        let life_sum = 0;
        for (let i = 0; i < this.m_size; ++i) {
            life_sum += this.m_rockets[i].Life();
        }

        return life_sum / this.m_size;
    }

    EvaluateRockets() {
        this.m_mating_pool = [];

        let max_fit = 0;
        for (let i = 0; i < this.m_size; ++i) {
            let rocket = this.m_rockets[i];
            rocket.CalculateFitness(this.m_target);

            if (rocket.fitness > max_fit) {
                max_fit = rocket.fitness
            }
        }

        if (max_fit === 0) {
            return;
        }

        for (let i = 0; i < this.m_size; ++i) {
            let rocket = this.m_rockets[i];
            rocket.fitness /= max_fit;
        }

        // Stack the mating pool in favor of fit rockets
        for (let i = 0; i < this.m_size; ++i) {
            let rocket = this.m_rockets[i];
            let n = rocket.fitness * 100;
            for (let j = 0; j < n; ++j) {
                this.m_mating_pool.push(rocket);
            }
        }
    }

    Advance() {
        let new_rockets = [];
        for (let i = 0; i < this.m_size; ++i) {
            let parent_a = random(this.m_mating_pool).dna;
            let parent_b = random(this.m_mating_pool).dna;
            let child = parent_a.Crossover(parent_b);
            child.Mutate();

            new_rockets[i] = new Rocket(this.m_start_x, this.m_start_y, child);
        }

        this.m_rockets = new_rockets;
    }

    SuccessPercentage() {
        let num_complete = 0;
        for (let i = 0; i < this.m_size; ++i) {
            if (this.m_rockets[i].complete) {
                num_complete++;
            }
        }

        return num_complete / this.m_size;
    }
}