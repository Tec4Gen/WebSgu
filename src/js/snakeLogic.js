import "../css/style.css";

let left = 37;
let up = 38;
let right = 39;
let down = 40;

let lvl1 = 1;
let lvl2 = 2;
let lvl3 = 3;
let lvl4 = 4;
let lvl5 = 5;

let scoreForLvl2 = 5;
let scoreForLvl3 = 6;
let scoreForLvl4 = 7;
let scoreForLvl5 = 8;
let scoreForEnd  = 10;
let needScore;

let currentLvl = lvl1;
let firstSpeed = 80;
let secondSpeed = 65;
let thirdSpeed = 50;
let fourthSpeed = 45;
let fifthSpeed = 40;

let currentSpeed = 0;

let activeMove = 0;

let cells = 30;
let cellSize = 20;

let foodX = 20;
let foodY = 20;

let playerX = 15;
let playerY = 15;

let moveX = 0;
let moveY = 0;

let trail = [];

let tail = 0;

let totalScore = 0;
let currentScore = 0;
let scoreBlock = document.querySelector("#score");
let lvlBlock = document.querySelector("#lvl");
let nextLvlstep = document.querySelector("#nextlvlStep");

let ctx;
let canv;
let gameTimer;

window.onload = function () {
    canv = document.querySelector("#canv");
    ctx = canv.getContext("2d");

    start();
}

function start() {
     currentLvl = 1;

     playerX = 15;
     playerY = 15;

     foodX = Math.floor(Math.random() * cells);
     foodY = Math.floor(Math.random() * cells);

     moveX = 0;
     moveY = 0;

    scoreBlock.innerText = 0;
    currentSpeed = firstSpeed;
    lvlBlock.innerText = currentLvl;

    let background = new Image();
    background.src = "../images/content/start.png";
    background.onload = function () {
        ctx.drawImage(background, 0, 0);
        ctx.fillStyle = "black";
        ctx.font = "50px monospace";
        ctx.textAlign = "center";
        ctx.fillText("Start", 300, 500);
    }

    canv.onclick = function () {
        tail = 3;
        activeMove = 0;
        currentScore = 0;
        totalScore = 0;
        needScore = scoreForLvl2;
        nextLvlstep.innerText = needScore;
        document.addEventListener("keydown", move);
        gameTimer = setInterval(game, currentSpeed);
        canv.onclick = null;
    }
}

function game() {

    if (currentScore == scoreForLvl2 && currentLvl == lvl1) {
        currentSpeed = secondSpeed;
        currentLvl++;
        needScore = scoreForLvl3;
        nextLvlstep.innerText = needScore
        currentScore = 0;
        nextLvl();
    }
    else if (currentScore == scoreForLvl3 && currentLvl == lvl2) {
        currentSpeed = thirdSpeed;
        currentLvl++;
        needScore = scoreForLvl4;
        nextLvlstep.innerText = needScore;
        currentScore = 0;
        nextLvl();
    }
    else if (currentScore == scoreForLvl4 && currentLvl == lvl3) {
        currentSpeed = fourthSpeed;
        currentLvl++;
        needScore = scoreForLvl5;
        nextLvlstep.innerText = needScore;
        currentScore = 0;
        nextLvl();
    }
    else if (currentScore == scoreForLvl5 && currentLvl == lvl4) {
        currentSpeed = fifthSpeed;
        currentLvl++;
        needScore = scoreForEnd;
        nextLvlstep.innerText = needScore;
        currentScore = 0;
        nextLvl();
    }
    else if (currentScore == scoreForEnd && currentLvl == lvl5) {
        victoryGame();
    }

    playerX += moveX;
    playerY += moveY;

    if (playerX < 0 || playerY < 0 || playerY >= cells || playerX >= cells) {
        endGame();
    }

    ctx.fillStyle = "#422857";
    ctx.fillRect(0, 0, canv.width, canv.height);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(foodX * cellSize, foodY * cellSize, cellSize, cellSize);

    ctx.fillStyle = "#fe3c70";

    for (let i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * cellSize, trail[i].y * cellSize, cellSize, cellSize);
        if (playerX == trail[i].x && playerY == trail[i].y && currentScore > 0) {
            tail = 3;
            endGame();
        }
    }

    trail.push({ x: playerX, y: playerY });

    if (playerX == foodX && playerY == foodY) {
        tail++;
        scoreBlock.innerText = +scoreBlock.innerText + 1;
        totalScore += +scoreBlock.innerText;
        currentScore += 1;
        nextLvlstep.innerText = +needScore - currentScore;

        foodX = Math.floor(Math.random() * cells);
        foodY = Math.floor(Math.random() * cells);
    }

    while (trail.length > tail) {
        trail.shift();
    }

}

function endGame() {
    clearInterval(gameTimer);
    setTimeout(function () {
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, canv.width, canv.height);
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.font = "50px monospace";
        ctx.fillText("You are defeat", 300, 300);
        ctx.fillText('Your total score:', 300, 350);
        ctx.fillText(scoreBlock.innerHTML, 300, 400);
        trail = [];
    }, 10)

    canv.onclick = start;
}

function victoryGame() {
    clearInterval(gameTimer);
    setTimeout(function () { 
        ctx.fillStyle = "green";
        ctx.fillRect(0, 0, canv.width, canv.height);
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "center";
        ctx.font = "50px monospace";
        ctx.fillText("You are victory!", 300, 300);
        ctx.fillText('Your total score:', 300, 350);
        ctx.fillText(scoreBlock.innerHTML, 300, 400);
        trail = [];
    }, 10)

    canv.onclick = start;
}

function nextLvl() {
    clearInterval(gameTimer);
    setTimeout(function () {
        lvlBlock.innerText = +lvlBlock.innerText + 1;
        gameTimer = setInterval(game, currentSpeed);
    }, 10)
}

function move(e) {
    switch (e.keyCode) {
        case left:
            if (activeMove != right) {
                moveX = -1;
                moveY = 0;
                activeMove = left;
            }
            break;
        case up:
            if (activeMove != down) {
                moveX = 0;
                moveY = -1;
                activeMove = up;
            }
            break;
        case right:
            if (activeMove != left) {
                moveX = 1;
                moveY = 0;
                activeMove = right;
            }
            break;
        case down:
            if (activeMove != up) {
                moveX = 0;
                moveY = 1;
                activeMove = down;
            }
            break;
    }
}

