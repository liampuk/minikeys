import type { KeyboardMode, KeyMap, MidiRange } from './types.js';
import {
  keyboardBlackNotes,
  keyboardRows,
  keyboardWhiteNotes,
  midiToNote,
  noteToMidi,
} from './utils.js';

export class MiniKeysKeyboard {
  private mode: KeyboardMode;
  private keyMap: KeyMap = new Map();
  private offset: number;

  constructor(mode: KeyboardMode) {
    this.mode = mode;
    if (mode === 'single') {
      this.offset = 23;
    } else {
      this.offset = 16;
    }
    this.buildNoteMap();
  }

  getNoteMap = () => this.keyMap;

  getMidiRange = () => {
    const low = Array.from(this.keyMap.values()).reduce(
      (min, key) => (key.midiNote && key.midiNote < min ? key.midiNote : min),
      127 as MidiRange,
    );
    const high = Array.from(this.keyMap.values()).reduce(
      (max, note) =>
        note.midiNote && note.midiNote > max ? note.midiNote : max,
      0 as MidiRange,
    );

    return { low, high };
  };

  getNoteRange = () => {
    const midiRange = this.getMidiRange();
    return { low: midiToNote[midiRange.low], high: midiToNote[midiRange.high] };
  };

  shiftLeft = () => {
    this.offset = Math.max(this.offset - 1, 0);
    this.keyMap = new Map();
    this.buildNoteMap();
  };

  shiftLeftOctave = () => {
    this.offset = Math.max(this.offset - 7, 0);
    this.keyMap = new Map();
    this.buildNoteMap();
  };

  shiftRight = () => {
    this.offset = Math.min(this.offset + 1, this.mode === 'dual' ? 30 : 41);
    this.keyMap = new Map();
    this.buildNoteMap();
  };

  shiftRightOctave = () => {
    this.offset = Math.min(this.offset + 7, this.mode === 'dual' ? 30 : 41);
    this.keyMap = new Map();
    this.buildNoteMap();
  };

  private buildNoteMap = () => {
    if (this.mode === 'single') {
      loadBlackNotes(this.keyMap, 1, this.offset);
      loadWhiteNotes(this.keyMap, 2, this.offset);
    } else {
      loadBlackNotes(this.keyMap, 0, this.offset);
      loadWhiteNotes(this.keyMap, 1, this.offset);
      loadBlackNotes(this.keyMap, 2, this.offset + 12);
      loadWhiteNotes(this.keyMap, 3, this.offset + 12);
    }
  };
}

const loadBlackNotes = (
  keyMap: KeyMap,
  rowIndex: 0 | 1 | 2 | 3,
  offset: number,
) => {
  keyboardRows[rowIndex].forEach((note, i) => {
    const blackNote = keyboardBlackNotes[offset + i];
    if (blackNote === null) {
      keyMap.set(note, { midiNote: null, type: 'disabled' });
    } else if (blackNote !== undefined) {
      keyMap.set(note, { midiNote: noteToMidi[blackNote], type: 'black' });
    } else {
      throw new Error('Invalid note');
    }
  });
};

const loadWhiteNotes = (
  keyMap: KeyMap,
  rowIndex: 0 | 1 | 2 | 3,
  offset: number,
) => {
  keyboardRows[rowIndex].forEach((note, i) => {
    const whiteNote = keyboardWhiteNotes[offset + i];
    if (whiteNote) {
      keyMap.set(note, { midiNote: noteToMidi[whiteNote], type: 'white' });
    } else {
      throw new Error('Invalid note');
    }
  });
};
