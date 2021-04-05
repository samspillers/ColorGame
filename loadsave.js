// local storage save/load functions
// function save(savename, objectToSave) {
//     localStorage.setItem(savename, JSON.stringify(objectToSave));
// }

// function load2(savename) {
//     objectLoaded = new Start(JSON.parse(localStorage.getItem(savename)));
//     if (!objectLoaded) {
//     // init by cloning initial object
//         console.log("cry");
//     }
//     return objectLoaded
//  }

function replacer(key, value) {
	try {
		JSON.stringify(value);
		return JSON.stringify(value, replacer);
	} catch (e) {
		return value;	
	}
}

function jsonifyObject(obj) {
	if (obj instanceof Object) {
		var out = {};
		out["_class"] = obj.constructor.name;
		for (const x in obj) {
			out[x] = jsonifyObject(obj[x]);
		}
		return out;
	} else {
		return JSON.stringify(obj);
	}
}
function interpretJSON(obj, classMap) {
	for (const x in obj) {
		if (obj[x]["_class"]) {
			obj[x] = interpretJSON(obj[x], classMap);
		}
	}
	var className = obj["_class"];
	delete(obj["_class"]);
	var out = new classMap[className]();
	Object.assign(out, obj);
	return out;
}

function createClassMap() {
    var classMap = {};
    for (const x of classList) {
        classMap[x.name] = x;
    }
    return classMap;
}

function download(filename, obj) {
	var element = document.createElement('a');
	var file = new Blob([obj], {type: 'application/json'});
	element.setAttribute('href', URL.createObjectURL(file));
	element.setAttribute('download', filename);
	element.style.display = 'none';
	element.click();
}

function readJSONFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function exportObject(obj) {
	var jsonObj = JSON.parse(JSON.stringify(obj));
	jsonObj["_class"] = obj.constructor.name;
	var jsonStr = JSON.stringify(jsonObj);
	console.log(jsonStr);
}


// Example uses:
/*
classList.push(class Test {
});
classList.push(class Test2 {
	constructor (a) {
		this.a = a;
		this.b = a;
		this.c = a;
		this.d = a;
	}
});
var x = new classList[0]();
var y = new classList[1](x);
var z = new classList[1](y);
var w = new classList[1](z);

// var out = JSON.stringify(w, replacer);
// console.log(out);
// var parsed = JSON.parse(out);
// console.log(parsed);

console.log(w);
var out = jsonifyObject(w);
// console.log(JSON.stringify(out));

var out2 = interpretJSON(out, classMap);
console.log(out2);

//usage:
readJSONFile("C:/Users/spill/Documents/GitHub/TCSS491SoloMiniGame/x.json", function(text){
    var data = JSON.parse(text);
    console.log(data);
});
// throw "stop"


class Temp {
	constructor() {
		this.a = "blah";
	}
}


// var x = new Temp();
// download('x.json', JSON.stringify(x));
// // throw "stop"


*/