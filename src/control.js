import MiniKeys from './main'

MiniKeys.prototype.volume = function(vol){
    if(vol < 0 || vol > 1){
        throw new Error('volume must be between 0 and 1');
    }
    this._volume = vol;
    this._gainNode.gain.value = this._volume;
}

MiniKeys.prototype.shift = function(shift, step=this.OCTAVE){
    if((shift != 1 && shift != -1) || (step != this.OCTAVE && step != this.TONE)){
        throw new Error('shift must be 1 or -1 and step must be OCTAVE or TONE');
    }
    this._keySetIndex+=shift*step;
    if(this._keySetIndex < 0){
        this._keySetIndex = 0;
    }else if(this._keySetIndex+11 > this._WHITEKEYSET.length){
        this._keySetIndex=this._WHITEKEYSET.length-11;
    }
    let curIndex = this._keySetIndex;
    Object.keys(this._whiteKeys).forEach(key =>{
        this._whiteKeys[key] = this._WHITEKEYSET[curIndex];
        curIndex++;
    });
    curIndex = this._keySetIndex;
    Object.keys(this._blackKeys).forEach(key => {
        this._blackKeys[key] = this._BLACKKEYSET[curIndex];
        curIndex++;
    });
}