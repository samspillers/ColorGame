const MAX_GRAYING = 0.5;  // Proportion

// The following are in pixels
const LINE_SPACING = 25;
const LINE_THICCNESS = 2;
const LINE_STRAY_CURVE = 4;
const LINE_STRAY_BEND = 6;
const LINE_ANGLE = Math.PI / 3;

const primaryColors = ["red", "blue", "yellow"];
const DEFAULT_OLD_COLOR = [0, 69, 0];
const DEFAULT_VENN_SCALE = 0.5;

const VENN_FILE_NAME = "./sprites/venn.png";

const grey = {
    'red': false,
    'blue': false,
    'yellow': false,
    'black': false
};
const red = {
    'red': true,
    'blue': false,
    'yellow': false,
    'black': false
};
const blue = {
    'red': false,
    'blue': true,
    'yellow': false,
    'black': false
};
const yellow = {
    'red': false,
    'blue': false,
    'yellow': true,
    'black': false
};
const purple = {
    'red': true,
    'blue': true,
    'yellow': false,
    'black': false
};
const green = {
    'red': false,
    'blue': true,
    'yellow': true,
    'black': false
};
const orange = {
    'red': true,
    'blue': false,
    'yellow': true,
    'black': false
};
const brown = {
    'red': true,
    'blue': true,
    'yellow': true,
    'black': false
};
const black = {
    'red': true,
    'blue': true,
    'yellow': true,
    'black': true
}

const colorDict = {
    'grey': grey,
    'red': red,
    'blue': blue,
    'yellow': yellow,
    'purple': purple,
    'green': green,
    'orange': orange,
    'brown': brown,
    'black': black
}

const RGB = {
    'grey': [224, 224, 224],
    'red': [255, 0, 0],
    'blue': [26, 83, 255],
    'yellow': [255, 255, 0],
    'purple': [138, 0, 230],
    'green': [0, 150, 0],
    'truegreen': [0, 255, 0],
    'orange': [255, 153, 0],
    'brown': [153, 77, 0],
    'black': [0, 0, 0],
    'magenta': [255, 128, 255],
    'cyan': [128, 255, 255],
    'lightyellow': [255, 255, 128],
    'darkgrey': [128, 128, 128],
    'lightgrey': [250, 250, 250]
}

var traditionalColorMap = {}
traditionalColorMap[JSON.stringify(grey)] = RGB['grey'];
traditionalColorMap[JSON.stringify(red)] = RGB['red'];
traditionalColorMap[JSON.stringify(blue)] = RGB['blue'];
traditionalColorMap[JSON.stringify(yellow)] = RGB['yellow'];
traditionalColorMap[JSON.stringify(purple)] = RGB['purple'];
traditionalColorMap[JSON.stringify(green)] = RGB['green'];
traditionalColorMap[JSON.stringify(orange)] = RGB['orange'];
traditionalColorMap[JSON.stringify(brown)] = RGB['brown'];
traditionalColorMap[JSON.stringify(black)] = RGB['black'];

var subtractiveColorMap = {}
subtractiveColorMap[JSON.stringify(grey)] = RGB['grey'];
subtractiveColorMap[JSON.stringify(red)] = RGB['magenta'];
subtractiveColorMap[JSON.stringify(blue)] = RGB['cyan'];
subtractiveColorMap[JSON.stringify(yellow)] = RGB['lightyellow'];
subtractiveColorMap[JSON.stringify(purple)] = RGB['blue'];
subtractiveColorMap[JSON.stringify(green)] = RGB['truegreen'];
subtractiveColorMap[JSON.stringify(orange)] = RGB['red'];
subtractiveColorMap[JSON.stringify(brown)] = RGB['darkgrey'];
subtractiveColorMap[JSON.stringify(black)] = RGB['black'];

var additiveColorMap = {}
additiveColorMap[JSON.stringify(grey)] = RGB['darkgrey'];
additiveColorMap[JSON.stringify(red)] = RGB['red'];
additiveColorMap[JSON.stringify(blue)] = RGB['blue'];
additiveColorMap[JSON.stringify(yellow)] = RGB['truegreen'];
additiveColorMap[JSON.stringify(purple)] = RGB['magenta'];
additiveColorMap[JSON.stringify(green)] = RGB['cyan'];
additiveColorMap[JSON.stringify(orange)] = RGB['lightyellow'];
additiveColorMap[JSON.stringify(brown)] = RGB['lightgrey'];
additiveColorMap[JSON.stringify(black)] = RGB['black'];


function replaceImageColor(imageCanvas, newColor, pattern, scale = 1, oldColor = DEFAULT_OLD_COLOR) {
    // scale is the amount at which the image will be scaled later. This adjusts the pixel location values so that the same sized patterns are used everywhere.

    var width = imageCanvas.width;
    var imageData = imageCanvas.getContext('2d').getImageData(0, 0, imageCanvas.width, imageCanvas.height);
    for (var i = 0; i < imageData.data.length; i+= 4) {
        if (imageData.data[i] == oldColor[0] && imageData.data[i + 1] == oldColor[1] && imageData.data[i + 2] == oldColor[2]) {
            var x = (i / 4) % width * scale;
            var y = Math.floor((i / 4) / width) * scale;

            var patternScalar = 0;
            if (pattern) {
                if (!pattern["black"]) {
                    if (pattern["red"]) {
                        patternScalar += redPatternIntensity(x, y);
                    }
                    if (pattern["blue"]) {
                        patternScalar += bluePatternIntensity(x, y);
                    }
                    if (pattern["yellow"]) {
                        patternScalar += yellowPatternIntensity(x, y);
                    }
                    patternScalar = 1 - clamp01(patternScalar);
                }
            } else {
                patternScalar = 1;
            }
            scaleFactor = 1 + MAX_GRAYING * (patternScalar - 1);
            imageData.data[i] = newColor[0] * scaleFactor;
            imageData.data[i + 1] = newColor[1] * scaleFactor;
            imageData.data[i + 2] = newColor[2] * scaleFactor;
        }
    }
    imageCanvas.getContext('2d').putImageData(imageData,0,0);
}

function redPatternIntensity(x, y) {
    var vertSpace = LINE_SPACING * (3 ** 0.5) / 2;
    var rangeY = mod((y + vertSpace / 2), vertSpace) - vertSpace / 2;
    return distToInts(Math.abs(rangeY - LINE_STRAY_CURVE * Math.sin(x * Math.PI * 2 / LINE_SPACING)));
}

function bluePatternIntensity(x, y) {
    var rotatedY = x * Math.sin(LINE_ANGLE) + y * Math.cos(LINE_ANGLE);
    var rangeY = mod((rotatedY + LINE_SPACING / 2), LINE_SPACING) - LINE_SPACING / 2;
    return distToInts(Math.abs(rangeY));
}

function yellowPatternIntensity(x, y) {
    var vertSpace = LINE_SPACING * (3 ** 0.5) / 2;
    var rotatedX = x * Math.cos(-LINE_ANGLE) - y * Math.sin(-LINE_ANGLE);
    var rotatedY = x * Math.sin(-LINE_ANGLE) + y * Math.cos(-LINE_ANGLE);
    var rangeX = mod((rotatedX - LINE_SPACING / 4), LINE_SPACING);
    var rangeY = mod((rotatedY + vertSpace / 2), vertSpace) - vertSpace / 2;
    var dist = (rangeX < LINE_SPACING / 2) ? rangeY - (LINE_STRAY_BEND - 4 * LINE_STRAY_BEND * rangeX / LINE_SPACING) : rangeY - (4 * LINE_STRAY_BEND * rangeX / LINE_SPACING - 3 * LINE_STRAY_BEND);
    return distToInts(Math.abs(dist));
}

function clamp01(num) {
    if (num < 0) {
        return 0;
    } else if (num > 1) {
        return 1;
    } else {
        return num;
    }
}

function distToInts(distance) {
    return clamp01(1 - distance / LINE_THICCNESS);
}

function getColor(color, colorMode) {
    if (colorMode === "subtractive") {
        return subtractiveColorMap[JSON.stringify(color)];
    } else if (colorMode === "additive") {
        return additiveColorMap[JSON.stringify(color)];
    } else {
        return traditionalColorMap[JSON.stringify(color)];
    }
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function getColorNameByColor(color) {
    for (colorName in colorDict) {
        if (JSON.stringify(color) === JSON.stringify(colorDict[colorName])) {
            return colorName;
        }
    }
    return undefined;
}

class ColorSettings {
    constructor(colorMode = undefined, pattern = false) {
        Object.assign(this, { colorMode, pattern });
    }
}
classList.push(ColorSettings);

class ColorVennDiagram {
    static overlays = {};

    constructor(gameEngine, followColor = false) {
        Object.assign(this, { gameEngine, followColor });

        var spritesheet = ASSET_MANAGER.getAsset(VENN_FILE_NAME);
        this.sx = 0;
        this.sy = 0;
        this.sw = 429;
        this.sh = 421;

        this.sprite = document.createElement('canvas');
        this.sprite.width = spritesheet.width;
        this.sprite.height = spritesheet.height;
        var offscreenCtx = this.sprite.getContext('2d');

        offscreenCtx.save();
        offscreenCtx.drawImage(spritesheet, this.sx, this.sy, this.sw, this.sh, 0, 0, spritesheet.width, spritesheet.height);
        offscreenCtx.restore();
    }

    draw(ctx, x, y, scale) {
        this.__recursiveColorify(this.sprite,this.gameEngine.getColorSettings(), copy(grey), [...primaryColors], scale * DEFAULT_VENN_SCALE);
        ctx.drawImage(this.sprite, this.sx, this.sy, this.sw, this.sh, x, y, this.sprite.width * scale * DEFAULT_VENN_SCALE, this.sprite.height * scale * DEFAULT_VENN_SCALE);
        if (this.followColor) {
            var colorName = getColorNameByColor(this.gameEngine.getLevel().player.colors);

            var fileName = VENN_FILE_NAME.substring(0, VENN_FILE_NAME.length - 4) + "-" + colorName + ".png";
            var sprite = this.__getVennOverlay(fileName);
            sprite = (!sprite) ? this.__getVennOverlay("./sprites/venn-grey.png") : sprite;
            ctx.drawImage(sprite, this.sx, this.sy, this.sw, this.sh, x, y, this.sprite.width * scale * DEFAULT_VENN_SCALE, this.sprite.height * scale * DEFAULT_VENN_SCALE);
            // throw "stop"
        }
    }

    __getVennOverlay(filename) {
        if (!ColorVennDiagram.overlays[filename]) {
            ColorVennDiagram.overlays[filename] = ASSET_MANAGER.getAsset(filename);
        }
        return ColorVennDiagram.overlays[filename];
    }

    __recursiveColorify(canvas, colorSettings, colors, colorsRemaining, scale) {
        if (colorsRemaining.length > 0) {
            var currentColor = colorsRemaining.splice(0, 1);
            colors[currentColor] = true;
            this.__recursiveColorify(canvas, colorSettings, colors, colorsRemaining, scale);
            colors[currentColor] = false;
            this.__recursiveColorify(canvas, colorSettings, colors, colorsRemaining, scale);
            colorsRemaining.unshift(currentColor);
        } else {
            var oldColor = [];
            for (const color of primaryColors) {
                oldColor.push((colors[color]) ? 69 : 0);
            }
            var newColor = getColor(colors, colorSettings.colorMode);
            replaceImageColor(canvas, newColor, (colorSettings.pattern) ? colors : false, scale, oldColor);
        }
    }
}