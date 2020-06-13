import MiniKeys from './main'

MiniKeys.prototype.init = function () {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this._context = new AudioContext();
    console.log("audio running");
}

MiniKeys.prototype.loadSamples = function(urlList){
    console.log(urlList);
    let velocity;
    let midiNote;
    urlList.forEach((url, index) => {
        const fileName = url.split('/').pop().split('.')[0];

        try {
            if (fileName.substring(0, 1) == "p" || fileName.substring(0, 1) == "f") {
                velocity = fileName.substring(0, 1);
            } else {
                throw new Error('Invalid file name');
            }

            midiNote = parseInt(fileName.substring(1));

            if (midiNote >= 21 && midiNote <= 108) {
                this._loadBuffer(url);
                // _sampleNotes.push(midiNote);
            }

        } catch (e) {
            console.error(e.message)
        }

    });
}






MiniKeys.prototype._loadBuffer = function (url, index) {
    // Load buffer asynchronously
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    let loader = this;

    request.onload = function () {
        // Asynchronously decode the audio file data in request.response
        loader._context.decodeAudioData(
            request.response, (buffer) => {
                if (!buffer) {
                    throw new Error('error decoding file data: ' + url);
                    return;
                }
                loader._bufferList[index] = buffer;
                if (++loader.loadCount == loader.urlList.length){

                    loader.onload(loader._bufferList);
                    console.log("loaded");
                }

            },
            function (error) {
                throw new Error(error);
            }
        );
    }

    request.onerror = function () {
        alert('BufferLoader: XHR error');
    }

    request.send();
}







/**


MiniKeys.prototype.loadSamples = function (urlList) {
    console.log(urlList);
    let velocity;
    let midiNote;
    urlList.forEach((url, index) => {
        const fileName = url.split('/').pop().split('.')[0];

        try {
            if (fileName.substring(0, 1) == "p" || fileName.substring(0, 1) == "f") {
                velocity = fileName.substring(0, 1);
            } else {
                throw new Error('Invalid file name');
            }

            midiNote = parseInt(fileName.substring(1));

            if (midiNote >= 21 && midiNote <= 108) {
                this._loadBuffer(url);
                // _sampleNotes.push(midiNote);
            }

        } catch (e) {
            console.error(e.message)
        }

    });
}

MiniKeys.prototype._loadBuffer = function (url, index) {
    // Load buffer asynchronously
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";

    let loader = this;

    request.onload = function () {
        // Asynchronously decode the audio file data in request.response
        loader.context.decodeAudioData(
            request.response,
            function (buffer) {
                if (!buffer) {
                    throw new Error('error decoding file data: ' + url);
                    return;
                }
                loader.bufferList[index] = buffer;
                if (++loader.loadCount == loader.urlList.length){

                    loader.onload(loader.bufferList);
                    console.log("loaded");
                }

            },
            function (error) {
                throw new Error(error);
            }
        );
    }

    request.onerror = function () {
        alert('BufferLoader: XHR error');
    }

    request.send();
}
*/