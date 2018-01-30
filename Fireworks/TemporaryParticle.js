import {Particle} from "./Particle.js"

export class TemporaryParticle extends Particle {
    constructor(x, y, color, vel, lifespan) {
        super(x, y, color, vel);
        this.m_max_lifespan = lifespan;
        this.m_lifespan = lifespan
    }

    Draw() {
        if (this.m_lifespan > 0){
        colorMode(HSB);
            let alpha = (this.m_lifespan/this.m_max_lifespan);
            strokeWeight(1);
            stroke(hue(this.m_color), saturation(this.m_color), brightness(this.m_color), alpha);
            point(this.m_pos.x, this.m_pos.y);
            this.m_lifespan--;
        }
    }

    IsFinished() {
        return this.m_lifespan <= 0;
    }

    get lifespan() {
        return this.m_lifespan;
    }
}