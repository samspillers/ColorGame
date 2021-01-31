function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(content, null, 2)], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function load(filename) {
    var json = require(filename); //(with path)
    console.log(json)
}
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {// && rawFile.status == "200") {
            console.log("calling back");
            callback(rawFile.responseText);
        }
    }
    
    
    rawFile.send(null);
}