import MiniKeys from './main'

MiniKeys.prototype.init = function () {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this._context = new AudioContext();
    console.log("audio running");
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

MiniKeys.prototype.playNote = function (note, velocity) {
    const dynamic = velocity >= 64 ? "f" : "p";
    const sample = this._sampleNotes.reduce((closest, curr) => {
        return Math.abs(curr-note) < Math.abs(closest-note) ? curr : closest;
    }, this._sampleNotes[0]);
    let source = this._context.createBufferSource();
    source.buffer = this._noteBuffers[dynamic+sample];
    source.connect(this._context.destination);
    source.playbackRate.value = 2 ** ((note - sample) / 12);
    source.start(0, 0.75);
}

// function playNote2(n){
//     const sample = samplesList.reduce((closest, curr) => {
//         return Math.abs(curr-n) < Math.abs(closest-n) ? curr : closest;
//     }, samplesList[0]);

//     let source = context.createBufferSource();
//     source.buffer = bufferList[samplesList.indexOf(sample)];
//     source.connect(context.destination);
//     source.playbackRate.value = 2 ** ((n - sample) / 12);;
//     source.start(0, 0.75);
// }