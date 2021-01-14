var snakeBoard = document.getElementById("myCanvas");
    if (snakeBoard != null) {
        const snakeboard_ctx = snakeBoard.getContext("2d");
        //------------------------------------------------------BackGround------------------------------------------------------//
        const canvasBackgroundColor = "gray";
        const canvasBorderColor = 'black';
        snakeboard_ctx.fillStyle = canvasBackgroundColor;
        snakeboard_ctx.fill();
        snakeboard_ctx.strokestyle = canvasBorderColor;
        snakeboard_ctx.fillRect(0, 0, myCanvas.width, myCanvas.height);
        // Draw a "border" around the entire canvas
        snakeboard_ctx.strokeRect(0, 0, myCanvas.width, myCanvas.height);
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

        const foodColor = "pink";
        const foodBorderColor = "black";
        
        const randomPosition = (min,max) =>{
            return Math.round((Math.random() * (max - min) + min)/ 10) * 10;
        };

        foodX = randomPosition(0,myCanvas.width-30);
        foodY = randomPosition(0, myCanvas.height-30);

        const generateFoodPosition = () => {
            foodX = randomPosition(0, myCanvas.width-30);
            foodY = randomPosition(0, myCanvas.height-30);
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

        const virusColor = "purple";
        
        poisonX = randomPosition( 0,myCanvas.width-30);
        poisonY = randomPosition( 0,myCanvas.height-30);  

        const generateVirusPosition = () => {
            poisonX = randomPosition( 0,myCanvas.width-30);
            poisonY = randomPosition( 0,myCanvas.height-30);  
        }


        const drawVirus = () => {
            snakeboard_ctx.beginPath();
            snakeboard_ctx.fillStyle = virusColor;
            snakeboard_ctx.fillRect(poisonX, poisonY, 10, 10);
            snakeboard_ctx.strokeRect(poisonX, poisonY, 10, 10);
            snakeboard_ctx.closePath();
        };

        //------------------------------------------------------Potion-----------------------------------------------------------//
        const potionColor = "red";
        potionX = randomPosition( 0,myCanvas.width-30);
        potionY = randomPosition( 0,myCanvas.height-30);

        const drawPotion = () => {
            snakeboard_ctx.beginPath();
            snakeboard_ctx.fillStyle = potionColor;
            snakeboard_ctx.fillRect(potionX, potionY, 10, 10);
            snakeboard_ctx.strokeRect(potionX, potionY, 10, 10);
            snakeboard_ctx.closePath();
        }

        const generatePotionPosition = () => {
            potionX = randomPosition(0, myCanvas.width-30);
            potionY = randomPosition(0, myCanvas.height-30);
            snake.forEach(function isPotionOnSnake(part) {
            const potionIsOnSnake = part.x == potionX && part.y == potionY
                if (potionIsOnSnake) {
                    generatePotionPosition();
                    speedIncrease();
                }
            });
        }