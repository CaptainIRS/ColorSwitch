class PowerUp {
    constructor(x, y, parent) {
        this.x = x;
        this.y = y;
        this.hasRun = false;
        this.context = parent.context;
    }
}

class MultiColor extends PowerUp {
    constructor(x, y, parent) {
        super(x, y, parent);
        this.height = 240;
        this.img = new Image();
        this.img.src = 'img/multicolor.png';
    }

    draw() {
        this.context.save();
        this.context.drawImage(this.img, this.x - 50, this.y - 50);
        this.context.restore();
    }

    update() {
        this.draw();
    }
}

class Slow extends PowerUp {
    constructor(x, y, parent) {
        super(x, y, parent);
        this.height = 240;
        this.img = new Image();
        this.img.src = 'img/slow.png';
    }

    draw() {
        this.context.save();
        this.context.drawImage(this.img, this.x - 50, this.y - 50);
        this.context.restore();
    }

    update() {
        this.draw();
    }
}