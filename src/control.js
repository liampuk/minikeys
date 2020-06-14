import MiniKeys from './main'

MiniKeys.prototype.getKeyIndex = function() {
    return this._keySetIndex;
}

MiniKeys.prototype.getKeys = function(){
    let keys = [];
    Object.keys(this._whiteKeys).forEach(key =>{
        keys.push(key);
    });
    Object.keys(this._blackKeys).forEach(key =>{
        if(this._blackKeys[key] != -1){
            keys.push(key);
        }
    });
    return keys;
}

MiniKeys.prototype.shift = function(shift, step=this.OCTAVE){
    if((shift != 1 && shift != -1) || (step != this.OCTAVE && step != this.TONE)){
        throw new Error('shift must be 1 or -1 and step must be OCTAVE or TONE');
    }
    this._keySetIndex+=shift*step;
    if(this._keySetIndex < 0){
        this._keySetIndex = 0;
    }else if(this._keySetIndex+11 > this._WHITEKEYSET.length){
        this._keySetIndex-=shift*step;
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