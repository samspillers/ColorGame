class Player extends Drawable {
    constructor() {
        super("./sprites/player.png", 0, 0, 94, 94, copy(grey));

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

    up(level) {
        var success = this.attemptToMove(level, this.x, this.y, this.x, this.y - 1);  // Note: "Up" is a decrease in y coordinate
    }

    left(level) {
        var success = this.attemptToMove(level, this.x, this.y, this.x - 1, this.y);

    }

    down(level) {
        var success = this.attemptToMove(level, this.x, this.y, this.x, this.y + 1);  // Note: "Down" is an increase in y coordinate

    }

    right(level) {
        var success = this.attemptToMove(level, this.x, this.y, this.x + 1, this.y);

    }

    attemptToMove(level, x_old, y_old, x_new, y_new) {
        var newTile = level.getTile(x_new, y_new);

        if (!newTile) {  // Return false if tile does not exist
            return false;
        }

        var bridge = level.getBridge(x_old, y_old, x_new, y_new);

        var success = !bridge || bridge.attemptPass(this);
        
        if (success) {
            this.moveToLocation(level, x_new, y_new);
        }
        return success;
    }

    moveToLocation(level, x, y) {
        this.x = x;
        this.y = y;
        level.getTile(x, y).land(this);
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
