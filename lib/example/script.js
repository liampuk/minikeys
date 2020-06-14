
const miniKeys = new MiniKeys();

function start(){
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
    ]).then((res) =>{
        // console.log(res);
    })
}

document.addEventListener("keypress", function (event) {
    let note = -1;
    if(Object.keys(miniKeys._whiteKeys).includes(event.key)){
        note = miniKeys._whiteKeys[event.key];
    }else if(Object.keys(miniKeys._blackKeys).includes(event.key)){
        note = miniKeys._blackKeys[event.key];
    }
    if(note != -1){
        miniKeys.playNote(note, 30);
    }

    if(event.key == 'z'){
        miniKeys.shift(-1, miniKeys.TONE);
    }else if(event.key == 'x'){
        miniKeys.shift(1, miniKeys.TONE);
    }
    // console.log(miniKeys.getKeyIndex());
    console.log(miniKeys.getKeys());
});