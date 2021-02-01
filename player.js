
class Player {
    constructor(x, y, level) {
        Object.assign(this, { x, y, level });

        this.inventory = [];

        this.colors = {};
        this.colors["red"] = false;
        this.colors["blue"] = false;
        this.colors["yellow"] = false;
        
    }

    up() {
        success = this.attemptToMove(this.x, this.y, this.x, this.y - 1);  // Note: "Up" is a decrease in y coordinate
    }

    left() {
        success = this.attemptToMove(this.x, this.y, this.x - 1, this.y);

    }

    down() {
        success = this.attemptToMove(this.x, this.y, this.x, this.y + 1);  // Note: "Down" is an increase in y coordinate

    }

    right() {
        success = this.attemptToMove(this.x, this.y, this.x + 1, this.y);

    }

    attemptToMove(x_old, y_old, x_new, y_new) {
        newTile = this.level.getTile(x_new, y_new);

        if (!newTile) {  // Return false if tile does not exist
            return false;
        }

        bridge = this.level.getBridge(x_old, y_old, x_new, y_new3);

        success = !bridge || bridge.attemptPass(this);
        
        if (success) {
            this.moveToLocation(x_new, y_new);
        }
        return success;
    }

    moveToLocation(x, y) {
        this.x = x;
        this.y = y;
        this.level.getTile(x_new, y_new).land(this);
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