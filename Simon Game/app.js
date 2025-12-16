let gameSeq = [];
let userSeq = [];

let btns = ["red", "yellow", "green", "purple"];
let started = false;
let level = 0;
let highScore = 0;
let h2 = document.querySelector("h2");
let clickSound = new Audio("audio.mp3");
let startSound = new Audio("gameStart.mp3");


document.addEventListener("keypress", function() {
    if(started == false) {
        console.log("Game Started");
        started = true;    
        startSound.play();
        levelUp();
    }
});

function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(function() {
        btn.classList.remove("user-flash");
    }, 500);
}

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 500);
}

function levelUp() {
    
    userSeq = [];
    level++;
    h2.innerText = "Level " + level;
    document.getElementById("level-info").innerText = level;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);
}


function checkAns(idx) {
    //console.log("curr level: " + level);
   
    if(userSeq[idx] == gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 500); //update level and add new color to sequence
            
        }
    }


    else {
        h2.innerHTML = `Game Over! and your Score was <b> ${level} </b> <br> Press Any Key to Start`;
        highScore = Math.max(highScore, level);
        document.body.classList.add("game-over");
            setTimeout(function () {
                document.body.classList.remove("game-over");
            }, 200);
        document.querySelector(".score-value").innerText = highScore;
        reset();
    }
}
function btnPress() {
    console.log(this);
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute('id');
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);

    clickSound.currentTime = 0; // restart sound
    clickSound.play();
    

}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}

function playSound(color) {
    let audio = new Audio(`sounds/${color}.mp3`);
    audio.play();
}

function gameStartSound() {
    startSound.play();
}
