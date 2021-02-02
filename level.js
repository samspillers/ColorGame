function getMinMaxIndecesOfArray(array) {
	var min = undefined;
	var max = undefined;
	var keys = Object.keys(array);

	for (i in Object.keys(array)) {
		if (min == undefined || parseFloat(keys[i]) < min) {
			min = parseFloat(keys[i]);
		}
		if (max == undefined || parseFloat(keys[i]) > max) {
			max = parseFloat(keys[i]);
		}
    }
    return [min, max];
}

function getSortedFloatKeysOfArray(array) {
    var keys = Object.keys(array);
    var output = []
    for (var key in keys) {
        output.push(parseFloat(keys[key]));
    }
    output.sort();
    return output;
}

class Level {
    constructor() {
        this.tiles = {};
        this.bridges = {};
    };

    addTile(x, y, tile) {
        if (!this.tiles[x]) {
            this.tiles[x] = {};
        }
        if (this.tiles[x][y]) {
            throw "tile already there";
        }
        this.tiles[x][y] = tile;
    }

    removeTile(x, y) {
        this.tiles[x][y] = undefined;
    }

    getTile(x, y) {
        return this.tiles[x][y];
    }

    addBridge(x1, y1, x2, y2, bridge) {
        var tile1 = getTile(x1, y1);
        var tile2 = getTile(x2, y2);
        if (!tile1 || !tile2) {
            throw "Tile(s) does not exist";
        }
        var bridgeX = (x1 + x2) / 2;
        var bridgeY = (y1 + y2) / 2;
        if (this.bridges[bridgeX][bridgeY]) {
            throw "bridge already there";
        }
        this.bridges[bridgeX][bridgeY] = bridge;
    }

    removeBridge(x1, y1, x2, y2) {
        var bridgeX = (x1 + x2) / 2;
        var bridgeY = (y1 + y2) / 2;
        this.bridges[bridgeX][bridgeY] = undefined;
    }

    getBridge(x1, y1, x2, y2) {
        var bridgeX = (x1 + x2) / 2;
        var bridgeY = (y1 + y2) / 2;
        return this.bridges[bridgeX][bridgeY];
    }

    bakePixelSizing(total_width, total_height, border_size, tile_angle, diagonal_to_horizontal_ratio, bridge_to_tile_ratio) {
        // Find the dimensions of the level
        var [xMin, xMax] = getMinMaxIndecesOfArray(this.tiles);
        var yMin = undefined;
        var yMax = undefined;
        for (var row in this.tiles) {
            var [currYMin, currYMax] = getMinMaxIndecesOfArray(this.tiles[row]);

            if (yMin == undefined || currYMin < yMin) {
                yMin = currYMin;
            }
            if (yMax == undefined || currYMax > yMax) {
                yMax = currYMax;
            }
        }
        this.xMax = xMax;
        this.xMin = xMin;
        this.yMax = yMax;
        this.yMin = yMin;
        var tilesWide = this.xMax - this.xMin + 1;
        var tilesHigh = this.yMax - this.yMin + 1;

        // Find maximum possible tile size that could fit the number of tiles needed
        var usuableWidth = total_width - border_size * 2;
        var usuableHeight = total_height - border_size * 2;
        
        // overhang tile width to horizontal tile width ratio
        var othr = diagonal_to_horizontal_ratio * Math.cos(tile_angle);
        // vertical tile height to horizontal tile height ratio
        var vthr = diagonal_to_horizontal_ratio * Math.sin(tile_angle);

        var tileWidthsWide = (tilesWide + (tilesWide - 1) * bridge_to_tile_ratio
        + tilesHigh * othr + (tilesHigh - 1) * bridge_to_tile_ratio * othr);
        var tileheightsTall = (tilesHigh * vthr + (tilesHigh - 1) * vthr * bridge_to_tile_ratio);
        var maxWidthHortizontal = usuableWidth / tileWidthsWide
        var maxWidthVertical = usuableHeight / tileheightsTall

        // Picks the smaller maximum tile size and sets the tile width and height
        var tileSize = Math.min(maxWidthHortizontal, maxWidthVertical);

        var usedWidth = tileSize * tileWidthsWide
        var usedHeight = tileSize * tileheightsTall

        this.tileWidth = tileSize;
        this.tileHeight = tileSize * vthr;
        this.tileHorizontalOverhang = tileSize * othr;
        this.xCenterOffset = (usuableWidth - usedWidth) / 2
        this.yCenterOffset = (usuableHeight - usedHeight) / 2

        console.log("total_width");
        console.log(total_width);
        console.log("total_height");
        console.log(total_height);
        console.log("border_size");
        console.log(border_size);
        console.log("tile_angle");
        console.log(tile_angle);
        console.log("diagonal_to_horizontal_ratio");
        console.log(diagonal_to_horizontal_ratio);
        console.log("bridge_to_tile_ratio");
        console.log(bridge_to_tile_ratio);
        console.log("this.xMax");
        console.log(this.xMax);
        console.log("this.xMin");
        console.log(this.xMin);
        console.log("this.yMin");
        console.log(this.yMin);
        console.log("this.yMax");
        console.log(this.yMax);
        console.log("tilesWide");
        console.log(tilesWide);
        console.log("tilesHigh");
        console.log(tilesHigh);
        console.log("usuableWidth");
        console.log(usuableWidth);
        console.log("usuableHeight");
        console.log(usuableHeight);
        console.log("othr");
        console.log(othr);
        console.log("vthr");
        console.log(vthr);
        console.log("tileWidthsWide");
        console.log(tileWidthsWide);
        console.log("tileheightsTall");
        console.log(tileheightsTall);
        console.log("maxWidthHortizontal");
        console.log(maxWidthHortizontal);
        console.log("maxWidthVertical");
        console.log(maxWidthVertical);
        console.log("tileSize");
        console.log(tileSize);
        console.log("usedWidth");
        console.log(usedWidth);
        console.log("usedHeight");
        console.log(usedHeight);
        console.log("this.tileWidth");
        console.log(this.tileWidth);
        console.log("this.tileHeight");
        console.log(this.tileHeight);
        console.log("this.tileHorizontalOverhang");
        console.log(this.tileHorizontalOverhang);
        console.log("this.xCenterOffset");
        console.log(this.xCenterOffset);
        console.log("this.yCenterOffset");
        console.log(this.yCenterOffset);

    }

    draw(ctx) {
        this.draw2(ctx, 1024, 768, 50, Math.PI * 5 / 12, 1, 0.2, 2)
    }

    // tile_angle should be in radians
    draw2(ctx, total_width, total_height, border_size, tile_angle, diagonal_to_horizontal_ratio, bridge_to_tile_ratio, bridge_depth_to_bridge_width_ratio) {
        if (!this.xMax || !this.xMin || !this.yMax || !this.yMin || !this.tileWidth || !this.tileHeight || !this.xCenterOffset || !this.yCenterOffset || !this.tileHorizontalOverhang) {
            this.bakePixelSizing(total_width, total_height, border_size, tile_angle, diagonal_to_horizontal_ratio, bridge_to_tile_ratio);
        }

        // Iterate over every tile
        var rowKeys = getSortedFloatKeysOfArray(this.tiles);
        for (var i in rowKeys) {
            var x = rowKeys[i];
            var columnKeys = getSortedFloatKeysOfArray(this.tiles[x]);
            for (var j in columnKeys) {
                var y = columnKeys[j];

                // Get tile
                var tile = this.tiles[x][y]

                // Get x, y, and width and height of image to draw
                var xOff = x - this.xMin;
                var yOff = y - this.yMin;
                var xPixel = border_size + this.xCenterOffset + xOff * (this.tileWidth + this.tileWidth * bridge_to_tile_ratio)
                                     + (this.yMax - y) * (this.tileHorizontalOverhang + this.tileHorizontalOverhang * bridge_to_tile_ratio);
                var yPixel = border_size + this.yCenterOffset + yOff * (this.tileHeight + this.tileHeight * bridge_to_tile_ratio);
                var xWidth = this.tileWidth + this.tileHorizontalOverhang;
                var yHeight = this.tileHeight;

                // console.log("this.xMax");
                // console.log(this.xMax);
                // console.log("this.xMin");
                // console.log(this.xMin);
                // console.log("this.yMin");
                // console.log(this.yMin);
                // console.log("this.yMax");
                // console.log(this.yMax);
                // console.log("this.tileWidth");
                // console.log(this.tileWidth);
                // console.log("this.tileHeight");
                // console.log(this.tileHeight);
                // console.log("!this.tileHorizontalOverhang");
                // console.log(!this.tileHorizontalOverhang);
                // console.log("x");
                // console.log(x);
                // console.log("y");
                // console.log(y);
                // console.log("xOff");
                // console.log(xOff);
                // console.log("yOff");
                // console.log(yOff);
                // console.log("xPixel");
                // console.log(xPixel);
                // console.log("yPixel");
                // console.log(yPixel);
                // console.log("xWidth");
                // console.log(xWidth);
                // console.log("yHeight");
                // console.log(yHeight);
                // Draw image
                tile.draw(ctx, xPixel, yPixel, xWidth, yHeight);
            }
        }
        // Iterate over every tile
        var rowKeys = getSortedFloatKeysOfArray(this.bridges);
        for (var i in rowKeys) {
            var x = rowKeys[i];
            var columnKeys = getSortedFloatKeysOfArray(this.bridges[x]);
            for (var j in columnKeys) {
                var y = columnKeys[j];

                // Get tile
                var bridge = this.bridges[x][y]

                // Get x, y, and width and height of image to draw
                var xOff = x - this.xMin + 0.5;
                var yOff = y - this.yMin + 0.5;

                var imageHeight = this.tileHeight + this.tileWidth * bridge_to_tile_ratio * bridge_depth_to_bridge_width_ratio;
                
                var xPixel = border_size + this.xCenterOffset + xOff * this.tileWidth + (xOff - 1) * this.tileWidth * bridge_to_tile_ratio
                                     + (this.yMax - y) * this.tileHorizontalOverhang + (this.yMax - y - 1) * this.tileHorizontalOverhang * bridge_to_tile_ratio;
                var yPixel = border_size + this.yCenterOffset + yOff * (this.tileHeight + this.tileHeight * bridge_to_tile_ratio) - imageHeight;
                var xWidth = this.tileWidth * bridge_to_tile_ratio + this.tileHorizontalOverhang;
                var yHeight = imageHeight;

                // Draw image
                bridge.draw(ctx, xPixel, yPixel, xWidth, yHeight);
            }
        }
        throw "Stop!"
    }

    update() {}
}

class Drawable {
    constructor(imagePath, sx, sy, sw, sh) {
        Object.assign(this, { imagePath, sx, sy, sw, sh });

        this.spritesheet = ASSET_MANAGER.getAsset(imagePath);
    };

    draw(ctx, x, y, width, height) {
        ctx.drawImage(this.spritesheet, this.sx, this.sy, this.sw, this.sh, x, y, width, height);
        // ctx.drawImage(this.spritesheet, 0, 0, 128, 97, x, y, width, height);
    }
}

class Tile extends Drawable {
    constructor(imagePath, sx, sy, sw, sh) {
        (imagePath != undefined) ? super(imagePath, sx, sy, sw, sh) : super("./sprites/tile.png", 0, 0, 128, 97);
    };

    // @Abstract
    // land(player)
}

class Bridge extends Drawable {
    constructor(imagePath, sx, sy, sw, sh) {
        super(imagePath, sx, sy, sw, sh);
    };

    // @Abstract
    // attemptPass(player)
}

class ColorBarrier extends Bridge {

    // colors should be an array of color strings
    constructor(imagePath, sx, sy, sw, sh, colors) {
        super(imagePath, sx, sy, sw, sh);
        Object.assign(this, { colors });

    };

    attemptPass(player) {
        passable = true;
        for (color in colors) {
            passable = passable && player.colors[color];
        }
        return passable;
    }

    draw(ctx, x, y) {

    }
}

class KeyGate extends Bridge {

    // colors should be an array of color strings
    constructor(imagePath, sx, sy, sw, sh, keyId) {
        super(imagePath, sx, sy, sw, sh);
        Object.assign(this, { keyId });
        locked = true;
    };

    attemptPass(player) {
        return player.hasKey(this.keyId);
    }

    draw(ctx, x, y) {

    }
}

class Finish extends Tile {
    constructor() {
        super("./sprites/tileFinish.png", 0, 0, 128, 97);
    };
}

class ColorPad extends Tile {
    // color should be a string of "red", "blue", or "yellow"
    constructor(color) {
        super("./sprites/tileColorPad.png", 0, 0, 128, 97);
        Object.assign(this, { color });
    };

    land(player) {
        if (!player.colors["black"]) {
            player.colors[this.color] = !player.colors[this.color];
        }
    }
}
