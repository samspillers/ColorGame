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

	var colorSettings = new ColorSettings("traditional", true);
	gameEngine.setColorSettings(ColorSettings);

	var tempLevel = new Level(colorSettings, 1024, 768, 50, Math.PI * 5 / 12, 1, 0.2, 2);
	tempLevel.addTile(0, 0, new Tile());
	tempLevel.addTile(0, 1, new Tile());
	tempLevel.addTile(-1, 2, new ColorPad(copy(grey)));
	tempLevel.addTile(-2, 2, new ColorPad(copy(red)));
	tempLevel.addTile(-3, 2, new ColorPad(copy(blue)));
	tempLevel.addTile(-4, 2, new ColorPad(copy(yellow)));
	tempLevel.addTile(-5, 2, new ColorPad(copy(purple)));
	tempLevel.addTile(-6, 2, new ColorPad(copy(green)));
	tempLevel.addTile(-7, 2, new ColorPad(copy(orange)));
	tempLevel.addTile(-8, 2, new ColorPad(copy(brown)));
	tempLevel.addTile(-9, 2, new ColorPad(copy(black)));
	tempLevel.addTile(0, 2, new Tile());
	tempLevel.addTile(1, 2, new Tile());
	tempLevel.addTile(0, 3, new Tile());
	tempLevel.addTile(0, 4, new Finish(copy(red)));

	gameEngine.loadLevel(tempLevel);

	gameEngine.start();
});

function copy(object) {  // Shorthand to copy an object
	return Object.assign({}, object);
}