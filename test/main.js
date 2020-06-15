const assert = require('chai').assert;
import MiniKeys from '../src/index'

suite('Main', function () {
    let miniKeys;
    setup(() => {
        miniKeys = new MiniKeys();
    });
    suite('MiniKeys', function () {
        test('_context declared', function () {
            assert.equal(miniKeys._context, null);
        });
        test('variables initialised', function () {
            assert.equal(miniKeys.OCTAVE, 7);
        });
    });
    suite('MiniKeys.prototype.getWhiteMidiNotes', function () {
        test('returns white keys array', function () {
            assert.equal(miniKeys.getWhiteMidiNotes(), miniKeys._WHITEKEYSET)
        });
    });
    suite('MiniKeys.prototype.getBlackMidiNotes', function () {
        test('returns black keys array', function () {
            assert.equal(miniKeys.getBlackMidiNotes(), miniKeys._BLACKKEYSET)
        });
    });
    suite('MiniKeys.prototype.getKeys', function () {
        test('returns array of keys', function () {
            assert.typeOf(miniKeys.getKeys(), 'array');
        });
    });
});