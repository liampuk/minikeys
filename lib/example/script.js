
const miniKeys = new MiniKeys();
let ctx;
let w, h;
let activeKeys = new Array();

function start() {
    miniKeys.init();
    miniKeys.loadSamples([
        './samples/f24.ogg',
        './samples/f31.ogg',
        './samples/f38.ogg',
        './samples/f45.ogg',
        './samples/f52.ogg',
        './samples/f59.ogg',
        './samples/f66.ogg',
        './samples/f73.ogg',
        './samples/f80.ogg',
        './samples/f87.ogg',
        './samples/f94.ogg',
        './samples/f101.ogg',
        './samples/p24.ogg',
        './samples/p31.ogg',
        './samples/p38.ogg',
        './samples/p45.ogg',
        './samples/p52.ogg',
        './samples/p59.ogg',
        './samples/p66.ogg',
        './samples/p73.ogg',
        './samples/p80.ogg',
        './samples/p87.ogg',
        './samples/p94.ogg',
        './samples/p101.ogg'
    ]).then((res) => {
        // console.log(res);
        activeKeysIndex = 23;
        drawPiano(activeKeysIndex);
        updateKeys();
        animateUI();
    })
}

function animateUI() {
    setTimeout(() => {
        document.getElementById("progress-bar").style.display = "none";
        document.getElementById("progress-bar-container").style.display = "none";
        setTimeout(() => {
            let canvas = document.getElementsByTagName("canvas")[0];
            canvas.classList.remove("initialPiano");
            let keyNum = document.getElementsByTagName("td").length;
            animateKeys(0, keyNum);
        }, 200);
    }, 200);
}

function animateKeys(cur, stop) {
    if (cur < stop) {
        document.getElementsByTagName("td")[cur].classList.remove("initialKeys");
        setTimeout(() => {
            animateKeys(cur + 1, stop);
        }, 20);
    }
}

document.addEventListener("keypress", function (event) {
    keyPress(event.key);
});

document.addEventListener("sampleloaded", function (event) {
    let progressBar = document.getElementById("progress-bar");
    progressBar.style.width = event.detail*30+"vw";
    console.log(event.detail);
});

function keyPress(key) {
    let note = -1;
    if (Object.keys(miniKeys._whiteKeys).includes(key)) {
        note = miniKeys._whiteKeys[key];
    } else if (Object.keys(miniKeys._blackKeys).includes(key)) {
        note = miniKeys._blackKeys[key];
    }
    if (note != -1) {
        miniKeys.playNote(note, 50);
        if (!activeKeys.includes(note)) {
            activeKeys.push(note);
            activeKeysIndex = miniKeys.getKeyIndex();
            drawPiano(activeKeysIndex);
        }
    }

    if (key == 'z') {
        miniKeys.shift(-1, miniKeys.OCTAVE);
        activeKeysIndex = miniKeys.getKeyIndex();
        drawPiano(activeKeysIndex);
    } else if (key == 'x') {
        miniKeys.shift(1, miniKeys.OCTAVE);
        activeKeysIndex = miniKeys.getKeyIndex();
        drawPiano(activeKeysIndex);
    } else if (key == 'c') {
        miniKeys.shift(-1, miniKeys.TONE);
        activeKeysIndex = miniKeys.getKeyIndex();
        drawPiano(activeKeysIndex);
    } else if (key == 'v') {
        miniKeys.shift(1, miniKeys.TONE);
        activeKeysIndex = miniKeys.getKeyIndex();
        drawPiano(activeKeysIndex);
    }

    let keyCells = document.getElementsByTagName("td");
    for (let elem of keyCells) {
        if (elem.innerText == key) {
            elem.classList.add("active");
        }
    }
    updateKeys();
}

function keyRelease(key) {
    let keyCells = document.getElementsByTagName("td");
    let note = -1;
    if (Object.keys(miniKeys._whiteKeys).includes(key)) {
        note = miniKeys._whiteKeys[key];
    } else if (Object.keys(miniKeys._blackKeys).includes(key)) {
        note = miniKeys._blackKeys[key];
    }
    if (note != -1) {
        let ind = activeKeys.indexOf(note);
        activeKeys.splice(ind, 1);
        activeKeysIndex = miniKeys.getKeyIndex();
        drawPiano(activeKeysIndex);
    }
    for (let elem of keyCells) {
        if (elem.innerText == key) {
            elem.classList.remove("active");
        }
    }
}

document.addEventListener("keyup", function (event) {
    keyRelease(event.key);
});


function drawPiano(activeKeysIndex) {
    let canvas = document.getElementsByTagName("canvas")[0];
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;
    ctx = canvas.getContext("2d");
    // ctx.clearRect(0, 0, w, h);
    ctx.translate(0.5, 0.5);
    ctx.lineWidth = 1;
    const whiteKeys = miniKeys.getWhiteMidiNotes();
    const blackKeys = miniKeys.getBlackMidiNotes();
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    let whiteKeyWidth = w / 52;
    whiteKeys.forEach((key, index) => {
        let x = Math.floor((w / 52) * index);
        if (index != 0) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
            ctx.stroke();
            ctx.closePath();
        }
        if (activeKeys.includes(key)) {
            ctx.fillStyle = "#ccc"
            ctx.beginPath()
            ctx.rect(x, -1, whiteKeyWidth, h + 1);
            ctx.fill();
            ctx.closePath();
        }
    });
    let blackKeyWidth = w / 100;
    blackKeys.forEach((key, index) => {
        let x = Math.floor((w / 52) * index);
        if (key != -1) {
            if (activeKeys.includes(key)) {
                // ctx.shadowColor = "transparent";
                ctx.beginPath()
                ctx.fillStyle = "#555";
                ctx.rect(x - blackKeyWidth / 2, -1, blackKeyWidth, h * 0.7);
                ctx.fill();
                ctx.closePath();
            } else {
                // ctx.shadowColor = "rgba(0,0,0,0.2)";
                // ctx.shadowBlur = 4;
                // ctx.shadowOffsetX = 2;
                // ctx.shadowOffsetY = 3;
                ctx.beginPath()
                ctx.fillStyle = "black";
                ctx.rect(x - blackKeyWidth / 2, -1, blackKeyWidth, h * 0.7);
                ctx.fill();
                ctx.closePath();
            }
        }
    });
    ctx.fillStyle = "rgba(0,0,0,0.07)";
    ctx.beginPath();
    ctx.rect((w / 52) * activeKeysIndex - 0.5, -0.5, (w / 52) * 11, h);
    ctx.fill();
    ctx.closePath();

}

function updateKeys() {
    let topRow = document.getElementById("topRow").getElementsByTagName("td");
    let keys = miniKeys.getKeys();
    for (let elem of topRow) {
        if (keys.includes(elem.innerText)) {
            elem.style.backgroundColor = "black"
            elem.style.color = "white";
            elem.style.opacity = "1";
        } else {
            elem.style.backgroundColor = "white"
            elem.style.color = "black";
            elem.style.opacity = "0.3";
        }
    }
}

let activeKeysIndex = 0;

function initPage() {
    start();
}