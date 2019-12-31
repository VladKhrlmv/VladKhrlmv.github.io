class Sheep {
    constructor() {
        this.r = 80;
        this.x = 50;
        this.y = height - this.r*10;
        this.vy = 0;
        this.gravity = 1.5;
    }

    jump() {
        if (this.y == 322 - this.r) {
          this.vy = -25;
        }
    }
  
    hits(fence) {
        return collideRectRect(this.x, this.y, this.r, this.r, fence.x, fence.y, fence.r, fence.r);
      
    }

    move() {
        this.y += this.vy;
        this.vy += this.gravity;
        this.y = constrain(this.y, 0, 322 - this.r);
    }

    show() {
        image(shImg, this.x, this.y, this.r, this.r);
    }
}