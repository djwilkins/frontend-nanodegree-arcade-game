// Defining two global variables for game state and special screen when player wins game
const endGameScreen = document.querySelector('.modal')
let gameWon = false;

// Enemies our player must avoid
class Enemy {
    constructor(x,y,speed) {
        // Defining enemies location, speed and image.
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = 'images/enemy-bug.png';
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // Enemy position is used for collision detection and to continuing moving enemies ONLY before player wins game.
        if (!gameWon) {
            // Check for enemy and player collision.
            // Define four sides (outer limits) of current enemy and player space occupency.
            const enemyTop = this.y, enemyLeft = this.x, enemyBottom = this.y + 75, enemyRight = this.x + 74;
            const playerTop = player.y + 63, playerLeft = player.x, playerBottom = player.y + 83, playerRight = player.x + 60;

            // Check to see if player currently overlapping with enemy in space.
            // It determines this specifically by checking to see that either the player character's top OR bottom is between the enemy's top and bottom.
            // AND that either the player's left or right is between the enemy's left and right. 
            // If they player character and enemy character are overlapping, restart game.
            if ((((playerTop >= enemyTop) && (playerTop <= enemyBottom)) || ((playerBottom >= enemyTop) && (playerBottom <= enemyBottom))) && (((playerRight <= enemyRight) && (playerRight >= enemyLeft)) || ((playerLeft <= enemyRight) && (playerLeft >= enemyLeft)))) {
                newGame();
            }

            // Move enemy forward in a way that is proportional to its speed level.
            // If enemy reaches right side / end of screen, start back on left of screen again.
            if (this.x < 412) {
                const movement = this.speed * dt;
                this.x = this.x + movement;
            } else {
                this.x = -74;
            }
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Player class much like enemy but takes player movement input and does not manage collision detection.

class Player {
    constructor() {
        this.x = 200;
        this.y = 375;
        this.sprite = 'images/char-boy.png';
    }

    update() {
        // If player reaches water, game is won.
        if (this.y < 43) {
            if (gameWon === false) {
                // Display game's win screen which asks if player wants to play again.
                endGameScreen.classList.remove('invisible');
                gameWon = true;
            }
        }
    }

    render() {
        // console.log(this.sprite);
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyPressed) {

        // Only allow player movements before game is won.

        if (!gameWon) {
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
allEnemies.push(new Enemy(20, 59, 350));
allEnemies.push(new Enemy(0, 59, 200));
allEnemies.push(new Enemy(309, 142, 150));
allEnemies.push(new Enemy(150, 142, 150));
allEnemies.push(new Enemy(40, 225, 200));
allEnemies.push(new Enemy(0, 225, 250));


// Place the player object in a variable called player
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Create An Event Listener on the div with Modal / Game End Screen 'Play again' question.

endGameScreen.addEventListener('click', function (){
    // If button clicked on end screen model
    // Reset the game board if player clicks to play again.
    if (event.target.nodeName === 'BUTTON') {
        // console.log(event.target.id);
        if (event.target.id === 'play-again') {
            newGame();
        }
        // close out modal after either button pushed.
        endGameScreen.classList.add('invisible');
    }
});

// The newGame function resets the game board in every regard and is called from multiple places.
function newGame() {
    player.x = 200;
    player.y = 375;
    gameWon = false;
}