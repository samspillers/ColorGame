// This game shell was happily modified from Googler Seth Ladd's "Bad Aliens" game and his Google IO talk in 2011

class GameEngine {
    constructor(colorSettings, total_width, total_height, border_size, tile_angle, diagonal_to_horizontal_ratio, bridge_to_tile_ratio, bridge_depth_to_bridge_width_ratio) {
        Object.assign(this, { colorSettings, total_width, total_height, border_size, tile_angle, diagonal_to_horizontal_ratio, bridge_to_tile_ratio, bridge_depth_to_bridge_width_ratio });
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

        this.panels = [];
        this.editingPanels = [];
        this.initializeEditingPanels();
        this.editingMode = false;
    };

    addPanel(panel) {
        this.panels.push(panel);
    }

    setColorSettings(colorSettings) {
        this.colorSettings = colorSettings;
    }

    loadLevel(level) {
        this.currentLevel = level;
        this.currentLevel.setGameSettings(this.colorSettings, this.total_width, this.total_height, this.border_size, this.tile_angle, this.diagonal_to_horizontal_ratio, this.bridge_to_tile_ratio, this.bridge_depth_to_bridge_width_ratio);
    } 
    
    getLevel() {
        return this.currentLevel;
    }

    getColorSettings() {
        return this.colorSettings;
    }

    setEditingMode(b) {
        this.editingMode = b;
    }

    flushDirectionQueue() {
        while (this.directionQueue.length > 0) {
            var nextDirection = this.directionQueue.splice(0, 1)[0];
            switch (nextDirection) {
                case "up":
                    this.currentLevel.getPlayer().up(this.currentLevel);
                    break;
                case "down":
                    this.currentLevel.getPlayer().down(this.currentLevel);
                    break;
                case "left":
                    this.currentLevel.getPlayer().left(this.currentLevel);
                    break;
                case "right":
                    this.currentLevel.getPlayer().right(this.currentLevel);
                    break;
            }
        }
    }

    handleClick(x, y) {
        for (const panel of this.panels) {
            panel.checkCollision(x, y);
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

        var getXandY = function (e) {
            var x = e.clientX - that.ctx.canvas.getBoundingClientRect().left;
            var y = e.clientY - that.ctx.canvas.getBoundingClientRect().top;

            return [x, y];
        }

        // this.ctx.canvas.addEventListener("mousemove", function (e) {
        //     //console.log(getXandY(e));
        //     that.mouse = getXandY(e);
        // }, false);

        this.ctx.canvas.addEventListener("click", function (e) {
            //console.log(getXandY(e));
            var click = getXandY(e);
            that.handleClick(click[0], click[1]);
            
        }, false);

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
        for (const panel of this.panels) {
            panel.draw(this.ctx);
        }        
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
        // this.update();  // Not needed (?)
        this.draw();
    };

    initializeEditingPanels() {
        var tempPanel = new Panel(0, 0, this.total_width, this.border_size * 0.9, 2, false, true, true);
        tempPanel.addElement(new DrawableUIElement("./sprites/tile.png", 0, 0, 128, 97, 64, 48));
        tempPanel.addElement(new DrawableUIElement("./sprites/tile.png", 0, 0, 128, 97, 64, 48));
        tempPanel.addElement(new DrawableUIElement("./sprites/tile.png", 0, 0, 128, 97, 64, 48));
        tempPanel.addElement(new DrawableUIElement("./sprites/tile.png", 0, 0, 128, 97, 64, 48));
        tempPanel.addElement(new DrawableUIElement("./sprites/tile.png", 0, 0, 128, 97, 64, 48));
        tempPanel.addElement(new DrawableUIElement("./sprites/tile.png", 0, 0, 128, 97, 64, 48));
        tempPanel.addElement(new DrawableUIElement("./sprites/tile.png", 0, 0, 128, 97, 64, 48));
        this.editingPanels.push(tempPanel);
    }
};