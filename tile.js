class Tile {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
    };

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}

class Start extends Tile {
    constructor(game) {
        super(game, 0, 0);
    };
}
