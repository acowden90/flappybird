// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };


var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', stateActions);
var scale;
var score = 0;
var pipes;

var pipe_offset = 900;
var pipe_size = 50;
/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/Eric_cartman.png");
    game.load.image("playerImg2", "assets/flappy_batman.png");
    game.load.image("playerImg3", "assets/Ike_2.png");
    game.load.audio("score", "assets/point.ogg");
    game.load.image("block", "assets/pipe.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    game.stage.setBackgroundColor("#90CCFF");
    player = game.add.sprite(100, 200, "playerImg2");
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.anchor.setTo(0.5, 0.5);
    player.scale.setTo(0.6, 0.6);
    player.checkWorldBounds = true;
    /*player.body.velocity.x = 100;*/
    player.body.gravity.y = 200
    game.add.audio("score");

    var spacebar = game.input
        .keyboard
        .addKey(Phaser.Keyboard.SPACEBAR);
    spacebar.onDown.add(player_jump);

    pipes = game.add.group();

    game.time.events.loop(1.5*Phaser.Timer.SECOND, generate_pipes);
}


function add_pipe_part (x, y, pipe_part) {
    var pipe = pipes.create(x, y, pipe_part);
    game.physics.arcade.enable(pipes);
    pipe.body.velocity.x = -200;
}

function generate_pipes() {
    var hole = Math.floor(Math.random()*4)+1;
    var i;
    for (i = 0; i < hole; i++) {
            add_pipe_part (pipe_offset, i * pipe_size, "block");
    }
    for (i = hole + 2; i <= 8; i++) {
        add_pipe_part (pipe_offset, i * pipe_size, "block");
    }
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
game.physics.arcade.overlap(player, pipes, game_over);
}

function game_over() {
    game.add.text(400, 200, "Game Over");
    location.reload();
}
function moveleft() {
    player.x -= 15
}
function moveright() {
    player.x += 15
}
function moveup() {
    player.y -= 15
}
function movedown() {
    player.y += 15
}

function player_jump () {
    player.body.velocity.y = -150;
}