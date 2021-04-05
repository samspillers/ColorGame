const classList = [];

var ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/temp.png");
ASSET_MANAGER.queueDownload("./sprites/tile.png");
ASSET_MANAGER.queueDownload("./sprites/player.png");
ASSET_MANAGER.queueDownload("./sprites/tileColorPad.png");
ASSET_MANAGER.queueDownload("./sprites/tileFinish.png");
ASSET_MANAGER.queueDownload("./sprites/venn.png");
ASSET_MANAGER.queueDownload("./sprites/venn-grey.png");
ASSET_MANAGER.queueDownload("./sprites/venn-red.png");
ASSET_MANAGER.queueDownload("./sprites/venn-blue.png");
ASSET_MANAGER.queueDownload("./sprites/venn-yellow.png");
ASSET_MANAGER.queueDownload("./sprites/venn-purple.png");
ASSET_MANAGER.queueDownload("./sprites/venn-green.png");
ASSET_MANAGER.queueDownload("./sprites/venn-orange.png");
ASSET_MANAGER.queueDownload("./sprites/venn-brown.png");
ASSET_MANAGER.queueDownload("./sprites/venn-black.png");

ASSET_MANAGER.downloadAll(function () {
	var canvas = document.getElementById('gameWorld');
	var ctx = canvas.getContext('2d');

	var gameEngine = new GameEngine();
	gameEngine.init(ctx);

	var colorSettings = new ColorSettings("traditional", false);
	gameEngine.setColorSettings(colorSettings);

	var tempLevel = new Level(colorSettings, 1024, 768, 50, Math.PI * 5 / 12, 1, 0.2, 2);
	tempLevel.addTile(0, 0, new Tile());
	tempLevel.addTile(0, 1, new Tile());
	tempLevel.addTile(0, -1, new Tile());
	tempLevel.addTile(1, 0, new Tile());
	tempLevel.addTile(-1, 0, new Tile());
	tempLevel.addTile(-2, 0, new ColorPad(copy(red)));
	tempLevel.addTile(0, -2, new ColorPad(copy(blue)));
	tempLevel.addTile(2, 0, new ColorPad(copy(yellow)));
	tempLevel.addTile(0, 2, new Finish(copy(brown)));

	gameEngine.loadLevel(tempLevel);

	gameEngine.start();
});

function copy(object) {  // Shorthand to copy an object
	return Object.assign({}, object);
}