# MiniKeys

<!-- TODO add badges from CD -->

A tiny javascript library that plays the piano. [Try it out here!](http://liamp.uk/minikeys)

To use MiniKeys in a React app, you can use components from [@minikeys/react](https://www.npmjs.com/package/@minikeys/react)

<img width="1269" height="486" alt="Screenshot 2025-07-31 at 21 23 08" src="https://github.com/user-attachments/assets/1ff24de7-9222-42f0-ba74-9a3618ef9cd6" />

## Install

```
$ yarn add minikeys
# OR
$ npm install minikeys
```

## Using MiniKeys

### Basic Setup

First, instantiate a new instance of MiniKeys, then call `loadNotes` with a list of sample audio files. You can then call `playNote` with either the midi note value or the note name (_A3_, _C#4_ etc.)

```
const miniKeys = new MiniKeys();

miniKeys.loadNotes([
  {
    note: 'A#2',
    url: '/samples/a2.ogg
    velocity: 'piano'
  },
  {
    note: 'A#6',
    url: '/samples/a6.ogg
    velocity: 'piano'
  },
])

miniKeys.playNoteFromName('C#4')
```

MiniKeys works with any number of samples. When a note is played, MiniKeys finds the closest loaded sample and tunes it to the correct frequency.

### Main Functions

#### loadNotes

`loadNotes` takes an array of Samples objects, where _note_ is the name of the note and _velocity_ is if the sample is a soft (piano) or hard (forte) sample.

```
{
    note: NoteName; // 'A4', 'C#3' etc.
    url: string;
    velocity: Velocity; // 'piano' or 'forte'
}[]
```

`loadNotes` returns a Promise that resolves when all notes are loaded or if there is an error. You can provide `loadNotes` with a callback function to handle progress updates.

#### playNoteFromMidi

`playNoteFromMidi` takes a midi note (0-127), and a velocity value (0-127). The sample closest to the midi value is chosen, and is pitch shifted to play the correct note. The volume and correct dynamic (_piano_ or _forte_) is chosen based on the velocity.

#### playNoteFromName

This does the same as `playNoteFromMidi`, but with note names (_A3_, _C#4_ etc.)

#### setSustain

This function takes a boolean value and behaves the same as a sustain pedal on a piano. If it sustain is set to true notes are held (including already played notes), if sustain is set to false notes are faded out (including already played notes)

### Keyboard Functions

Various functions are provided for interacting with MiniKeys through the keyboard. Full documentation is coming soon!

## Finding Samples

[Pianobook](www.pianobook.co.uk) is a fantastic community project to provide free piano (and other instruments) samples. The samples used in the example are from a [Steinway Concert Grand in Kristiansand, Norway](https://www.pianobook.co.uk/packs/kristiansand-concert-steinway/). Thank you to [Pete Malkin](https://www.petemalkin.co.uk/) for sampling this lovely instrument!

## TODO

- Function to play multiple notes
- Add more tests
- Look into replacing compressor
- New package for chords? @minikeys/chords?
- Custom labels for piano (for showing keyboard keys)
