import { midiNoteMap } from './utils.js';

export type NoteName = keyof typeof midiNoteMap;
export type MidiRange = (typeof midiNoteMap)[NoteName];
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
