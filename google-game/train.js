class Fence {
    constructor() {
        this.r = 60;
        this.x = width;
        this.y = 335 - this.r;
    }

    move() {
        this.x -= 6;
    }

    show() {
        image(fImg, this.x, this.y, this.r, this.r);
    }
}