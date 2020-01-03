import {Particle} from "./Particle.js"
import {TemporaryParticle} from "./TemporaryParticle.js"

export class Firework {
    constructor(x, y) {
        this.m_rocket = new Particle(x, y, color(0,0,100,1), createVector(random(-1, 1), random(-10, -20)));
        this.m_rocket_trail = [];
        this.m_explosion = [];
        this.m_explosion_lifespan = 120;
    }

    Update(gravity) {
        if (this.m_rocket) {
            this.m_rocket.ApplyForce(gravity)
            this.m_rocket.Update();

            if ( this.m_rocket_trail.length < 10 ) {
                let trail_particle = new TemporaryParticle(
                    this.m_rocket.pos.x, 
                    this.m_rocket.pos.y, 
                    color(60,100,100,1),
                    createVector(random(-0.5, 0.5), 
                    random(1, 3)), 10);
                this.m_rocket_trail.push(trail_particle);
            }

            if ( this.m_rocket.velocity.y >= 0 ) {
                this.Explode();
                this.m_rocket = null;
            }
        }

        this.m_rocket_trail.forEach(function(particle) {
            particle.Update();
        });

        var myself = this;
        this.m_explosion.forEach(function(particle) {
            if (!myself.m_rocket) {
                particle.velocity.mult(0.9);
            }

            // particle.ApplyForce(p5.Vector.random2D()), 
            particle.ApplyForce(p5.Vector.mult(gravity, 0.5));
            particle.Update();
        });
    }

    Draw() {
        if (this.m_rocket) {
            stroke(255);
            this.m_rocket.Draw();
        }

        // Draw rocket trail
        for (let i = this.m_rocket_trail.length - 1; i >= 0; --i){
            let particle = this.m_rocket_trail[i];
            stroke(255, 255, 0, 100);
            particle.Draw();
            if (particle.IsFinished()) {
                this.m_rocket_trail.splice(i, 1);
            }
        }

        // Draw explosion
        for (let i = this.m_explosion.length - 1; i >= 0; --i){
            let particle = this.m_explosion[i];
            particle.Draw();
            if (particle.IsFinished()) {
                this.m_explosion.splice(i, 1);
            }
        }
    }

    Explode() {
        let hue = random(360);
        let num_particles = random(100, 300);
        let explosiveness = random(5,25);
        for (let i = 0; i < num_particles; ++i) {
            let particle = new TemporaryParticle(
                this.m_rocket.pos.x, 
                this.m_rocket.pos.y, 
                color(hue,random(100),100,1),
                p5.Vector.random2D().mult(random(0, explosiveness)), 
                this.m_explosion_lifespan);
            this.m_explosion.push(particle);
        }
    }

    IsFinished() {
        return !this.m_rocket && 
            this.m_rocket_trail.length === 0 && 
            this.m_explosion.length === 0;
    }
}