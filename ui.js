// Abstract class
class DrawableUIElement {
    #sprite;

    constructor (imagePath, sx, sy, sw, sh, width = false, height = false) {
        Object.assign(this, { imagePath, sx, sy, sw, sh, width, height });
        if (!width) {
            this.width = sw;
        }
        if (!height) {
            this.height = sh;
        }
        
        var spritesheet = ASSET_MANAGER.getAsset(imagePath);

        this.#sprite = document.createElement('canvas');
        this.#sprite.width = spritesheet.width;
        this.#sprite.height = spritesheet.height;
        var offscreenCtx = this.#sprite.getContext('2d');

        offscreenCtx.save();
        offscreenCtx.drawImage(spritesheet, this.sx, this.sy, this.sw, this.sh, 0, 0, spritesheet.width, spritesheet.height);
        offscreenCtx.restore();
    }

    draw(ctx, x, y, scale) {
        ctx.drawImage(this.#sprite, this.sx, this.sy, this.sw, this.sh, x, y, this.width * scale, this.height * scale);
    }
}

class Panel {
    constructor (startX, startY, width, height, minInterElementSpacing = 0, setBorderSpacing = false, horizontal = true, distribute = true) {
        Object.assign(this, { startX, startY, width, height, minInterElementSpacing, setBorderSpacing, horizontal, distribute });

        this.elements = [];
    }

    addElement(element, index = false) {
        if (index) {
            this.elements.splice(index, 0, element);
        } else {
            this.elements.push(element);
        }
    }

    checkCollision(x, y) {
        if (x >= this.startX && x < this.startX + this.width && y >= this.startY && y < this.startY + this.height ) {
            // Hit!
            console.log("hit");
        }
    }

    draw(ctx) {
        var elementLength = this.__totalElementLength();
        var scale = 1;
        var spacing = 0;
        var runningLengthOffset = (this.setBorderSpacing) ? this.setBorderSpacing : 0;
        if (elementLength + this.minInterElementSpacing * (this.elements.length - 1) > ((this.horizontal) ? this.width : this.height) - 2 * this.minBorderSpacing) {
            scale = (this.width - (2 * (this.setBorderSpacing) ? this.setBorderSpacing : 0)) / elementLength;
        } else if (this.distribute) {
            var overhang = ((this.horizontal) ? this.width : this.height) - elementLength - 2 * ((this.setBorderSpacing) ? this.setBorderSpacing : 0);
            spacing = overhang / (this.elements.length + ((this.setBorderSpacing) ? -1 : 1));
            if (!this.setBorderSpacing) {
                runningLengthOffset = spacing;
            }
        }
        for (var i = 0; i < this.elements.length; i++) {
            var currElem = this.elements[i];
            var allocatedLength = ((this.horizontal) ? currElem.width : currElem.height) * scale;
            var allocatedBreadth = ((!this.horizontal) ? this.width : this.height) - 2 * ((this.setBorderSpacing) ? this.setBorderSpacing : 0);
            var currBreadth = ((!this.horizontal) ? currElem.width : currElem.height) * scale;
            var actualScale = (currBreadth > allocatedBreadth) ? scale * allocatedBreadth / currBreadth : scale;
            

            var lengthOffset = runningLengthOffset + (allocatedLength - ((this.horizontal) ? currElem.width : currElem.height) * actualScale) / 2;
            var breadthOffset = (((!this.horizontal) ? this.width : this.height) - ((!this.horizontal) ? currElem.width : currElem.height) * actualScale) / 2;

            currElem.draw(ctx, this.startX + (this.horizontal) ? lengthOffset : breadthOffset, this.startY + (!this.horizontal) ? lengthOffset : breadthOffset, actualScale);

            runningLengthOffset += allocatedLength + spacing;

        }
    }

    __totalElementLength() {
        var sum = 0;
        for (const x of this.elements) {
            sum += (this.horizontal) ? x.width : x.height;
        }
        return sum;
    }
}

