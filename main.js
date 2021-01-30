var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();


function tempCreateObject(jsonString) {
	var tile = JSON.parse(jsonString);
	console.log(tile);
	console.log(tile instanceof Tile);
	console.log(tile instanceof Start);
}

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);

	gameEngine.start();


	var start = new Start(gameEngine);

	// download(start, 'tile.json', 'text/plain');
	readTextFile("./tile.json", tempCreateObject)


});
