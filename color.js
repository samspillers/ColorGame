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
traditionalColorMap[JSON.stringify(grey)] = [0, 0, 0];
traditionalColorMap[JSON.stringify(red)] = [1, 0, 0];


console.log("grey");
console.log(grey);
console.log("traditionalColorMap");
console.log(traditionalColorMap);
console.log("grey color");
console.log(traditionalColorMap.grey);

var newGray = {
    'red': false,
    'blue': false,
    'yellow': false,
    'black': false
};

console.log("newGray");
console.log(newGray);
console.log("grey == newGray");
console.log(grey == newGray);
console.log("newGray color");
console.log(traditionalColorMap[JSON.stringify(newGray)]);