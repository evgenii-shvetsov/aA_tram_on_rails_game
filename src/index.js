// import StopWatch from './scripts/stopwatch';
import DriveWay from './scripts/driveway';
import MovingObject from './scripts/moving_objects';

// import DrawingObjects from './scripts/moving_objects'

document.addEventListener("DOMContentLoaded", () => {

console.log("hey, script was loaded")

window.addEventListener("keydown", function (e) { KeyDown(e); }); //change position of moving objects on canvas


///////////STOPWATCH CODE//////////////
let clock;
let hour = 0o00;
let minute = 0o00;
let second = 0o00;
let count = 0o00;
// resetBtn.addEventListener('click', function () {
//     clock = false;
//     hour = 0;
//     minute = 0;
//     second = 0;
//     count = 0;
//     document.getElementById('hr').innerHTML = "00";
//     document.getElementById('min').innerHTML = "00";
//     document.getElementById('sec').innerHTML = "00";
//     document.getElementById('count').innerHTML = "00";
// });
function stopWatch() {
    if (clock) {
        count++;
  
        if (count == 100) {
            second++;
            count = 0;
        }
  
        if (second == 60) {
            minute++;
            second = 0;
        }
  
        if (minute == 60) {
            hour++;
            minute = 0;
            second = 0;
        }
  
        let hrString = hour;
        let minString = minute;
        let secString = second;
        let countString = count;
  
        if (hour < 10) {
            hrString = "0" + hrString;
        }
  
        if (minute < 10) {
            minString = "0" + minString;
        }
  
        if (second < 10) {
            secString = "0" + secString;
        }
  
        if (count < 10) {
            countString = "0" + countString;
        }
  
        // document.getElementById('hr').innerHTML = hrString;
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('count').innerHTML = countString;
        setTimeout(stopWatch, 10);
    }
}
///////////STOPWATCH CODE  END//////////////


//should be deleted
// let clock;
// let stopWatch = new StopWatch(clock);

// CANVAS DRAWING OK SO FAR
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
canvas.width = 626;
// canvas.height = 800;
canvas.height = 626;

//launching game screen start
//OK SO FAR

let controls = document.querySelector(".controls");
let play_game = document.getElementById("play_game");
let pause_game = document.getElementById("pause_game");
let control_keys = document.getElementById("control_keys");
let control_keys_space = document.getElementById("control_keys_space");
let stopwatch = document.getElementById('time');

let gameCounters = document.querySelector('.game-counters')
let roundCounter = document.getElementById('round-counter');
let lifeCounter = document.getElementById('life-counter');
let rageLevel = document.getElementById('rage-level');
let carsPassed = document.getElementById('cars-passed')



play_game.addEventListener("click", (e)=>{
    console.log('play is working');
    LaunchGame();
    // controls.classList.add("hide-controls")   
    play_game.classList.add("hide-controls");
    // pause_game.classList.add("move-pause-button");
    pause_game.style.display ="block";
    stopwatch.style.display = "block";
    control_keys.style.display = "block";
    control_keys_space.style.display = "block";
    gameCounters.style.display = "flex";
    //stopwatch run
    clock = true;
    stopWatch();
})

pause_game.addEventListener("click", (e)=>{
    console.log('pause is working')
    StopGame()
    // controls.classList.add("hide-controls")   
    play_game.classList.add("hide-controls")
    
    //stopwatch pause
    clock = false;//clock pause
})

//launching game screen end


//VARIABLES start

// const REFRESH_SCREEN_TIME = 1000 / 50;
const REFRESH_SCREEN_TIME = 1000 / 50;
let timerInterval = null;

let size = 0.1 //Moving object size
let speed = 5;
let obstacles = []; //store all moving obstacles

// GAME COUNTERS
let round = 1; // round number
roundCounter.innerHTML = `Round ${round}`

let life = 3; // "life" left
lifeCounter.innerHTML = `Life ${life}`

let rage = 3; //road rage, remove obstacles, "n" amount of attempts
rageLevel.innerHTML = `Rage ${rage}`

let disappeardCars = 0
carsPassed.innerHTML = `Passed cars ${disappeardCars}`


// CAR HORN FUNCTION
function Sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }
let carHorn = new Sound('../assets/car-horn2.wav')

//VARIABLES end


// Array with driveways images //works fine now
let driveWays = [new DriveWay('../assets/driveway1.jpeg', 0, speed, canvas), new DriveWay('../assets/driveway1.jpeg', canvas.width, speed, canvas)]; 

// Main charachter RACER // works fine now //car1
let racer = new MovingObject("../assets/car1.png", canvas.width / 2, canvas.height / 1.3, true, speed, size, canvas); // main racer object
    
    


// SEPARATE functions START all start with Capital letter

//works fine
function LaunchGame(){
        // if(!racer.collideWith)
        // {
            timerInterval = setInterval(UpdateGame, REFRESH_SCREEN_TIME); //Refreshing screen n time per second
        // }
        // requestAnimationFrame(LaunchGame) . check this out
        // requestAnimationFrame(UpdateGame)
    }
//works fine
function StopGame(){
        clearInterval(timerInterval); //Stop game
        timerInterval = null;
    }

// adding moving objects
function UpdateGame(){
        driveWays[0].updateDriveWay(driveWays[1]);
        driveWays[1].updateDriveWay(driveWays[0]);
    
        //Generating obstacles  //best value so far randomNumber(0, 10000) > 9750

        setTimeout(()=>{
            if(randomNumber(0, 10000) > 9950){  //car 1
                obstacles.push(new MovingObject("../assets/cabrio.png", randomNumber(155, canvas.width - 300), randomNumber(150, 350) * -1, false, speed, size, canvas));
            }
        },1000)

        setTimeout(()=>{
            if(randomNumber(0, 10000) > 9950){ //car 2
                obstacles.push(new MovingObject("../assets/bugatti.png", randomNumber(155, canvas.width - 250), randomNumber(200, 350) * -1, false, speed, size, canvas));
            }
        },2000)

        setTimeout(()=>{
            if(randomNumber(0, 10000) > 9950){ //car 3
                obstacles.push(new MovingObject("../assets/ferrari_red.png", randomNumber(155, canvas.width - 200), randomNumber(350, 350) * -1, false, speed, size, canvas));
            }
        },3000)

        setTimeout(()=>{
            if(randomNumber(0, 10000) > 9950){ //car 3
                obstacles.push(new MovingObject("../assets/acura1.png", randomNumber(155, canvas.width - 180), randomNumber(300, 350) * -1, false, speed, size, canvas));
            }
        },4000)

    
    
        racer.updateMovingObject();
    
        if(racer.collideWith){
            // alert("!!!!!!!!!OHHHHH CRASH!");
            // StopGame();
            
        }
    
        let isDestroyed = false; 
    
        for(let i = 0; i < obstacles.length; i++){
            obstacles[i].updateMovingObject();
            if(obstacles[i].collideWith){
                isDestroyed = true;
            }
        }
    
        if(isDestroyed){ //removing cars from canvas and counting them

            obstacles.shift();
            disappeardCars++
            carsPassed.innerHTML = `Passed cars ${disappeardCars}`
            
            console.log(disappeardCars)
        }
    
        let collision = false;
    
        for(let i = 0; i < obstacles.length; i++){
            collision = racer.hit(obstacles[i]);
    
            if(collision){

                if(life > 0){
                    life--;
                    alert(`BE CAREFULL! ${life} collision left`)
                    obstacles = [];
                    lifeCounter.innerHTML = `Life ${life}`
                } else{
                    alert("You're a bad driver")
                    StopGame();
                    clock = false; // stop clock when collision
                    racer.collideWith = true;
                    break;
                }
                // StopGame();
                // clock = false; // stop clock when collision
                // racer.collideWith = true;
                // break;
            }
        }
        
        draw();   
        // DrawingObjects.draw(); move draw to separate class
    }
    




//adding graphics on canvas works fine
function draw(){ 
        // clear all from canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
       
        // drawing background driveway
        for(let i = 0; i < driveWays.length; i++){
            ctx.drawImage(
                driveWays[i].image, // driveway image
                0, //staring point X on driveway image
                0, //staring point Y on driveway image
                driveWays[i].image.width, //end point X on driveway image
                driveWays[i].image.height, //end point Y on driveway image
                driveWays[i].x, // Axis X on canvas
                driveWays[i].y, // Axis Y on canvas
                canvas.width, //canvas width
                canvas.width //canvas hiight
            );
        }
        
        // drawing main racer
        drawMovingObject(racer);
        
        // drawing obstacles
        for(let i = 0; i < obstacles.length; i++){
            drawMovingObject(obstacles[i]);
        }
    }
 // works fine   
function drawMovingObject(movingObject){
        ctx.drawImage(
            movingObject.image, 
            0, 
            0, 
            movingObject.image.width, 
            movingObject.image.height, 
            movingObject.x, 
            movingObject.y, 
            movingObject.image.width * size, 
            movingObject.image.height * size 
        );
    }

    
//Rage effect for canvas  START

function shakeCanvas(){
    let canvasShake = document.getElementById('game-canvas');

        if(rage > 0){
            carHorn.play();
            canvasShake.style ="box-shadow: 0 0 50px rgb(225, 18, 18)";
            canvasShake.classList.add("shacky-canvas");
            // console.log(rage, "before action")
            obstacles = [];
            rage--;
            rageLevel.innerHTML = `Rage ${rage}`
            // console.log(rage, "after action")
        } else {
            alert('No more rage, please chill!')
        }

        setTimeout(()=>{
            canvasShake.classList.remove("shacky-canvas");
            canvasShake.style ="box-shadow: 0 0 24px rgb(21, 199, 223)";
        },1500)
}
//Rage effect for canvas END




//that's fine as well
function KeyDown(e){
        switch(e.keyCode){
            case 65: //Left
                racer.move("x", -speed);
                break;
    
            case 68: //Right
                racer.move("x", speed);
                break;
    
            case 87: //Up
                racer.move("y", -speed);
                break;
    
            case 83: //Down
                racer.move("y", speed);
                break;

            case 32: //Space
                // Remove all obstacles from screen
                // obstacles = [];
                shakeCanvas()
                break;

            case 72: // Key "H"
                //Horn sound
                carHorn.play();
                break;
            
            case 38: //Up
                // Start()//speed increase
                
                break;
    
            case 27: //Esc
                if(timerInterval == null){
                    LaunchGame();
                    clock = true;
                    stopWatch();
                } else {
                    StopGame();
                    clock = false;
                }
                break;
        }
    }


    
    // that's fine
function randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    
});