class MiniKeys {
    constructor() {
        this._sampleNotes = new Array();
        this._noteBuffers = new Array();
        this._context = null;

        this._whiteKeys = {
            "a": 60,
            "s": 62,
            "d": 64,
            "f": 65,
            "g": 67,
            "h": 69,
            "j": 71,
            "k": 72,
            "l": 74,
            ";": 76,
            "'": 77,
        }
        this._blackKeys = {
            "q": -1,
            "w": 61,
            "e": 63,
            "r": -1,
            "t": 66,
            "y": 68,
            "u": 70,
            "i": -1,
            "o": 73,
            "p": 75,
            "[": -1,
            "]": 78 
        }
        this._WHITEKEYSET = [21,23,24,26,28,29,31,33,35,36,38,40,41,43,45,47,48,50,52,53,55,57,59,60,62,64,65,67,69,71,72,74,76,77,79,81,83,84,86,88,89,91,93,95,96,98,100,101,103,105,107,108];
        this._BLACKKEYSET = [-1,22,-1,25,27,-1,30,32,34,-1,37,39,-1,42,44,46,-1,49,51,-1,54,56,58,-1,61,63,-1,66,68,70,-1,73,75,-1,78,80,82,-1,85,87,-1,90,92,94,-1,97,99,-1,102,104,106,-1,-1];
        this._keySetIndex = 23;
        this.OCTAVE = 7;
        this.TONE = 1;

    }
}

MiniKeys.prototype.getWhiteMidiNotes = function() {
    return this._WHITEKEYSET;
}

MiniKeys.prototype.getBlackMidiNotes = function() {
    return this._BLACKKEYSET;
}

export default MiniKeys;