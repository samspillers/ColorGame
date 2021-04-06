// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor() {
        this.entities = [];
        this.showOutlines = false;
        this.ctx = null;
        this.click = null;
        this.mouse = null;
        this.wheel = null;
        this.surfaceWidth = null;
        this.surfaceHeight = null;

        this.directionQueue = [];
        this.colorSettings = new ColorSettings();
        this.board = new ColorVennDiagram(this, true);
        this.currentLevel = null;

    };

    setColorSettings(colorSettings) {
        this.colorSettings = colorSettings;
    }

    loadLevel(level) {
        this.currentLevel = level;
    } 
    
    getLevel() {
        return this.currentLevel;
    }

    getColorSettings() {
        return this.colorSettings;
    }

    flushDirectionQueue() {
        while (this.directionQueue.length > 0) {
            var nextDirection = this.directionQueue.splice(0, 1)[0];
            switch (nextDirection) {
                case "up":
                    this.currentLevel.player.up(this.currentLevel);
                    break;
                case "down":
                    this.currentLevel.player.down(this.currentLevel);
                    break;
                case "left":
                    this.currentLevel.player.left(this.currentLevel);
                    break;
                case "right":
                    this.currentLevel.player.right(this.currentLevel);
                    break;
            }
        }
    }


    init(ctx) {
        this.ctx = ctx;
        this.surfaceWidth = this.ctx.canvas.width;
        this.surfaceHeight = this.ctx.canvas.height;
        this.startInput();
        this.timer = new Timer();
    };

    start() {
        var that = this;
        (function gameLoop() {
            that.loop();
            requestAnimFrame(gameLoop, that.ctx.canvas);
        })();
    };

    startInput() {
        var that = this;

        // var getXandY = function (e) {
        //     var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
        //     var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

        //     return { x: x, y: y };
        // }

        // this.ctx.canvas.addEventListener("mousemove", function (e) {
        //     //console.log(getXandY(e));
        //     that.mouse = getXandY(e);
        // }, false);

        // this.ctx.canvas.addEventListener("click", function (e) {
        //     //console.log(getXandY(e));
        //     that.click = getXandY(e);
        // }, false);

        // this.ctx.canvas.addEventListener("wheel", function (e) {
        //     //console.log(getXandY(e));
        //     that.wheel = e;
        //     //       console.log(e.wheelDelta);
        //     e.preventDefault();
        // }, false);

        // this.ctx.canvas.addEventListener("contextmenu", function (e) {
        //     //console.log(getXandY(e));
        //     that.rightclick = getXandY(e);
        //     e.preventDefault();
        // }, false);
        
        this.ctx.canvas.addEventListener("keyup", function (e) {
            switch (e.code) {
                case "ArrowLeft":
                case "KeyA":
                    that.directionQueue.push("left");
                    that.flushDirectionQueue();
                    break;
                case "ArrowRight":
                case "KeyD":
                    that.directionQueue.push("right");
                    that.flushDirectionQueue();
                    break;
                case "ArrowUp":
                case "KeyW":
                    that.directionQueue.push("up");
                    that.flushDirectionQueue();
                    break;
                case "ArrowDown":
                case "KeyS":
                    that.directionQueue.push("down");
                    that.flushDirectionQueue();
                    break;
            }
        }, false);
    };

    draw() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        // for (var i = 0; i < this.entities.length; i++) {
        //     this.entities[i].draw(this.ctx);
        // }
        this.currentLevel.draw(this.ctx);
        this.board.draw(this.ctx, 0, 768 - this.board.sprite.height * DEFAULT_VENN_SCALE, 1);
    };

    update() {
        var entitiesCount = this.entities.length;

        for (var i = 0; i < entitiesCount; i++) {
            var entity = this.entities[i];

            if (!entity.removeFromWorld) {
                entity.update();
            }
        }

        for (var i = this.entities.length - 1; i >= 0; --i) {
            if (this.entities[i].removeFromWorld) {
                this.entities.splice(i, 1);
            }
        }
    };

    loop() {
        this.clockTick = this.timer.tick();
        this.update();
        this.draw();
    };
};