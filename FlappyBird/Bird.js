export class Bird {
    constructor(sprite, x, y) {
        this.m_sprite = sprite;
        this.m_x = x;
        this.m_y = y;
        this.m_gravity = 0.25;
        this.m_velocity = 0;
        this.m_lift = 10;
        this.m_max_lift = 10;
        this.m_width = 40;
        this.m_height = 30;
    }

    Draw() {
        fill(255);
        // ellipse(this.m_x, this.m_y, 32, 32);
        image(this.m_sprite, this.m_x, this.m_y, this.m_width, this.m_height, 0, 0);
    }

    Update() { 
        this.m_velocity += this.m_gravity;
        this.m_y += this.m_velocity;
    }

    Up() {
        this.m_velocity += -this.m_lift;
        this.m_velocity = this.m_velocity < -this.m_max_lift ? 
            -this.m_max_lift : this.m_velocity;
    }
    
    get x() {
        return this.m_x;
    }
    set x(x) {
        this.m_x = x;
    }
    get y() {
        return this.m_y;
    }
    set y(y) {
        this.m_y = y;
    }
    get width() {
        return this.m_width;
    }
    get height() {
        return this.m_height;
    }
    get velocity() {
        return this.m_velocity;
    }
    set velocity(v) {
        this.m_velocity = v;
    }
}