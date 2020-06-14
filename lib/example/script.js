
const miniKeys = new MiniKeys();
let ctx;
let w, h;
let activeKeys = new Array();

start();

function start() {
    miniKeys.init();
    miniKeys.loadSamples([
        './samples/f24.wav',
        './samples/f31.wav',
        './samples/f38.wav',
        './samples/f45.wav',
        './samples/f52.wav',
        './samples/f59.wav',
        './samples/f66.wav',
        './samples/f73.wav',
        './samples/f80.wav',
        './samples/f87.wav',
        './samples/f94.wav',
        './samples/f101.wav',
        './samples/p24.wav',
        './samples/p31.wav',
        './samples/p38.wav',
        './samples/p45.wav',
        './samples/p52.wav',
        './samples/p59.wav',
        './samples/p66.wav',
        './samples/p73.wav',
        './samples/p80.wav',
        './samples/p87.wav',
        './samples/p94.wav',
        './samples/p101.wav'
    ]).then((res) => {
        // console.log(res);
    })
}

document.addEventListener("keypress", function (event) {
    keyPress(event.key);

});

function keyPress(key) {
    let note = -1;
    if (Object.keys(miniKeys._whiteKeys).includes(key)) {
        note = miniKeys._whiteKeys[key];
    } else if (Object.keys(miniKeys._blackKeys).includes(key)) {
        note = miniKeys._blackKeys[key];
    }
    if (note != -1) {
        miniKeys.playNote(note, 100);
        if (!activeKeys.includes(note)) {
            activeKeys.push(note);
            renderNote();
        }
    }

    if (key == 'z') {
        miniKeys.shift(-1, miniKeys.TONE);
        activeKeysIndex = miniKeys.getKeyIndex();
        drawPiano(activeKeysIndex);
    } else if (key == 'x') {
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

function renderNote() {
    activeKeysIndex = miniKeys.getKeyIndex();
    drawPiano(activeKeysIndex);
    ctx.fillStyle = "rgba(0,0,0,0.5)"
    ctx.beginPath()
    ctx.rect((w / 52) * 30 - 0.5, -0.5, (w / 52), h);
    ctx.fill();
    ctx.closePath();
    // activeKeys.forEach((key) => {
    //     console.log(key);
    //     ctx.beginPath()
    //     ctx.rect((w / 52) * key-0.5, -0.5, (w / 52), h);
    //     ctx.fill();
    //     ctx.closePath();
    // });
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
        renderNote();
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


function drawPiano(index) {
    let canvas = document.getElementsByTagName("canvas")[0];
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;
    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, w, h);
    ctx.translate(0.5, 0.5);
    ctx.lineWidth = 1;
    let blackKeys = 0;
    let two = true;
    let blackKeyWidth = w / 100;
    ctx.strokeStyle = "rgba(127,127,127,0.5)"
    // ctx.rect(0,0,w-1,h-1);
    // ctx.stroke();
    for (let i = 1; i < 52; i++) {
        ctx.lineWidth = 1;
        ctx.beginPath();
        let x = Math.floor((w / 52) * i);
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
        ctx.closePath();
        if (blackKeys >= 0) {
            // ctx.lineWidth = 15;
            // ctx.beginPath();
            // ctx.moveTo(x, -1);
            // ctx.lineTo(x, h*0.7);
            // ctx.stroke();
            // ctx.closePath();
            ctx.rect(x - blackKeyWidth / 2, -1, blackKeyWidth, h * 0.7);
            ctx.fill();
            blackKeys--;
        } else if (blackKeys <= -1) {
            if (two) {
                blackKeys = 1;
                two = false;
            } else {
                blackKeys = 2;
                two = true;
            }
        } else {
            blackKeys--;
        }
    }
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.beginPath();
    ctx.rect((w / 52) * index - 0.5, -0.5, (w / 52) * 11, h);
    ctx.fill();
    ctx.closePath();
}

function updateKeys() {
    let topRow = document.getElementById("topRow").getElementsByTagName("td");
    let keys = miniKeys.getKeys();
    for (let elem of topRow) {
        if (keys.includes(elem.innerText)) {
            elem.style.backgroundColor = "rgba(0,0,0,0.85)"
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
    activeKeysIndex = 23;
    drawPiano(activeKeysIndex);
    updateKeys();
}