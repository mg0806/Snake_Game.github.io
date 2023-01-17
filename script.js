let InputDir = {x:0,y:0};
 const foodsound = new Audio('music/food.mp3');
 const gameoversound = new Audio('music/gameover.mp3');
 const movesound = new Audio('music/move.mp3');
 const musicsound = new Audio('music/music.mp3');
 let speed = 12;
 let score = 0;
 let lastpainttime =0;
 let snakeArray = [{x:13 , y:15}];
 //document.write("hello");
 //console.log("hello");
 //alert('press any key to start.')

 food = {x: 6 , y:7};
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime -lastpainttime)/1000< 1/speed)
    {
        return;
    }
   
    
    lastpainttime = ctime;
    gameEngine();
}

function isCollide(snake) {
    //collide to itself .
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y ) {
            return true;
        }
    }
    // collide to wall;
        if (snake[0].x >=18 || snake[0].x<=0 || snake[0].y >=18 || snake[0].y<=0) {
            return true;
        }
        
    }
    

function gameEngine(){
    //part 1 updating food and snake.
    
    if (isCollide(snakeArray)) {
        gameoversound.play();
        musicsound.pause();
        InputDir = {x:0,y:0};
        alert("Game Over. press any key to play again");
        snakeArray = [{x:13 , y:15}];
        //musicsound.play();
        score = 0;
        scoreBox.innerHTML = "score: " + score;
    } 
    // after eating food, increment score and regenerate new food.
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodsound.play();
        score += 1;
        if (score > highscoreval) {
            highscoreval = score;
            localStorage.setItem("highscore",JSON.stringify(highscoreval));
            highscoreBox.innerHTML = "Highscore: "+highscoreval;
        }
        scoreBox.innerHTML = "score: " + score;
        snakeArray.unshift({x: snakeArray[0].x + InputDir.x,y: snakeArray[0].y + InputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()) , y:Math.round(a+(b-a)*Math.random()) }
    }

    //moving the snake.

    for (let i = snakeArray.length-2;  i>= 0; i--) {
        
        snakeArray[i+1] = {...snakeArray[i]};
        
    }
    snakeArray[0].x += InputDir.x;
    snakeArray[0].y += InputDir.y;

    // part 2display food and snake.
    //displaying snake
     board.innerHTML = "";
    snakeArray.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        
        }
        
        board.appendChild(snakeElement);
     })

    // displaying food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
let highscore = localStorage.getItem("highscore");
if (highscore === null) {
    highscoreval = 0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval))
}
else{
    highscoreval = JSON.parse(highscore);
    highscoreBox.innerHTML = "Highscore: " + highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    //musicsound.play(); 
    InputDir = {x: 0,y: 1}// game starting.
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp"); 
            InputDir.x =0 ; 
            InputDir.y = -1;
            break;
         case "ArrowDown":
            console.log("ArrowDown");
             InputDir.x =0 ;
             InputDir.y = 1; 
              break;
         case "ArrowLeft":
            console.log("ArrowLeft"); 
            InputDir.x =-1 ;
            InputDir.y = 0; 
              break;
        case "ArrowRight":
            console.log("ArrowRight"); 
            InputDir.x =1 ;
            InputDir.y = 0; 
              break;

    
        default:
            break;
    }
})