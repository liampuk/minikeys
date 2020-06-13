
const miniKeys = new MiniKeys();

function start(){
    miniKeys.init();
    miniKeys.loadSamples([
        './samples/f45.wav',
        './samples/p45.wav',
        './samples/f66.wav',
        './samples/p66.wav'
    ]).then((res) =>{
        console.log(res);
    })
}

document.addEventListener("keypress", function (event) {
    if(event.key == 'z'){
        // playNote();
        miniKeys.playNote(70, 128);
    }
});

// function playNote(){
//     let source = miniKeys._context.createBufferSource();
//     source.buffer = miniKeys._noteBuffers["f45"];
//     source.connect(miniKeys._context.destination);
//     // source.playbackRate.value = 2 ** ((n - sample) / 12);;
//     source.start(0, 0.75);
// }