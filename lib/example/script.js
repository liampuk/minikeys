function start(){
    const miniKeys = new MiniKeys();
    miniKeys.init();
    miniKeys.loadSamples(['./samples/f45.wav'])
    console.log(miniKeys._context)
    console.log("finished");
}