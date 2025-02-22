import { noteToMidi } from './utils.js';

export type NoteName = keyof typeof noteToMidi;
export type MidiRange = (typeof noteToMidi)[NoteName];
export type Velocity = 'piano' | 'forte';

export type Sample = {
  note: NoteName;
  url: string;
  velocity: Velocity;
};

export type KeyboardMode = 'dual' | 'single';
export type KeyStatus = 'down' | 'up';
export type KeyType = 'black' | 'white' | 'disabled';

export type KeyMap = Map<string, { midiNote: MidiRange | null; type: KeyType }>;
