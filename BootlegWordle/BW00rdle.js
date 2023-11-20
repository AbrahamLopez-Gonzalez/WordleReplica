const wordPool = ["STAIR", "STARE", "CLASH", "FLASH", "CRASH", "FRAME", "PRIME", "POWER", "PROXY", "CANDY", "SEVEN", "GRADE", "STYLE", "SHELL",
    "SKULL", "BUILD", "SHARE", "SMOKE", "PIVOT", "TABLE", "ARRAY", "LUNCH", "ABYSS", "LEARN", "ACORN", "ACUTE", "ADOBE", "PARRY",
    "FLUTE", "FLOUR", "FLUSH", "FLARE", "EARTH", "TARDY", "YEAST", "SOUTH", "AUDIO", "BONER", "LOWER", "ARMED", "ADORE", "SPEED",
    "LEVEL", "STEAK", "STAKE"];

let challenge = wordPool[Math.floor(Math.random() * wordPool.length)];
const correctLet = [];
const somewhereLet = [];
const incorrectLet = [];
let completeGuess = [];
let verif = [];
let disectc;
let disectu;
let guess;
let control_letters = 0;
let gridControl = 0;

let keywork = document.getElementsByClassName("tile_module");

function disectList(genWord) {
    return genWord.split('');
};

function handleKeyDown(event) {
    console.log("Key Pressed: " + event.key, control_letters);

    if ((event.keyCode >= 65 && event.keyCode <= 90) || // Upper letters
        event.keyCode === 13 || // Enter
        event.keyCode === 8) { // Backspace

        switch (event.keyCode) {
            case 8:
                if (control_letters > 0) {
                    control_letters--;
                    keywork[control_letters].innerText = "";
                    keywork[control_letters].setAttribute("data-state", "empty");
                    completeGuess.pop();
                } else {
                    keywork[control_letters].innerText = "";
                    control_letters = 0;
                };
                break;

            case 13:
                if ([5, 10, 15, 20, 25, 30].includes(control_letters)) {
                    console.log("Your guess       ", completeGuess);
                    evaluateGuess();
                    gridControl += 5;
                    console.log("Grid control:", gridControl);
                    completeGuess.length = 0;
                };
                break;

            default:
                guess = event.key.toUpperCase();
                keywork[control_letters].innerText = event.key;
                keywork[control_letters].setAttribute("data-state", "tbd");
                completeGuess.push(guess);
                //console.log(completeGuess);
                control_letters++;
        };
    } else {
        event.preventDefault();
    };
};

function evaluateGuess() {
    disectc = disectList(challenge);
    console.log("Callengue        ",disectc);
    disectu = completeGuess;
    console.log(disectu);

    for (let i = 0; i < disectc.length; i++) {
        if (disectc[i] === disectu[i]) {
            verif.push("✓");
            keywork[i + gridControl].setAttribute("data-state", "cor");
            console.log("Current element:",keywork[i + gridControl]);
            if(!correctLet.includes(disectu[i])) {
                correctLet.push(disectu[i]);
            };
        }else if (disectc.includes(disectu[i])) {
            verif.push("/");
            keywork[i + gridControl].setAttribute("data-state", "som");
            console.log("Current element:",keywork[i + gridControl]);
            if(!somewhereLet.includes(disectu[i]) && !correctLet.includes(disectu[i])) {
                somewhereLet.push(disectu[i]);
            };
        } else {
            verif.push("✗")
            keywork[i + gridControl].setAttribute("data-state", "inc");
            console.log("Current element:",keywork[i + gridControl]);
            if(!incorrectLet.includes(disectu[i])) {
                incorrectLet.push(disectu[i]);
            };
        };
    };
    console.log("Verification     ",verif);
    verif.length = 0;
    console.log("Correct letters  ", correctLet);
    console.log("Somewhere letters", somewhereLet);
    console.log("Incorrect letters", incorrectLet);

    if (correctLet.length === disectc.length) {
        console.log("Congratulations, you won the game. :D");

    };
};

document.addEventListener("keydown", handleKeyDown);
