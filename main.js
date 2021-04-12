const classList = [Object, Array];

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

	var colorSettings = new ColorSettings("traditional", false);
	var gameEngine = new GameEngine(colorSettings, 1024, 768, 100, Math.PI * 5 / 12, 1, 0.2, 2);
	gameEngine.setColorSettings(colorSettings);
	gameEngine.init(ctx);


	// var tempLevel = new Level();
	// tempLevel.addTile(0, 0, new Tile());
	// tempLevel.addTile(0, 1, new Tile());
	// tempLevel.addTile(0, -1, new Tile());
	// tempLevel.addTile(1, 0, new Tile());
	// tempLevel.addTile(-1, 0, new Tile());
	// tempLevel.addTile(-2, 0, new ColorPad(copy(red)));
	// tempLevel.addTile(0, -2, new ColorPad(copy(blue)));
	// tempLevel.addTile(2, 0, new ColorPad(copy(yellow)));
	// tempLevel.addTile(0, 2, new Finish(copy(brown)));

	// var out = jsonifyObject(tempLevel);
	// download('tempLevel.json', JSON.stringify(out));
	// var tempLevelClone = interpretJSON(JSON.parse(JSON.stringify(out)), createClassMap(classList));


	// var tempPanel = new Panel(0, 0, 1000, 50, minInterElementSpacing = 2, false, true, true);
	// tempPanel.addElement(new DrawableUIElement("./sprites/tile.png", 0, 0, 128, 97, 64, 48));
	// tempPanel.addElement(new DrawableUIElement("./sprites/tile.png", 0, 0, 128, 97, 64, 48));
	// tempPanel.addElement(new DrawableUIElement("./sprites/tile.png", 0, 0, 128, 97, 64, 48));
	// tempPanel.addElement(new DrawableUIElement("./sprites/tile.png", 0, 0, 128, 97, 64, 48));
	// tempPanel.addElement(new DrawableUIElement("./sprites/tile.png", 0, 0, 128, 97, 64, 48));
	// tempPanel.addElement(new DrawableUIElement("./sprites/tile.png", 0, 0, 128, 97, 64, 48));
	// tempPanel.addElement(new DrawableUIElement("./sprites/tile.png", 0, 0, 128, 97, 64, 48));
	// gameEngine.addPanel(tempPanel);
	
	var loc = window.location.pathname;
	var dir = loc.substring(0, loc.lastIndexOf('/'));

	readJSONFile(dir + '/tempLevel.json', function (text) {
		var tempLevelClone = interpretJSON(JSON.parse(text), createClassMap(classList));
		gameEngine.loadLevel(tempLevelClone);
		gameEngine.start();
	});
	
});

function copy(object) {  // Shorthand to copy an object
	return Object.assign({}, object);
}