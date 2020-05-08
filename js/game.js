class Game {
    constructor(parent, mode) {
        this.parent = parent;
        this.mode = mode;
        this.init();

        this.canvas = document.createElement("canvas");
        this.canvas.width = this.parent.clientWidth;
        this.canvas.height = this.parent.clientHeight;
        this.canvas.setAttribute('style', 'position:absolute;')
        this.parent.insertBefore(this.canvas, this.parent.childNodes[0]);

        this.context = this.canvas.getContext('2d');
        this.powerUpHandler = () => {
            this.seconds -= 0.1;
            this.powerUpTimerDiv.innerText = '+' + this.seconds.toFixed(1) + 's';
        }
    }

    init() {
        if (localStorage.getItem('color_switch_score') == null) {
            this.best = 0;
            localStorage.setItem('color_switch_score', '0');
        } else {
            this.best = parseInt(localStorage.getItem('color_switch_score'));
        }

        this.gameBar = document.createElement('div');
        this.gameBar.id = 'game_bar';
        this.parent.insertBefore(this.gameBar, this.parent.childNodes[0]);

        this.powerUpTimerDiv = document.createElement('div');
        this.powerUpTimerDiv.id = 'power_up_timer';
        this.gameBar.insertBefore(this.powerUpTimerDiv, this.gameBar.childNodes[0]);

        this.scoreDiv = document.createElement('div');
        this.scoreDiv.id = 'score';
        this.gameBar.insertBefore(this.scoreDiv, this.gameBar.childNodes[0]);

        this.multiplierDiv = document.createElement('div');
        this.multiplierDiv.id = 'multiplier';
        this.gameBar.insertBefore(this.multiplierDiv, this.gameBar.childNodes[0]);

        this.pauseDiv = document.createElement('img');
        this.pauseDiv.id = 'pause';
        this.pauseDiv.src = 'img/pause.png';
        this.gameBar.insertBefore(this.pauseDiv, this.gameBar.childNodes[0]);

        this.touchIcon = document.createElement('img');
        this.touchIcon.src = 'img/touch.png';
        this.touchIcon.setAttribute('style',
            'position: absolute;' +
            'left: ' + (this.parent.clientWidth / 2 - 48) + 'px;' +
            'top: ' + (this.parent.clientHeight * 7 / 8 - 48) + 'px;');
        this.parent.insertBefore(this.touchIcon, this.parent.childNodes[0]);

        this.popup = document.createElement('div');
        this.popup.id = 'popup';
        this.parent.insertBefore(this.popup, this.parent.childNodes[0]);

        this.popupContent = document.createElement('div');
        this.popupContent.id = 'popupContent';
        this.popup.insertBefore(this.popupContent, this.popup.childNodes[0]);

        this.restartImg = document.createElement('img');
        this.restartImg.id = 'restart';
        this.restartImg.src = "img/restart.png";
        this.popupContent.insertBefore(this.restartImg, this.popupContent.childNodes[0]);

        this.popupMessage = document.createElement('div');
        this.popupMessage.id = 'popupMessage';
        this.popupContent.insertBefore(this.popupMessage, this.popupContent.childNodes[0]);

        this.helper = document.createElement('span');
        this.helper.id = "helper";
        this.popup.insertBefore(this.helper, this.popup.childNodes[0]);

        this.restartImg.addEventListener('click', () => this.start());
    }

    draw() {
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.draw();
    }

    update() {
        if (this.running) {
            this.clear();
            this.player.update();
            this.objects.forEach(o => {
                o.update()
                if(o instanceof PowerUp) {
                    if(o.y > this.canvas.height / 2 && !o.hasRun) {
                        if (o instanceof MultiColor) {
                            o.hasRun = true;
                            this.rotationSpeed = 0.02 + (0.001 * (this.multiplier - 1));
                            this.player.dontCheck();
                            this.startPowerUpTimer(10);
                        }
                        if (o instanceof Slow) {
                            o.hasRun = true;
                            this.rotationSpeed = 0.01;
                            this.player.check();
                            this.startPowerUpTimer(10);
                        }
                    }
                }
            });
            window.requestAnimationFrame(() => this.update());
        }
    }

    startPowerUpTimer(sec) {
        this.seconds = sec;
        clearInterval(this.powerUpInterval);
        this.powerUpInterval = setInterval(this.powerUpHandler, 100);
        clearTimeout(this.powerUpTimeOut);
        this.powerUpTimeOut = setTimeout(() => {
            clearInterval(this.powerUpInterval);
            this.powerUpTimerDiv.innerText = '';
            this.rotationSpeed = 0.02 + (0.001 * (this.multiplier - 1));
            if(this.rotationSpeed > 0.03) this.rotationSpeed = 0.03;
            this.player.dontCheck();
            this.player.check();
        }, sec * 1000);
    }

    start() {
        this.distance = 200;
        this.seconds = 0;
        this.rotationSpeed = 0.02;
        this.multiplier = 1;
        this.objects = [];
        this.running = true;
        this.touchIcon.hidden = false;

        this.powerUpTimerDiv.innerText = '';

        this.popup.setAttribute('style', 'display: none;');
        this.player = new Player(this.canvas.width / 2, this.canvas.height * 3 / 4, this);
        if (/Mobi/i.test(window.navigator.userAgent) === false) {
            this.eventType = 'mousedown';
        } else {
            this.eventType = 'touchstart';
        }
        this.mouseListener = () => {
            this.touchIcon.hidden = true;
            this.player.gravity = -2;
            if (this.player.gravitySpeed <= 0) this.player.gravitySpeed = 0;
            window.setTimeout(() => {
                this.player.gravity = 0.4;
            }, 100)
        }
        this.keyListener = (event) => {
            console.log(event.code);
            this.touchIcon.hidden = true;
            if(event.code.toString() === 'ArrowUp') {
                this.player.gravity = -2;
                if (this.player.gravitySpeed <= 0) this.player.gravitySpeed = 0;
                window.setTimeout(() => {
                    this.player.gravity = 0.4;
                }, 100)
            }
        }
        if(this.mode === 'key' && /Mobi/i.test(window.navigator.userAgent) === false) {
            document.addEventListener('keydown', this.keyListener);
            this.touchIcon.src = 'img/arrow.png';
        } else {
            this.canvas.addEventListener(this.eventType, this.mouseListener);
            if(/Mobi/i.test(window.navigator.userAgent) === false) {
                this.touchIcon.src = 'img/mouse.png';
            }
        }
        this.pauseListener = () => {
            if (this.running) {
                this.pauseDiv.src = 'img/play.png';
                this.pause();
            } else {
                this.pauseDiv.src = 'img/pause.png';
                this.resume();
            }
        };
        this.pauseDiv.addEventListener('click', this.pauseListener);
        this.clear();
        this.addObstacle();
        this.update();
        this.player.check();
    }

    resume() {
        this.running = true;
        this.canvas.addEventListener(this.eventType, this.mouseListener);
        this.update();
    }

    pause() {
        this.running = false;
        this.canvas.removeEventListener(this.eventType, this.mouseListener);
    }

    stop() {
        this.running = false;
        clearInterval(this.powerUpInterval);
        clearTimeout(this.powerUpTimeOut);
        document.removeEventListener('keydown', this.keyListener);
        this.canvas.removeEventListener(this.eventType, this.mouseListener);
        this.pauseDiv.removeEventListener('click', this.pauseListener);
        let msg =
            "<div style='color: white; font-family: Russo; font-size: 48px'> Game Over! </div><br>" +
            "<div style='color: white; font-family: Russo; font-size: 32px'> " + this.player.score.toString() + "</div>";
        if(this.player.score > this.best) {
            msg += "<br><div style='color: green; font-family: Russo; font-size: 18px'>New High Score!</div>";
            localStorage.setItem('color_switch_score', this.player.score.toString());
        } else {
            msg += "<br><div style='color: red; font-family: Russo; font-size: 28px'>Highest : " + this.best.toString() + "</div>";
        }
        this.popup.setAttribute('style', 'display: block !important;');
        this.popupMessage.innerHTML = msg;
    }

    addObstacle() {
        let obstacle;
        switch (getRandomInt(7)) {
            case 0 :
                obstacle = (new Circle(this.canvas.width / 2, -100, this));
                break;
            case 1 :
                obstacle = (new Triangle(this.canvas.width / 2, -100, this));
                break;
            case 2 :
                obstacle = (new Concentric(this.canvas.width / 2, -100, this));
                break;
            case 3 :
                obstacle = (new TouchingCircle(this.canvas.width / 2, -100, this));
                break;
            case 4 :
                obstacle = (new Rhombus(this.canvas.width / 2, -100, this));
                break;
            case 5 :
                obstacle = (new Cross(this.canvas.width / 2, -100, this));
                break;
            case 6 :
                obstacle = (new DoubleCross(this.canvas.width / 2, -100, this));
                break;
        }
        this.objects.push(obstacle);
    }

    addPowerUp() {
        let powerUp;
        switch (getRandomInt(2)) {
            case 0:
                powerUp = (new MultiColor(this.canvas.width / 2, -100, this));
                break;
            case 1:
                powerUp = (new Slow(this.canvas.width / 2, -100, this));
                break;
        }
        this.objects.push(powerUp);
    }

    scrollUp(dy) {
        if (this.objects[this.objects.length - 1].y
            > this.objects[this.objects.length - 1].height + this.distance) {
            if (getRandomInt(20) !== 0) {
                this.addObstacle();
            } else {
                this.addPowerUp();
            }
        }
        this.objects.forEach(object => {
            object.y += dy;
            if (object.y - object.height / 2 > this.canvas.height) {
                this.objects.shift();
            }
        });
    }
}

class Player {
    constructor(x, y, parent) {
        this.parent = parent;
        this.width = 20;
        this.height = 20;
        this.x = x;
        this.y = y;
        this.speed = 0;
        this.gravity = 0;
        this.gravitySpeed = 0;
        this.score = 0;
        this.context = this.parent.context;
        this.isTouching = () => {
            let imageData = this.context.getImageData(
                this.x - (this.width / 2 + 3),
                this.y - (this.height / 2 + 3),
                this.width / 2 + 6,
                this.height / 2 + 6
            );
            let cx = (this.width + 6) / 2, cy = (this.height + 6) / 2;
            let buffer = new Uint32Array(imageData.data.buffer);
            for (let i = 0; i < 360; i += 45) {
                let r = cx - Math.trunc(cx * Math.cos(i / 180 * Math.PI));
                let c = cy - Math.trunc(cy * Math.sin(i / 180 * Math.PI));
                // console.log(r + ',' + c + ',\t' + ((buffer[r * cx * 2 + c] >> 16) & 0xFF)
                //     + '+' + ((buffer[r * cx * 2 + c] >> 8) & 0xFF));
                if (!(((buffer[r * cx * 2 + c] >> 16) & 0xFF)
                    === ((buffer[r * cx * 2 + c] >> 8) & 0xFF))) {
                    clearInterval(this.interval);
                    this.parent.stop();
                    break;
                }
            }
        }
    }

    check() {
        clearInterval(this.interval);
        this.interval = setInterval(this.isTouching, 16)
    }

    dontCheck() {
        clearInterval(this.interval);
    }

    update() {
        this.gravitySpeed += this.gravity;
        this.y += this.speed + this.gravitySpeed;
        if (this.y < this.parent.canvas.height / 2) {
            this.parent.scrollUp(this.parent.canvas.height / 2 - this.y);
            let prevScore = this.score;
            let  m = this.parent.multiplier;
            this.score += Math.ceil((this.parent.canvas.height / 2 - this.y) / 10) * this.parent.multiplier;
            if(Math.trunc(this.score / (250 * m * (m + 1))) > Math.trunc(prevScore / (250 * m * (m + 1)))) {
                this.parent.multiplier++;
                if(this.parent.rotationSpeed < 0.03) {
                    this.parent.rotationSpeed = 0.02 + (0.001 * (this.parent.multiplier - 1));
                }
                if(this.parent.distance > 50) this.parent.distance -= 10;
            }
            this.y = this.parent.canvas.height / 2;
        } else if (this.y > this.parent.canvas.height - this.height) {
            this.y = this.parent.canvas.height - this.height;
            this.gravitySpeed = 0;
        }
        this.parent.multiplierDiv.innerText = '\u00d7' + this.parent.multiplier.toString();
        this.parent.scoreDiv.innerText = this.score.toString();
        this.draw();
    }

    draw() {
        this.context.save();
        this.context.beginPath();
        this.context.fillStyle = '#F00'
        this.context.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
        this.context.fill();
        this.context.closePath();
        this.context.restore();
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}