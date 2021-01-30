var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();


ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);

	gameEngine.start();


	var start = new Start(gameEngine);

	// download(start, 'tile.json', 'text/plain');
	readTextFile("./tile.json", console.log)


});
