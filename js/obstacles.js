class Obstacle {
    constructor(x, y, parent) {
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.context = parent.context;
    }

    lineTo(color, x1, y1, x2, y2) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.lineWidth = 20;
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    arcTo(color, x, y, r, sAngle, eAngle) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.lineWidth = 20;
        this.context.arc(x, y, r, sAngle, eAngle);
        this.context.stroke();
    }
}

class Circle extends Obstacle {
    constructor(x, y, parent) {
        super(x, y, parent);
        this.height = 240;
        this.angle = 0;
    }

    draw() {
        this.context.lineCap = "butt";
        this.arcTo('#F00',
            this.x,
            this.y,
            100,
            this.angle,
            this.angle + 1 / 2 * Math.PI + 0.00001);

        this.arcTo('#c636ff',
            this.x,
            this.y,
            100,
            this.angle + 1 / 2 * Math.PI,
            this.angle + Math.PI + 0.00001);

        this.arcTo('#ffab1b',
            this.x,
            this.y,
            100,
            this.angle + Math.PI,
            this.angle + 3 / 2 * Math.PI + 0.00001);

        this.arcTo('#6bdcff',
            this.x,
            this.y,
            100,
            this.angle + 3 / 2 * Math.PI,
            this.angle + 2 * Math.PI + 0.00001);
    }

    update() {
        this.angle += this.parent.rotationSpeed;
        this.draw();
    }
}

class Triangle extends Obstacle {
    constructor(x, y, parent) {
        super(x, y, parent);
        this.height = 240;
        this.angle = 0;
    }

    draw() {
        this.context.lineCap = "round";
        this.lineTo('#F00',
            this.x - Math.sin(this.angle) * 2 / 3 * this.height,
            this.y - Math.cos(this.angle) * 2 / 3 * this.height,
            this.x - Math.sin(this.angle + 2 / 3 * Math.PI) * 2 / 3 * this.height,
            this.y - Math.cos(this.angle + 2 / 3 * Math.PI) * 2 / 3 * this.height
        );

        this.lineTo('#ffab1b',
            this.x - Math.sin(this.angle + 2 / 3 * Math.PI) * 2 / 3 * this.height,
            this.y - Math.cos(this.angle + 2 / 3 * Math.PI) * 2 / 3 * this.height,
            this.x - Math.sin(this.angle + 4 / 3 * Math.PI) * 2 / 3 * this.height,
            this.y - Math.cos(this.angle + 4 / 3 * Math.PI) * 2 / 3 * this.height
        );

        this.lineTo('#6bdcff',
            this.x - Math.sin(this.angle + 4 / 3 * Math.PI) * 2 / 3 * this.height,
            this.y - Math.cos(this.angle + 4 / 3 * Math.PI) * 2 / 3 * this.height,
            this.x - Math.sin(this.angle) * 2 / 3 * this.height,
            this.y - Math.cos(this.angle) * 2 / 3 * this.height
        );
    }

    update() {
        this.angle += this.parent.rotationSpeed;
        this.draw();
    }
}

class Concentric extends Obstacle {
    constructor(x, y, parent) {
        super(x, y, parent);
        this.height = 300;
        this.angle = 0;
        this.angle2 = 1 / 3 * Math.PI;
    }

    draw() {
        this.context.lineCap = "butt";
        this.arcTo('#F00', this.x, this.y, 100, this.angle, this.angle + 1 / 2 * Math.PI + 0.00001);

        this.arcTo('#c636ff', this.x, this.y, 100, this.angle + 1 / 2 * Math.PI, this.angle + Math.PI + 0.00001);

        this.arcTo('#ffab1b', this.x, this.y, 100, this.angle + Math.PI, this.angle + 3 / 2 * Math.PI + 0.00001);

        this.arcTo('#6bdcff', this.x, this.y, 100, this.angle + 3 / 2 * Math.PI, this.angle + 2 * Math.PI + 0.00001);

        this.arcTo('#F00', this.x, this.y, 130, this.angle2, this.angle2 + 1 / 2 * Math.PI + 0.00001);

        this.arcTo('#c636ff', this.x, this.y, 130, this.angle2 + 1 / 2 * Math.PI, this.angle2 + Math.PI + 0.00001);

        this.arcTo('#ffab1b', this.x, this.y, 130, this.angle2 + Math.PI, this.angle2 + 3 / 2 * Math.PI + 0.00001);

        this.arcTo('#6bdcff', this.x, this.y, 130, this.angle2 + 3 / 2 * Math.PI, this.angle2 + 2 * Math.PI + 0.00001);
    }

    update() {
        this.angle += this.parent.rotationSpeed;
        this.angle2 -= this.parent.rotationSpeed;
        this.draw();
    }
}

class TouchingCircle extends Obstacle {
    constructor(x, y, parent) {
        super(x, y, parent);
        this.height = 240;
        this.angle1 = 0;
        this.angle2 = 1 / 3 * Math.PI;
    }

    draw() {
        this.context.lineCap = "butt";
        this.arcTo('#F00', this.x - 90, this.y, 80, this.angle1, this.angle1 + 2 / 3 * Math.PI);

        this.arcTo('#ffab1b', this.x - 90, this.y, 80, this.angle1 + 2 / 3 * Math.PI, this.angle1 + 4 / 3 * Math.PI);

        this.arcTo('#6bdcff', this.x - 90, this.y, 80, this.angle1 + 4 / 3 * Math.PI, this.angle1 + 2 * Math.PI);

        this.arcTo('#F00', this.x + 110, this.y, 100, this.angle2, this.angle2 + 2 / 3 * Math.PI);

        this.arcTo('#ffab1b', this.x + 110, this.y, 100, this.angle2 + 2 / 3 * Math.PI, this.angle2 + 4 / 3 * Math.PI);

        this.arcTo('#6bdcff', this.x + 110, this.y, 100, this.angle2 + 4 / 3 * Math.PI, this.angle2 + 2 * Math.PI);
    }

    update() {
        this.angle1 += this.parent.rotationSpeed;
        this.angle2 -= this.parent.rotationSpeed
        this.draw();
    }
}

class Rhombus extends Obstacle {
    constructor(x, y, parent) {
        super(x, y, parent);
        this.height = 320;
        this.angle = 0;
        this.alpha = (3 + Math.random()) * Math.PI / 16;
        this.shortDiagonal = this.height / 2 * Math.tan(this.alpha);
        this.longDiagonal = this.height / 2;
    }

    draw() {
        this.context.lineCap = "round";
        this.lineTo('#F00',
            this.x - Math.sin(this.angle) * this.shortDiagonal,
            this.y - Math.cos(this.angle) * this.shortDiagonal,
            this.x - Math.sin(this.angle + 1 / 2 * Math.PI) * this.longDiagonal,
            this.y - Math.cos(this.angle + 1 / 2 * Math.PI) * this.longDiagonal
        );

        this.lineTo('#c636ff',
            this.x - Math.sin(this.angle + 1 / 2 * Math.PI) * this.longDiagonal,
            this.y - Math.cos(this.angle + 1 / 2 * Math.PI) * this.longDiagonal,
            this.x - Math.sin(this.angle + Math.PI) * this.shortDiagonal,
            this.y - Math.cos(this.angle + Math.PI) * this.shortDiagonal
        );

        this.lineTo('#6bdcff',
            this.x - Math.sin(this.angle + Math.PI) * this.shortDiagonal,
            this.y - Math.cos(this.angle + Math.PI) * this.shortDiagonal,
            this.x - Math.sin(this.angle + 3 / 2 * Math.PI) * this.longDiagonal,
            this.y - Math.cos(this.angle + 3 / 2 * Math.PI) * this.longDiagonal
        );

        this.lineTo('#ffab1b',
            this.x - Math.sin(this.angle + 3 / 2 * Math.PI) * this.longDiagonal,
            this.y - Math.cos(this.angle + 3 / 2 * Math.PI) * this.longDiagonal,
            this.x - Math.sin(this.angle + 2 * Math.PI) * this.shortDiagonal,
            this.y - Math.cos(this.angle + 2 * Math.PI) * this.shortDiagonal
        );
    }

    update() {
        this.angle += this.parent.rotationSpeed;
        this.draw();
    }
}

class Cross extends Obstacle {
    constructor(x, y, parent) {
        super(x, y, parent);
        this.height = 240;
        this.angle = 0;
    }

    draw() {
        this.context.lineCap = "round";
        this.lineTo('#F00', this.x - this.height / 4,
            this.y, this.x - this.height / 4 - Math.sin(this.angle) / 2 * this.height,
            this.y - Math.cos(this.angle) / 2 * this.height
        );

        this.lineTo('#ffab1b', this.x - this.height / 4,
            this.y, this.x - this.height / 4 - Math.sin(this.angle + 1 / 2 * Math.PI) / 2 * this.height,
            this.y - Math.cos(this.angle + 1 / 2 * Math.PI) / 2 * this.height
        );

        this.lineTo('#6bdcff', this.x - this.height / 4,
            this.y, this.x - this.height / 4 - Math.sin(this.angle + Math.PI) / 2 * this.height,
            this.y - Math.cos(this.angle + Math.PI) / 2 * this.height
        );

        this.lineTo('#c636ff', this.x - this.height / 4,
            this.y, this.x - this.height / 4 - Math.sin(this.angle + 3 / 2 * Math.PI) / 2 * this.height,
            this.y - Math.cos(this.angle + 3 / 2 * Math.PI) / 2 * this.height
        );
    }

    update() {
        this.angle += this.parent.rotationSpeed;
        this.draw();
    }
}

class DoubleCross extends Obstacle {
    constructor(x, y, parent) {
        super(x, y, parent);
        this.height = 240;
        this.angle = 0;
        this.angle1 = 0;
    }

    draw() {
        this.context.lineCap = "round";
        this.lineTo('#F00', this.x - 120,
            this.y, this.x - 120 - Math.sin(this.angle) * 120,
            this.y - Math.cos(this.angle) * 120
        );

        this.lineTo('#ffab1b', this.x - 120,
            this.y, this.x - 120 - Math.sin(this.angle + 1 / 2 * Math.PI) * 120,
            this.y - Math.cos(this.angle + 1 / 2 * Math.PI) * 120
        );

        this.lineTo('#6bdcff', this.x - 120,
            this.y, this.x - 120 - Math.sin(this.angle + Math.PI) * 120,
            this.y - Math.cos(this.angle + Math.PI) * 120
        );

        this.lineTo('#c636ff', this.x - 120,
            this.y, this.x - 120 - Math.sin(this.angle + 3 / 2 * Math.PI) * 120,
            this.y - Math.cos(this.angle + 3 / 2 * Math.PI) * 120
        );

        this.lineTo('#F00', this.x + 80,
            this.y, this.x + 80 - Math.sin(this.angle1) * 80,
            this.y - Math.cos(this.angle1) * 80
        );

        this.lineTo('#ffab1b', this.x + 80,
            this.y, this.x + 80 - Math.sin(this.angle1 + 1 / 2 * Math.PI) * 80,
            this.y - Math.cos(this.angle1 + 1 / 2 * Math.PI) * 80
        );

        this.lineTo('#6bdcff', this.x + 80,
            this.y, this.x + 80 - Math.sin(this.angle1 + Math.PI) * 80,
            this.y - Math.cos(this.angle1 + Math.PI) * 80
        );

        this.lineTo('#c636ff', this.x + 80,
            this.y, this.x + 80 - Math.sin(this.angle1 + 3 / 2 * Math.PI) * 80,
            this.y - Math.cos(this.angle1 + 3 / 2 * Math.PI) * 80
        );
    }

    update() {
        this.angle += this.parent.rotationSpeed;
        this.angle1 -= this.parent.rotationSpeed;
        this.draw();
    }
}