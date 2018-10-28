const endGameScreen = document.querySelector('.modal')
let gameOver = false;

console.log(endGameScreen);

// Enemies our player must avoid
class Enemy {
    constructor(x,y,speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        if (!gameOver) {
            // Check for enemy and player collision.
            const enemyTop = this.y, enemyLeft = this.x, enemyBottom = this.y + 75, enemyRight = this.x + 74;
            const playerTop = player.y + 63, playerLeft = player.x, playerBottom = player.y + 83, playerRight = player.x + 60;

            if ((((playerTop >= enemyTop) && (playerTop <= enemyBottom)) || ((playerBottom >= enemyTop) && (playerBottom <= enemyBottom))) && (((playerRight <= enemyRight) && (playerRight >= enemyLeft)) || ((playerLeft <= enemyRight) && (playerLeft >= enemyLeft)))) {
            
                console.log("Player top is " + playerTop + " and player bottom is " + playerBottom);
                console.log("Player left is " + playerLeft + " and player right is " + playerRight);
                console.log("Enemy top is " + enemyTop + " and enemy bottom is " + enemyBottom);
                console.log("Enemy left is " + enemyLeft + " and enemy right is " + enemyRight);
                newGame();
            }

            // You should multiply any movement by the dt parameter
            // which will ensure the game runs at the same speed for
            // all computers.
        
            if (this.x < 412) {
                const movement = this.speed * dt;
                this.x = this.x + movement;
            } else {
                this.x = 0;
                // if (this.y === 59) {
                //     this.y = 225;
                // } else if (this.y === 225) {
                //     this.y = 142;
                // } else {
                //     this.y = 59;
                // }
            }
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.x = 200;
        this.y = 375;
        this.sprite = 'images/char-boy.png';
    }

    update() {
        // If player reaches water, game over! 
        if (this.y < 43) {
            if (gameOver === false) {
                endGameScreen.classList.remove("invisible");
                gameOver = true;
            }
        }
    }

    render() {
        // console.log(this.sprite);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyPressed) {

        // Only allow player movements while not game over

        if (!gameOver) {
            if (keyPressed === 'up' && this.y > -40) {
                this.y = this.y - 83;
            } else if (keyPressed === 'down' && this.y < 375) {
                this.y = this.y + 83;
            } else if (keyPressed === 'left' && this.x > 0) {
                this.x = this.x - 101;
            } else if (keyPressed === 'right' && this.x < 400) {
                this.x = this.x + 101;
            }  
            console.log('Players x is ' + this.x + ' and y is ' + this.y);
        }
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
allEnemies.push(new Enemy(20, 59, 250));
allEnemies.push(new Enemy(40, 225, 150));
allEnemies.push(new Enemy(0, 225, 200));
allEnemies.push(new Enemy(309, 142, 100));

// Place the player object in a variable called player
const player = new Player();



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

// Create An Event Listener on the div with Modal / Game End Screen "Play again" question.

endGameScreen.addEventListener('click', function (){
    // If button clicked on end screen model
    // Reset the game board if player clicks to play again.
    if (event.target.nodeName === 'BUTTON') {
        // console.log(event.target.id);
        if (event.target.id === 'play-again') {
            newGame();
        }
        // close out modal after either button pushed.
        endGameScreen.classList.add("invisible");
    }
});

// The newGame function resets the game board in every regard and is called from multiple places/
function newGame() {
    player.x = 200;
    player.y = 375;
    // endGameScreen.classList.add("invisible");
    gameOver = false;
}