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

	// var player = new Player(true, "bababooey");
	gameEngine.init(ctx);

	var tempLevel = new Level(1024, 768, 50, Math.PI * 5 / 12, 1, 0.2, 2);
	tempLevel.addTile(0, 0, new Tile());
	tempLevel.addTile(0, 1, new Tile());
	tempLevel.addTile(-1, 2, new ColorPad(grey, true, "bababooey"));
	tempLevel.addTile(-2, 2, new ColorPad(red, true, "bababooey"));
	tempLevel.addTile(-3, 2, new ColorPad(blue, true, "bababooey"));
	tempLevel.addTile(-4, 2, new ColorPad(yellow, true, "bababooey"));
	tempLevel.addTile(-5, 2, new ColorPad(purple, true, "bababooey"));
	tempLevel.addTile(-6, 2, new ColorPad(green, true, "bababooey"));
	tempLevel.addTile(-7, 2, new ColorPad(orange, true, "bababooey"));
	tempLevel.addTile(-8, 2, new ColorPad(brown, true, "bababooey"));
	tempLevel.addTile(-9, 2, new ColorPad(black, true, "bababooey"));
	tempLevel.addTile(0, 2, new Tile());
	tempLevel.addTile(1, 2, new Tile());
	tempLevel.addTile(0, 3, new Tile());
	tempLevel.addTile(0, 4, new Finish(red, true, "bababooey"));

	gameEngine.addEntity(tempLevel);

	gameEngine.start();
});
