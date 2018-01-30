export class Particle {
    constructor(x, y, color, vel) {
        this.m_pos = createVector(x, y);
        this.m_vel = vel;
        this.m_accel = createVector(0, 0);
        this.m_color = color;
    }

    Update() {
        this.m_vel.add(this.m_accel);
        this.m_pos.add(this.m_vel);
        this.m_accel.mult(0);
    }

    Draw() {
        colorMode(HSB);
        strokeWeight(1);
        stroke(hue(this.m_color), saturation(this.m_color), brightness(this.m_color), alpha(this.m_color));
        point(this.m_pos.x, this.m_pos.y);
    }

    ApplyForce(force) {
        this.m_accel.add(force);
    }

    set acceleration(a) {
        this.m_accel = a;
    }
    set velocity(v) {
        this.m_vel = v;
    }
    get velocity() {
        return this.m_vel;
    }
    set pos(p) {
        this.pos = p;
    }
    get pos() {
        return this.m_pos;
    }
}