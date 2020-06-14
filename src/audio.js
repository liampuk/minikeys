import MiniKeys from './main'

MiniKeys.prototype.init = function () {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this._context = new AudioContext();

    let ctx = this._context;

    this._compressorNode = ctx.createDynamicsCompressor();
    this._compressorNode.threshold.setValueAtTime(-12, ctx.currentTime);
    this._compressorNode.knee.setValueAtTime(0.0, ctx.currentTime);
    this._compressorNode.ratio.setValueAtTime(15, ctx.currentTime);
    this._compressorNode.attack.setValueAtTime(0.005, ctx.currentTime);
    this._compressorNode.release.setValueAtTime(0.05, ctx.currentTime);

    this._compressorNode.connect(ctx.destination);
}

MiniKeys.prototype.loadSamples = function (urlList) {
    return new Promise((resolve, reject) => {
        const requests = urlList.map((url, index) => {
            return this._loadBuffer(url, index).then((midiNote) => {
                this._sampleNotes[index] = midiNote;
                if (!this._sampleNotes.includes(midiNote)) this._sampleNotes[index] = midiNote;
            })
        });

        Promise.all(requests).then(() => {
            resolve(this._sampleNotes);
        }).catch(error => reject(error))
    });



}

MiniKeys.prototype._loadBuffer = function (url, index) {
    return new Promise((resolve, reject) => {
        const fileName = url.split('/').pop().split('.')[0];
        let dynamic;
        let midiNote;

        if (fileName.substring(0, 1) == "p" || fileName.substring(0, 1) == "f") {
            dynamic = fileName.substring(0, 1);
        } else {
            reject(Error('Invalid file name'));
        }

        midiNote = parseInt(fileName.substring(1));

        if (midiNote >= 21 && midiNote <= 108) {
            let request = new XMLHttpRequest();
            request.open("GET", url, true);
            request.responseType = "arraybuffer";

            let loader = this;

            request.onload = function () {
                loader._context.decodeAudioData(
                    request.response, (buffer) => {
                        if (!buffer) {
                            reject(Error('error decoding file data: ' + url));
                            return;
                        }
                        loader._noteBuffers[fileName] = buffer;
                        resolve(midiNote);

                    },
                    function (error) {
                        throw new Error(error);
                    }
                );
            }

            request.onerror = function () {
                alert('BufferLoader: XHR error');
                reject(Error('BufferLoader: XHR error'));
            }

            request.send();
        } else {
            reject(Error('Invalid file name'));
        }

    });
}

MiniKeys.prototype.playNote = function (note, velocity, offset=0) {
    let dynamic = null;
    let dynamicVol = null;
    if(velocity >= 64 && velocity <=128){
        dynamic = "f";
        dynamicVol = ((velocity-64)/256+0.25)*this._volume;
    }else if(velocity >=0){
        dynamic = "p";
        dynamicVol = (velocity/256)*this._volume;
    }
    const sample = this._sampleNotes.reduce((closest, curr) => {
        return Math.abs(curr-note) < Math.abs(closest-note) ? curr : closest;
    }, this._sampleNotes[0]);
    let source = this._context.createBufferSource();
    source.buffer = this._noteBuffers[dynamic+sample];

    const gainNode = this._context.createGain();
    gainNode.gain.value = dynamicVol;

    source.connect(gainNode);

    gainNode.connect(this._compressorNode);
    source.playbackRate.value = 2 ** ((note - sample) / 12);
    source.start(0, offset);
}