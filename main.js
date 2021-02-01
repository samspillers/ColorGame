var gameEngine = new GameEngine();

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/temp.png");
ASSET_MANAGER.queueDownload("./sprites/tile.png");
ASSET_MANAGER.queueDownload("./sprites/player.png");
ASSET_MANAGER.queueDownload("./sprites/tileColorPad.png");
ASSET_MANAGER.queueDownload("./sprites/tileFinish.png");


ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	gameEngine.init(ctx);

	var tempLevel = new Level();
	tempLevel.addTile(0, 0, new Tile());
	tempLevel.addTile(0, 1, new Tile());
	tempLevel.addTile(-1, 2, new ColorPad("blue"));
	tempLevel.addTile(0, 2, new Tile());
	tempLevel.addTile(1, 2, new Tile());
	tempLevel.addTile(0, 3, new Tile());
	tempLevel.addTile(0, 4, new Finish());

	gameEngine.addEntity(tempLevel);

	gameEngine.start();
});
