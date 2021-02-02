var primaryColors = ["red", "blue", "yellow"];

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

var traditionalColorMap = {}
traditionalColorMap[JSON.stringify(grey)] = [224, 224, 224];
traditionalColorMap[JSON.stringify(red)] = [255, 0, 0];
traditionalColorMap[JSON.stringify(blue)] = [0, 0, 255];
traditionalColorMap[JSON.stringify(yellow)] = [255, 255, 0];
traditionalColorMap[JSON.stringify(purple)] = [125, 0, 255];
traditionalColorMap[JSON.stringify(green)] = [0, 255, 0];
traditionalColorMap[JSON.stringify(orange)] = [255, 125, 0];
traditionalColorMap[JSON.stringify(brown)] = [160, 128, 96];
traditionalColorMap[JSON.stringify(black)] = [0, 0, 0];

var subtractiveColorMap = {}
traditionalColorMap[JSON.stringify(grey)] = [224, 224, 224];
traditionalColorMap[JSON.stringify(red)] = [255, 128, 255];
traditionalColorMap[JSON.stringify(blue)] = [128, 255, 255];
traditionalColorMap[JSON.stringify(yellow)] = [255, 255, 128];
traditionalColorMap[JSON.stringify(purple)] = [0, 0, 255];
traditionalColorMap[JSON.stringify(green)] = [0, 255, 0];
traditionalColorMap[JSON.stringify(orange)] = [255, 0, 0];
traditionalColorMap[JSON.stringify(brown)] = [128, 128, 128];
traditionalColorMap[JSON.stringify(black)] = [0, 0, 0];

