let gameseq = [];
let userseq = [];

let btns = ["red", "yellow", "green", "purple"];

let started = false;
let level = 0;

let h2 = document.querySelector('h2');

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game started");
        started = true;
        levelup();
    }
});

function gameflash(btn) {
    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(() => {
        btn.classList.remove("userflash");
    }, 350);
}

function levelup() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    // FIX 1: was *3, should be *4 so purple can be chosen
    let randindx = Math.floor(Math.random() * 4);
    let randcolor = btns[randindx];
    gameseq.push(randcolor);
    console.log(gameseq);

    // FIX 2: flash the entire sequence with delays, not just the last button
    gameseq.forEach((color, i) => {
        setTimeout(() => {
            let btn = document.querySelector(`.${color}`);
            gameflash(btn);
        }, (i + 1) * 600);
    });
}

function checkans(idx) {
    if (userseq[idx] == gameseq[idx]) {
        if (userseq.length == gameseq.length) {
            setTimeout(levelup, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to start`;

        // FIX 3: flash body background red briefly, then restore (don't change text color)
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "";
        }, 150);

        reset();
    }
}

function btnpress() {
    let btn = this;
    userflash(btn);

    let usercolor = btn.getAttribute("id");
    console.log(usercolor);
    userseq.push(usercolor);
    checkans(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
