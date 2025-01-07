
// Constants defining sizes of speedy zombies
const SPEEDYZOMBIE_H = 60;
const SPEEDYZOMBIE_W = 90;

// Constants defining sizes of zombies
const ZOMBIE_H = 72;
const ZOMBIE_W = 69;

// Constants defining sizes of spider
const SPIDER_W = 300;
const SPIDER_H = 250;

// Constants defining sizes of grid
const GRID_H = 650;
const GRID_W = 1500;

// Initializing canvas and context
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");

//Event listeners to prevent the page from srolling down while playing
window.addEventListener("keydown", function (e) {
    if (e.key === " ") {
        e.preventDefault();
    } else if (e.key === "Enter") {
        if (game.gameOver) {
            restartGame();
        } 
    }
});

// Function to restart the game
function restartGame() {
    game.gameOver = false;
    game.life = 3;
    game.score = 0;
    game.spiders = [];
    game.zombies = [];
    game.speedyzombies = [];
    game.bullets = [];
    game.loop();
}

// Event listeners for keypress and mouse movement
document.addEventListener("mousemove", move);
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 32 && game.gameOver === false) {
        Foundation.playSound(game.shotSound);
        game.bullets.push(new Bullet(
            game.player.x + game.player.w - 10,
            game.player.y + game.player.h - 27,
            12,
            ctx
        ));
    }
});

// Function to handle player movement based on mouse position
function move(event) {
    game.player.x = event.offsetX - game.player.w / 2;
    game.player.y = event.offsetY - game.player.h / 2;
}

// Class Foundation containing getRandomInt, removeIndex, _timestamp, playSound functions
class Foundation
{
    // Generates a random integer between the given min and max values
    static getRandomInt(min, max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Removes an element at the given index from the array
    static removeIndex(array, index)
    {
        if (index >= array.length || array.length <= 0)
        {
            return;
        }
        array[index] = array[array.length - 1];
        array[array.length - 1] = undefined;
        array.length = array.length - 1;
    }

    // Returns a timestamp
    static _timestamp()
    {
        return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }

    // Plays a sound and resets the sound to the beginning 
    static playSound(sound)
    {
        sound.pause();
        sound.currentTime = 0;
        sound.play().then(() => {}).catch(() => {})
    }
}


class Player
{
    // Player constructor to initialize variables
    constructor(x, y, dx, dy, context) {
        this.x = x; // X-coordinate of the player
        this.y = y; // Y-coordinate of the player
        this.dx = dx; // change in X position
        this.dy = dy; // change in Y position
        this.w = 120; // Width of the player
        this.h = 70; // Height of the player
        this.ctx = context; // The canvas context for drawing
        this.img = new Image(); // Image object to represent the player
        this.img.src = './Assets/player.png'; // Path to the player's image file
    }

    // This method is used to update player logic (position, state, etc.)
    update()
    {
    }

    // Draws the player's image on the canvas at the specified position and size
    draw()
    {
        this.ctx.drawImage(
            this.img,
            this.x, this.y, // Coordinates to position the player
            this.w, this.h // Width and height of the player
        )
    }
}

class Zombie
{
    // Zombie constructor to initialize variables
    constructor(x, y, dx, dy, zombieimg, context) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.w = ZOMBIE_W;
        this.h = ZOMBIE_H;
        this.ctx = context;
        this.zombieimg = zombieimg;
    }

    // This method is used to update zombie logic (position, state, etc.)
    update()
    {
    }

    // Draws the zombie's image on the canvas at the specified position and size
    draw()
    {
        this.ctx.drawImage(
            this.zombieimg,
            this.x, this.y, // Coordinates to position the zombie
            this.w, this.h // Width and height of the zombie
        )
    }
}

class Spider
{
    // Spider constructor to initialize variables
    constructor(x, y, dx, spiderImg, context) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.w = SPIDER_W;
        this.h = SPIDER_H;
        this.ctx = context;
        this.spiderImg = spiderImg;
    }

    // This method is used to update spider logic (position, state, etc.)
    update()
    {
    }

    // Draws the spider's image on the canvas at the specified position and size
    draw()
    {
        this.ctx.drawImage(
            this.spiderImg,
            this.x, this.y, // Coordinates to position the spider
            this.w, this.h // Width and height of the spider
        );
    }
}

class SpeedyZombie
{
    // Speedy Zombie constructor to initialize variables
    constructor(x, y, dx, speedyZombieimg, context) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.w = SPEEDYZOMBIE_W;
        this.h = SPEEDYZOMBIE_H;
        this.speedyzombieimg = speedyZombieimg;
        this.ctx = context;
    }

    // This method is used to update speedy zombie logic (position, state, etc.)
    update()
    {
    }

    // Draws the speedy zombie's image on the canvas at the specified position and size
    draw()
    {
        this.ctx.drawImage(
            this.speedyzombieimg,
            this.x, this.y, // Coordinates to position the speedy Zombie
            this.w, this.h // Width and height of the speedy Zombie
        )
    }
}

class Bullet
{
    // Bullet constructor to initialize variables
    constructor(x, y, dx, context) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.w = 50;
        this.h = 50;
        this.ctx = context;
        this.bulletimg = new Image();
        this.bulletimg.src = './Assets/bullet.png'; 
    }

    // This method is used to update bullet logic (position, state, etc.)
    update()
    {
    }

    // Draws the bullet's image on the canvas at the specified position and size
    draw()
    {
        this.ctx.drawImage(
            this.bulletimg,
            this.x, this.y, // Coordinates to position the bullet
            this.w, this.h // Width and height of the bullet
        )
    }
}

class Game
{
    // Constructor for the Game class
    constructor(context) {
        this.ctx = context; // The canvas context for drawing
        
        this.player = new Player( // Creating a new player instance
            Foundation.getRandomInt(0, 350), // Initial X position of the player
            Foundation.getRandomInt(0, 570), // Initial Y position of the player
            5, 5, // Delta X and Delta Y for player movement
            this.ctx // Passing the canvas context to the player
        );
        this.zombies = []; // Array to store regular zombies
        this.speedyzombies = []; // Array to store speedy zombies
        this.zombieTimer = 1; // Timer for spawning regular zombies
        this.fps = 60; // Frames per second
        this.step = 1 / this.fps; // Time between each frame
        this.now = 0; // Current time
        this.lastTime = Foundation._timestamp(); // Time at the last frame
        this.deltaTime = 0; // Time difference between frames
        this.speedyZombieTimer = 0; // Timer for spawning speedy zombies
        this.shotSound = new Audio(); // Audio object for the shooting sound
        this.shotSound.src = './Assets/shot.mp3'; // Path to the shooting sound file
        this.zombieSound = new Audio(); // Audio object for zombie death sound
        this.zombieSound.src = './Assets/playerdead.mp3'; // Path to the zombie death sound file
        this.zombieSpawnInterval = 50; // Interval for spawning regular zombies
        this.zombieimg = new Image(); // Image object for regular zombie
        this.zombieimg.src = './Assets/zombie.png'; // Path to the regular zombie image file
        this.bulletimg = new Image(); // Image object for the bullet
        this.bulletimg.src = './Assets/bullet.png'; // Path to the bullet image file
        this.speedyzombieimg = new Image(); // Image object for speedy zombie
        this.speedyzombieimg.src = './Assets/zombie2.png'; // Path to the speedy zombie image file
        this.spiderzombieimg = new Image(); // Image object for spider zombie
        this.spiderzombieimg.src = './Assets/bone_spider.png'; // Path to the spider zombie image file
        this.speedyZombieSpawnInterval = 80; // Interval for spawning speedy zombies
        this.gameOver = false; // Flag to indicate if the game is over
        this.bullets = []; // Array to store bullets
        this.spiders = []; // Array to store spiders
        this.spiderTimer = 0; // Timer for spawning spiders
        this.spiderSpawnInterval = 1900; // Interval for spawning spiders
        this.life = 3; // Player's life count
        this.spiderLife = 20; // Life count for spiders
        this.score = 0; // Player's score
        this.highScore = 0; // Player's high score
        this.loop(); // Start the game loop

        // Retrieve logged-in user details from sessionStorage or localStorage
        this.loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser')) || JSON.parse(localStorage.getItem('loggedInUser'));

        // Initialize highScore for the loggedInUser
        if (this.loggedInUser) {
            // Retrieve userArrays from localStorage or create an empty array
            let usersArray = JSON.parse(localStorage.getItem('usersArray')) || [];

            // Find the loggedInUser  email in the usersArray 
            const user = usersArray.find(user => user.email === this.loggedInUser.email);

            if (user) {
                // Assign the highScore from userArrays to the game's highScore
                this.highScore = user.highScore || 0;
            } else {
                // If the user is not found, initialize highScore to 0
                this.highScore = 0;
            }
        }
    }

    loop()
    {
        // Get the current timestamp
        this.now = Foundation._timestamp();

        // Calculate the time difference between frames and limit the maximum delta time
        this.deltaTime = this.deltaTime + Math.min(1, (this.now - this.lastTime) / 1000);

        // Process updates in the game loop while deltaTime is greater than the step time
        while (this.deltaTime > this.step) {
        this.deltaTime = this.deltaTime - this.step; // Reduce deltaTime by the step size
        this.update(); // Update the game logic
        }

        // Draw the game with the calculated deltaTime
        this.draw(this.deltaTime);

        // Record the timestamp of the last frame for calculating the deltaTime
        this.lastTime = this.now;

        // Request the next frame using recursion to create a continuous game loop
        requestAnimationFrame(() => this.loop());
    }

    update()
    {
        // Update the player's position and state
        this.player.update();

        // Check if it's time to spawn a new zombie based on the zombie timer
        if (this.zombieTimer % this.zombieSpawnInterval === 0)
        {
            // Create a new Zombie and add it to the zombies array
            this.zombies.push(new Zombie(
                GRID_W,
                Foundation.getRandomInt(0, GRID_H - ZOMBIE_H - 2),
                Foundation.getRandomInt(3,5),
                4,
                this.zombieimg,
                this.ctx
            ));

             // Reset the zombie timer to start the countdown again
            this.zombieTimer = 0;
        }

        // Increment the zombie timer for the next iteration
        this.zombieTimer++;

        // Check if it's time to spawn a new speedy zombie based on the speedy zombie timer
        if (this.speedyZombieTimer % this.speedyZombieSpawnInterval === 0)
        {
            // Create a new SpeedyZombie and add it to the speedyzombies array
            this.speedyzombies.push(new SpeedyZombie(
                GRID_W,
                Foundation.getRandomInt(0, GRID_H - SPEEDYZOMBIE_H - 2),
                Foundation.getRandomInt(6,8),
                this.speedyzombieimg,
                this.ctx
            ));

            // Reset the speedy zombie timer to start the countdown again
            this.speedyZombieTimer = 0;
        }

        // Increment the speedy zombie timer for the next iteration
        this.speedyZombieTimer++;

        // Check if it's time to spawn a spider based on the spider timer
        if (this.spiderTimer % this.spiderSpawnInterval === 0) {
            // Reset the spider's life
            this.spiderLife = 20;

            // Create a new Spider and add it to the spiders array
            this.spiders.push(new Spider(
                GRID_W,
                Foundation.getRandomInt(0, GRID_H - SPIDER_H - 2),
                1,
                this.spiderzombieimg,
                this.ctx
            ));

            // Reset the spider timer to start the countdown again
            this.spiderTimer = 0;
        }

        // Increment the spider timer for the next iteration
        this.spiderTimer++;

        // Iterate through each bullet in the bullets array
        this.bullets.forEach((bullet, index) => {
            // Check if the bullet has gone beyond the grid's width
            if (bullet.x > GRID_W)
            {
                // Remove the bullet from the bullets array if it's out of the grid
                Foundation.removeIndex(this.bullets, index);
            }
            bullet.x += bullet.dx;
            bullet.update();  // Update the bullet's properties and behavior
        });

        // Iterate through each zombie in the zombies array
        this.zombies.forEach((zombie, index) => {
            if (zombie.x < 0 - zombie.w)
            {
                Foundation.removeIndex(this.zombies, index);
            }

             // Calculate the center coordinates of the zombie
            const zombieCenterX = zombie.x + zombie.w / 2;
            const zombieCenterY = zombie.y + zombie.h / 2;

            // Check if the zombie has collided with the player
            if (
                zombieCenterX >= this.player.x &&
                zombieCenterX <= this.player.x + this.player.w + 15 &&
                zombieCenterY >= this.player.y &&
                zombieCenterY <= this.player.y + this.player.h
            )
            {
                // If a collision occurs, update player's life, remove zombie, and play sound
                this._lifeUpdate();
                Foundation.removeIndex(this.zombies, index);
                Foundation.playSound(this.zombieSound);
            }

            zombie.x -= zombie.dx;
            zombie.update();


             // Iterate through each bullet to check for collisions with zombies
            for (let b in this.bullets)
            {
                if (
                    zombie.x >= this.bullets[b].x &&
                    zombie.x <= this.bullets[b].x + this.bullets[b].w &&
                    zombie.y <= this.bullets[b].y &&
                    zombie.y + zombie.h >= this.bullets[b].y
                ) {
                    // If a bullet hits a zombie, remove the zombie, bullet and update score
                    Foundation.removeIndex(this.zombies, index);
                    this._scoreUpdate(10);
                    this.bullets[b].x = 1500;
                }
            }
        });

        // Iterate through each speedy zombie in the speedyzombies array
        this.speedyzombies.forEach((speedyZombie, index) => {
            if (speedyZombie.x < 0 - speedyZombie.w) {
                Foundation.removeIndex(this.speedyzombies, index);
            }

            // Calculate the center coordinates of the speedy zombie
            const speedyZombieCenterX = speedyZombie.x + speedyZombie.w / 2;
            const speedyZombieCenterY = speedyZombie.y + speedyZombie.h / 2;
            
            // Check if the speedy zombie has collided with the player
            if (
                speedyZombieCenterX >= this.player.x &&
                speedyZombieCenterX <= this.player.x + this.player.w + 15 &&
                speedyZombieCenterY >= this.player.y &&
                speedyZombieCenterY <= this.player.y + this.player.h
            ) {
                // If a collision occurs, update player's life and play sound
                this._lifeUpdate();
                Foundation.removeIndex(this.speedyzombies, index);
                Foundation.playSound(this.zombieSound);
            }

            speedyZombie.x -= speedyZombie.dx;
            speedyZombie.update();

            // Iterate through each bullet to check for collisions with speedy zombies
            for (let b in this.bullets) {
                if (
                    speedyZombie.x >= this.bullets[b].x &&
                    speedyZombie.x <= this.bullets[b].x + this.bullets[b].w &&
                    speedyZombie.y <= this.bullets[b].y &&
                    speedyZombie.y + speedyZombie.h >= this.bullets[b].y
                ) {
                    // If a bullet hits a speedy zombie, remove the speedy zombie, bullets and update score
                    Foundation.removeIndex(this.speedyzombies, index);
                    this._scoreUpdate(20); 
                    this.bullets[b].x = 1500;
                }
            }
        });


        // Check if the player's life reaches zero, indicating game over
        if (this.life === 0) {
            // Set the game state to 'game over' and play the zombie sound
            this.gameOver = true;
            Foundation.playSound(this.zombieSound);

            // Define dimensions and positioning for the game over message box
            const boxWidth = 550;
            const boxHeight = 200;
            const boxX = (GRID_W - boxWidth) / 2;
            const boxY = (GRID_H - boxHeight) / 2;
        
            // Draw a semi-transparent black box in the center
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
        
            // Styles for the text
            this.ctx.font = "bold 40px Courier New";
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            // Calculate the position to center the text within the box
            const textX = boxX + boxWidth / 2;
            const textY = boxY + boxHeight / 2;
            const lineHeight = 50; // line spacing
        
            // Display "Game Over" text in the center of the box
            this.ctx.fillText("GAME OVER!", textX, textY - lineHeight);

            // Display final score
            const finalScoreText = `Final Score: ${this.score}`;
            this.ctx.fillText(finalScoreText, textX, textY);

            // Display "Press ENTER to restart" text below the "Game Over" text
            this.ctx.fillText("Press ENTER to restart", textX, textY + lineHeight);
        
            // Throw an error to stop further execution and signal the game over condition
            throw new Error("GAME OVER!");
        }

        this.spiders.forEach((spider, index) => {
            for (let b in this.bullets)
            {
                // Calculate spider's center position
                const spiderCenterX =spider.x + spider.w / 2;

                // Check if a bullet hits the spider
                if (
                    spiderCenterX >= this.bullets[b].x &&
                    spiderCenterX <= this.bullets[b].x + this.bullets[b].w &&
                    spider.y <= this.bullets[b].y &&
                    spider.y + spider.h >= this.bullets[b].y
                )
                {
                    // Hide the bullet and reduce spider's life
                    this.bullets[b].x = 1500;
                    this.spiderLife--;
                }

                // Check if the spider's life is depleted
                if (this.spiderLife === 0)
                {
                    // Remove the spider and update the score
                    Foundation.removeIndex(this.spiders, index);
                    this._scoreUpdate(50);
                }

            }

            spider.x -= spider.dx; // Move the spider horizontally

            // Check if the spider collides with the player
            if (
                spider.x + spider.w >= this.player.x &&
                spider.x + 100 <= this.player.x + this.player.w &&
                spider.y - 15 <= this.player.y &&
                spider.y + spider.h - 70 >= this.player.y
            )
            {
                // Set player's life to zero indicating player has been caught by the spider
                this.life = 0;
            }

            // Update the spider's position
            spider.update();
        });

    }

    // Method to update and store the score 
    _scoreUpdate(score) {
        if (this.loggedInUser) {
            this.score += score; // Update the game score
    
            // Check if the updated score surpasses the existing high score
            if (this.score > this.highScore) {
                this.highScore = this.score;
    
                // Update the logged-in user's score in the stored user data
                this.loggedInUser.highScore = this.highScore;
    
                // Retrieve existing user array from localStorage or create a new empty array
                let usersArray = JSON.parse(localStorage.getItem('usersArray')) || [];
    
                // Check if the user is already in the array based on some unique identifier 
                const userIndex = usersArray.findIndex(user => user.email === this.loggedInUser.email);
    
                if (userIndex !== -1) {
                    // If the user exists in the array, update their data
                    usersArray[userIndex] = this.loggedInUser;
                } else {
                    // If the user doesn't exist in the array, add them to the array
                    usersArray.push(this.loggedInUser);
                }
    
                // Store the updated user array back into localStorage
                localStorage.setItem('usersArray', JSON.stringify(usersArray));
            }
        }
    }
    


    // Method to update the player's life by decrementing it
    _lifeUpdate() {
        this.life--;
    }

    // Method to display the game elements on the canvas
    draw()
    {
        // Clear the canvas for redrawing
        this.ctx.clearRect(0,0,GRID_W,GRID_H);

        // Draw the player
        this.player.draw();

        // Draw bullets on the canvas
        for (let b in this.bullets)
        {
            if (this.bullets.hasOwnProperty(b))
            {
                this.bullets[b].draw();
            }
        }

         // Draw zombies on the canvas
        for (let z in this.zombies)
        {
            if (this.zombies.hasOwnProperty(z))
            {
                this.zombies[z].draw();
            }
        }

        // Draw speedy zombies on the canvas
        for (let s in this.speedyzombies) {
            if (this.speedyzombies.hasOwnProperty(s)) {
                this.speedyzombies[s].draw();
            }
        }

        // Draw spiders on the canvas
        for (let i in this.spiders)
        {
            if (this.spiders.hasOwnProperty(i))
            {
                this.spiders[i].draw();
            }
        }

        // Display score and life on canvas
        this.ctx.font = "bold 20px Courier New";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`High Score: ${this.highScore}`, 20, 40);
        this.ctx.fillText(`Score: ${this.score}`, 20, 70);
        this.ctx.fillText(`🤍: ${this.life}`, 20, 100);
        
    }

}

// Creating a new instance variable and call methods
game = new Game(ctx);
game.update();
game.draw();
