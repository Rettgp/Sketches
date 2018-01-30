export class Wall {
    constructor(x, y, height, gap) {
        this.m_x = x;
        this.m_y = y;
        this.m_height = height;
        this.m_width = 20;
        this.m_gap = gap;
        this.m_speed = 5;

        this.m_top_end = this.m_gap ? random(this.m_height*0.1, this.m_height/2) : height;
        this.m_bottom_end = this.m_gap ? random(this.m_height/2, this.m_height*0.9) + 50: height;
    }

    Draw() {
        fill(255);
        rect(this.m_x, this.m_y, this.m_width, this.m_top_end);
        rect(this.m_x, this.m_bottom_end, this.m_width, this.m_height);
    }

    Collision(obj) {
        return obj.x + obj.width/1.25 >= this.m_x && 
            (obj.y + 2 <= this.m_top_end || obj.y + obj.height/1.25 >= this.m_bottom_end);
    }

    Update() {
        this.m_x -= this.m_speed;
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
}