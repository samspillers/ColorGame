class Player extends Drawable {
    constructor(level) {
        super("./sprites/player.png", 0, 0, 94, 94, copy(grey));

        this.level = level;

        this.inventory = [];

        // this.colors = {};
        // this.colors["red"] = false;
        // this.colors["blue"] = false;
        // this.colors["yellow"] = false;
        // this.colors["black"] = false;
    }

    drawOffset(level) {
        var maxSize = level.getTileWidth() - level.getTileHorizontalOverhang();
        var playerSize = maxSize * PLAYER_TILE_SCALE;
        return [level.getTileHorizontalOverhang() + maxSize / 2 - playerSize / 2, level.getTileHeight() / 2 - playerSize / 2];
    }

    drawSize(level) {
        var maxSize = level.getTileWidth() - level.getTileHorizontalOverhang();
        var playerSize = maxSize * PLAYER_TILE_SCALE;
        return [playerSize, playerSize];
    }

    up() {
        var success = this.attemptToMove(this.x, this.y, this.x, this.y - 1);  // Note: "Up" is a decrease in y coordinate
    }

    left() {
        var success = this.attemptToMove(this.x, this.y, this.x - 1, this.y);

    }

    down() {
        var success = this.attemptToMove(this.x, this.y, this.x, this.y + 1);  // Note: "Down" is an increase in y coordinate

    }

    right() {
        var success = this.attemptToMove(this.x, this.y, this.x + 1, this.y);

    }

    attemptToMove(x_old, y_old, x_new, y_new) {
        var newTile = this.level.getTile(x_new, y_new);

        if (!newTile) {  // Return false if tile does not exist
            return false;
        }

        var bridge = this.level.getBridge(x_old, y_old, x_new, y_new);

        var success = !bridge || bridge.attemptPass(this);
        
        if (success) {
            this.moveToLocation(x_new, y_new);
        }
        return success;
    }

    moveToLocation(x, y, level) {
        this.x = x;
        this.y = y;
        this.level.getTile(x, y).land(this);
    }

    hasKey(keyId) {
        for (item in this.inventory) {
            if (item instanceof Key && item.keyId === keyId) {
                return true;
            }
        }
        return false;
    }
}
classList.push(Player);
