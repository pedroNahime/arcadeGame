// Enemies our player must avoid
var Enemy = function(x,y) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //coordenadas x e y
    this.x = x;
    this.y = y;

    //velocidade dos inimigos
    this.speed = Math.floor((Math.random()*200)+100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x <= 505) {  //canvas.width = 505
        this.x = this.x + this.speed * dt;
    } else {
        this.x = -2;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
};

Player.prototype.update = function(dt) {
    var self = this;
    //se a tecla "seta esquerda" for pressionada:
    if(this.pressedKey === 'left' && this.x > 0) { //player isn't on left edge
        this.x = this.x - 100;
    }
    //se a tecla "seta direita" for pressionada:
    if(this.pressedKey === 'right' && this.x < 400) { //player isn't on right edge
        this.x = this.x + 100;
    }
    //se a tecla "seta cima" for pressionada:
    if(this.pressedKey === 'up' && this.y > 0) {
        this.y = this.y - 90;
    }
    //se a tecla "seta baixo" for pressionada:
    if(this.pressedKey === 'down' && this.y < 400) {
        this.y = this.y + 90;
    }
    //fara com que o jogador ande apenas uma vez quando a tecla foi pressionada
    this.pressedKey = null;

    //quando o jogador chegar ate a agua o jogo reseta e atualiza o placar:
    if(this.y < 0) {
        document.getElementById('placar').innerHTML = parseInt(document.getElementById('placar').innerHTML) + 1;
        this.reset();
    }

};

//inicia placar
document.getElementById('placar').innerHTML = 0

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//handleInput() method:
Player.prototype.handleInput = function(e) {
    this.pressedKey = e;
};

//Reseta o player para a posição inicial
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;

};

var allEnemies = []; //array vazio de inimigos

//faz os inimigos aparecerem:
(function displayEnemies() {
    allEnemies.push(new Enemy(0, 50));
    allEnemies.push(new Enemy(0, 140));
    allEnemies.push(new Enemy(0, 230));
}());


var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
