# MiniKeys

A tiny javascript library that plays the piano.

## Get Started

MiniKeys is hosted via CDN and can be linked with the following:
- Latest verison:
    ```html
    <script src="https://cdn.jsdelivr.net/npm/minikeys/dist/minikeys.min.js"></script>
    ```
- Specific release (v0.1.1):
    ```html
    <script src="https://cdn.jsdelivr.net/npm/minikeys@0.1.1/dist/minikeys.min.js"></script>
    ```

## Reference

First, instantiate a new instance of MiniKeys:

```js
let miniKeys = new MiniKeys();
```

Then call `init()` to initialise the Web Audio Api:

```js
miniKeys.init();
```

Load all samples with `loadSamples(samples)`. Pass in an array of urls to audio files with the naming convention `[p/f][midi-note]`, where `[p/f]` represents the notes dynamic (*p* for piano, *f* for forte) and `[midi-note]` is the corresponding midi value of the note (*60* for C4):

```js
miniKeys.loadSamples([
    '/samples/p45.ogg',
    '/samples/f45.ogg'
]);
```

MiniKeys works with any number of samples. When a note is played, MiniKeys finds the closest loaded sample and tunes it to the correct frequency. In the above example, only one sample has been loaded (with 2 dynamics), and so it will be used for all notes.

To play a note use `playNote(note, velocity)` where note is a midi note (0 to 127), and velocity is a midi velocity value (between 0 and 127):

```js
miniKeys.playNote(60, 100);
```

To play a note via the keyboard, `getKeyMap()` returns a map of keyboard keys to midi notes in the format `"key": midi-note`. This is initialised as the following, where the highlighted section of the piano shows the notes playable on the keyboard:

![keys](https://i.imgur.com/RY63ar8.png)

These mappings can be shifted up and down the keyboard with `shift(direction, shiftMode)`, where `direction` is either 1 (up the piano) or -1 (down the piano) and `shiftMode` is either `OCTAVE` or `TONE`. `OCTAVE` shifts the keyboard by an octave (8 notes) `TONE` shifts the keyboard by one white key:

```js
miniKeys.shift(-1, miniKeys.OCTAVE);
```

Several methods are provided to make rendering a representation of the piano and keyboard easy. `getActiveKeys()` returns an array of which keyboard keys currently map to midi notes in the format `"key": midi-note` (for example, in the above image, *q* currently is not an active key). `getKeyIndex()` returns the current position on the piano (in terms of white keys) of the furthest left note. This can be used with `NUMKEYS` to highlight a section of the piano corresponding to the playable keys. `getWhiteMidiNotes()` and `getBlackMidiNotes()` return an array of length 52 containing the midi notes along the piano from left to right for white keys and black keys respectively. This is useful for rendering black keys as gaps between keys are represented with a `-1` in that location in the array (an example of this is included with the project).

Volume can be changed with `volume(value)`, where value is between 0 and 1:

```js
miniKeys.volume(0.5);
```

## Build process

First, clone the project, then run the following commands:

```
npm install
npm run build
```

This will generate a `/dist` folder with the minimised version of the library `minikeys.min.js`.

To run tests, use the command:

```
npm test
```

## TODO

- [x] clean up interface with keyboard (move validation of key into library)
- [x] compress samples (.ogg)
- [x] trim start of samples
- [ ] tidy/comment code
- [x] add tests
- [ ] cover all functions with tests
- [x] write build guide for readme
- [x] add method for adding loading bar
- [x] add animations to page
- [ ] fix on iOS
- [ ] add midi parser and player
- [ ] add tuning mode (perfect atm, out of tune with actual piano)
- [ ] move keyboard with mouse in example
