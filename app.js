var snakeBoard = document.getElementById("myCanvas");
    if (snakeBoard != null) {
        const snakeboard_ctx = snakeBoard.getContext("2d");
        //------------------------------------------------------BackGround------------------------------------------------------//
        let cw = myCanvas.width;
        let ch = myCanvas.height;
        let scw =myCanvas.width -10;
        let sch = myCanvas.height - 10;
        const canvasBackgroundColor = "gray";
        const canvasBorderColor = 'black';
        snakeboard_ctx.fillStyle = canvasBackgroundColor;
        snakeboard_ctx.fill();
        snakeboard_ctx.strokestyle = canvasBorderColor;
        snakeboard_ctx.fillRect(0, 0, cw, ch);
        // Draw a "border" around the entire canvas
        snakeboard_ctx.strokeRect(0, 0, cw, ch);

         //-----------------------------------------------------Score + lives-----------------------------------------------------------//        

        let score = 0;

        const fontStyle = "20px VT323";
        const fontColor = "white"

        const drawScore = () => {
            snakeboard_ctx.font = fontStyle;
            snakeboard_ctx.fillStyle = fontColor;
            snakeboard_ctx.fillText("Score:" + score,8,20);
        }

        let lives = 3

        const drawLives = () => {
            snakeboard_ctx.font = fontStyle;
            snakeboard_ctx.fillStyle = fontColor;
            snakeboard_ctx.fillText("Lives:" + lives, cw-65, 20);
        }
        //-----------------------------------------------------Main-------------------------------------------------------------------// 
      
        const modal = document.getElementById("myModal");
        const btn = document.getElementById("aboutButton");
        const span = document.getElementsByClassName('close')[0];
        const restart = document.getElementById("RestartButton");
        const startbtn = document.getElementById("startButton");

        
        btn.onclick = function () {
            modal.style.display = "block";
        }
        span.onclick = function () {
            modal.style.display = "none";
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
        
     //-----------------------------------------------------Music-------------------------------------------------------------------// 
        
        const backgroundMusic = () => {
            $('#background').prop('volume','0.1');
            $('#background').trigger('play');
        };

        const poisonAttackMusic = () => {
            $('#poison').prop('volume','0.2');
            $('#poison').trigger('play');
        };

        const hitTheWallSound = () => {
            $('#HitTheWall').prop('volume','0.2');
            $('#HitTheWall').trigger('play');
        }

        const gameOverSound = () => {
            $('#gameOver').prop('volume','0.2');
            $('#gameOver').trigger('play');
        }

    //-----------------------------------------------------Speed------------------------------------------------------------------//        
        let snakeSpeed = 200;
        let potionSpeed = 5000;
        let poisonSpeed = 2000;
        const speedIncrease = () =>{
            return snakeSpeed -= 20;
        }

        const speedDecrease = () =>{
            return snakeSpeed += 15;
        }
    
    //-----------------------------------------------------SNAKE-----------------------------------------------------------//        
        
        //snake Color
        const red = Math.floor(Math.random() * 255);
        const green = Math.floor(Math.random() * 255);
        const blue = Math.floor(Math.random() * 255);
        const color = 'rgb('+red+','+green+','+blue+')'; 

         //Snake Color
         const snakeColor = color;
         const snakeBorderColor = 'black';
        
        let snake = [
            {x:140, y:140},
            {x:130, y:140},
            {x:120, y:140},
            {x:110, y:140},
            {x:100, y:140}
        ];
        //movement
        let dx = 0;
        let dy = -10;

        const moveSnake = () => {
            const snakeHead = {x: snake[0].x + dx, y: snake[0].y+ dy};
            snake.unshift(snakeHead);
            const didEatFood = snake[0].x === foodX && snake[0].y === foodY;  
            const didEatPotion = snake[0].x === potionX && snake[0].y === potionY;  
            if (didEatFood) {
                score += 10;
                generateFoodPosition();
                speedIncrease();} else { if (didEatPotion) {
                    generatePotionPosition();
                    speedDecrease();} else {
                    snake.pop();} //remove the tail to make it seems like "moving"
            }  

        };
                  
        const drawSnakePart = (snakePart) => {
            snakeboard_ctx.fillStyle = snakeColor;
            snakeboard_ctx.strokestyle = snakeBorderColor;  
            snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
            snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
        };
          
        const drawSnake = () => {
            snake.forEach(drawSnakePart);

        };

        const hitSnakeTail = () => {
            for(let i = 4; i < snake.length; i++) {
                if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
                    return true;
                }
            }
        }

         //------------------------------------------------------FOOD-----------------------------------------------------------//

        const foodColor = "green";
        const foodBorderColor = "black";
        
        const randomPosition = (min,max) =>{
            return Math.floor((Math.random() * (max - min) + min)/ 10) * 10;
        };

        foodX = randomPosition(0,scw);
        foodY = randomPosition(0,sch);

        const generateFoodPosition = () => {
            foodX = randomPosition(0, scw);
            foodY = randomPosition(0, sch);
            snake.forEach(function isFoodOnSnake(part) {
            const foodIsOnSnake = part.x == foodX && part.y == foodY
                if (foodIsOnSnake) {
                    generateFoodPosition();
                }
            });
        }

        const drawFood = () => {
            snakeboard_ctx.fillStyle = foodColor;
            snakeboard_ctx.strokeStyle = foodBorderColor;
            snakeboard_ctx.fillRect(foodX, foodY, 10, 10);
            snakeboard_ctx.strokeRect(foodX, foodY, 10, 10);
        };

        //------------------------------------------------------Virus-----------------------------------------------------------//

        const poisonColor = "purple";
        
        poisonX = randomPosition( 0,scw);
        poisonY = randomPosition( 0,sch);  

        const generatePoisonPosition = () => {
            poisonX = randomPosition( 0,scw);
            poisonY = randomPosition( 0,sch);  
        }


        const drawPoison = () => {
            snakeboard_ctx.beginPath();
            snakeboard_ctx.fillStyle = poisonColor;
            snakeboard_ctx.fillRect(poisonX, poisonY, 10, 10);
            snakeboard_ctx.strokeRect(poisonX, poisonY, 10, 10);
            snakeboard_ctx.closePath();
        };

        //------------------------------------------------------Potion-----------------------------------------------------------//
        const potionColor = "red";
        potionX = randomPosition( 0,scw);
        potionY = randomPosition( 0,sch);

        const drawPotion = () => {
            snakeboard_ctx.beginPath();
            snakeboard_ctx.fillStyle = potionColor;
            snakeboard_ctx.fillRect(potionX, potionY, 10, 10);
            snakeboard_ctx.strokeRect(potionX, potionY, 10, 10);
            snakeboard_ctx.closePath();
        }

        const generatePotionPosition = () => {
            potionX = randomPosition(0, scw);
            potionY = randomPosition(0, sch);
            snake.forEach(function isPotionOnSnake(part) {
            const potionIsOnSnake = part.x == potionX && part.y == potionY
                if (potionIsOnSnake) {
                    generatePotionPosition();
                    speedIncrease();
                }
            });
        }
        //-----------------------------------------------------Button-----------------------------------------------------------//        

        const moveLeft = () => {
            dx = -10; dy = 0
         }
 
         const moveRight = () => {
             dx = 10; dy = 0
         }
 
         const moveUp = () => {
             dx = 0; dy = -10
         }
 
         const moveDown = () => {
             dx = 0; dy = 10
         }
         const changeDirection = (event) => {
             const left = 37;  const right = 39;  const up = 38;  const down = 40;
             const keyPressed = event.keyCode;  const goingUp = dy === -10;  const goingDown = dy === 10;  const goingRight = dx === 10;  const goingLeft = dx === -10;
             if (keyPressed  === left && !goingRight) { moveLeft();}
             if (keyPressed === right && !goingLeft) { moveRight();}
             if (keyPressed === down && !goingUp) { moveDown();}
             if (keyPressed === up && !goingDown) { moveUp();}
        
         }

         $('#leftButton').on('click', function (){
            const goingRight = dx === 10;
            if (!goingRight) {
                moveLeft();
            }
        });

        $('#rightButton').on('click', function (){
            const goingLeft = dx === -10;
            if (!goingLeft) {
                moveRight();
            }
        });

        $('#upButton').on('click', function (){
            const goingDown = dy === 10;
            if(!goingDown) {
                moveUp();
            }
        });

        $('#downButton').on('click', function (){
            const goingUp = dy === -10;
            if(!goingUp) {
                moveDown();
            }
        });
        //-----------------------------------------------------Wall Collision-----------------------------------------------------------//        


        const hitWall = () => {
            const hitLeftWall = snake[0].x < 0;
            const hitRightWall = snake[0].x > scw;
            const hitToptWall = snake[0].y < 0;
            const hitBottomWall = snake[0].y > sch;
            return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
        }

        //-----------------------------------------------------Virus Collision-----------------------------------------------------------//        

        const poisonCollision = () => {
            const didTouchPoison = snake[0].x === poisonX && snake[0].y === poisonY;  
            return didTouchPoison;
        }

        //------------------------------------------------------MAIN GAME-----------------------------------------------------------// 

        const draw = () => { 
            clearCanvas();
            drawFood();
            moveSnake(); 
            drawSnake();
            drawPoison();
            drawPotion();
            drawScore();
            drawLives();
            collisionDetection();
        }


        //Clear page
        const clearCanvas = () => {
            snakeboard_ctx.fillStyle = 'gray'; 
            snakeboard_ctx.strokeStyle = 'black';
            snakeboard_ctx.fillRect(0,0, cw, ch); snakeboard_ctx.strokeRect(0,0, cw, ch);
        }

        const collisionDetection = () => {
                if (poisonCollision()|| hitSnakeTail()) {
                    lives --
                    poisonAttackMusic();
                    return true;
                }
        }
        const gameStart = () => {
            if (GameOver()) return;
            document.getElementById("mobile-arrow-control").style.visibility = "visible";
            document.getElementById("randomQuote-container").style.display = "none";
            setTimeout(function onTick() {draw(); gameStart(); }, snakeSpeed);
            document.addEventListener("keydown", changeDirection);
            document.addEventListener("touchstart", changeDirection);
            document.addEventListener("touchend", changeDirection);
        }

        const GameOver = () => {
                if(hitWall()) {
                    hitTheWallSound();
                    return true,
                    gameOverSound(),
                    clearCanvas(),
                    $('#score').text(score),  
                    $('.FinishScreen').show();
                } else {
                    if (lives === 0) {
                    gameOverSound(),
                    clearCanvas(),
                    $('#score').text(score),  
                    $('.FinishScreen').show();
                    }
                }
                
        }

        restart.onclick = function () {
            $(".FinishScreen").hide();
			$("#myCanvas").show();
            clearCanvas();
            document.location.reload();
        }


        startbtn.onclick = function (){
            gameStart();
            backgroundMusic();
            setInterval(() => {
                generatePotionPosition();
            }, potionSpeed);
            setInterval(() => {
                generatePoisonPosition();
            }, poisonSpeed);
        }

        //------------------------------------------------------API-----------------------------------------------------------// 


        document.addEventListener("DOMContentLoaded", () => {
            const quote = document.querySelector("blockquote p");
            const cite = document.querySelector("blockquote cite");
          
            async function updateQuote() {
              const response = await fetch("https://api.quotable.io/random");
              const data = await response.json();
              if (response.ok) {
                quote.textContent = data.content;
                cite.textContent = data.author;
              } 
            }
            updateQuote();
          });
          
    }
