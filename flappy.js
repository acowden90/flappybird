// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };


var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', stateActions);
var scale;
var score = 0;
var player;
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/Eric_cartman.png");
    game.load.image("playerImg2", "assets/flappy_batman.png");
    game.load.image("playerImg3", "assets/Ike_2.png");
    game.load.audio("score", "assets/point.ogg");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.stage.setBackgroundColor("#90CCFF");
    game.add.text (250, 200, "Welcome to my game", {font: "30px Arial", fill: "#ffffff"});

    game.add.audio("score");
    game.input.onDown.add(clickHandler);

    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(sHandler);
    var x = 100;
    var y = 200;
    var rightKey = game.input
        .keyboard
        .addKey(Phaser.Keyboard.RIGHT);

    rightKey.onDown.add(moveright);

    var leftKey = game.input
        .keyboard
        .addKey(Phaser.Keyboard.LEFT);

    leftKey.onDown.add(moveleft);

    var upKey = game.input
        .keyboard
        .addKey(Phaser.Keyboard.UP);

    upKey.onDown.add(moveup);

    var downKey = game.input
        .keyboard
        .addKey(Phaser.Keyboard.DOWN);

    downKey.onDown.add(movedown);

    player = game.add.sprite(x, y, "playerImg2");
}

function clickHandler(event) {

   scale = game.add.sprite(Math.random()*800, Math.random()*400, "playerImg3");
    scale.scale.setTo(0.10,0.10);
}

function spaceHandler () {
    game.sound.play("score");
    score = score + 1;
}

function sHandler () {
    alert(score);
}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {

}

function moveleft() {
    player.x -= 5
}
function moveright() {
    player.x += 5
}
function moveup() {
    player.y -= 5
}
function movedown() {
    player.y += 5
}