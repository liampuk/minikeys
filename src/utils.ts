// prettier-ignore
export const midiNoteMap = {
  "C-1": 0, "C#-1": 1, "Db-1": 1, "D-1": 2, "D#-1": 3, "Eb-1": 3, "E-1": 4, "F-1": 5, "F#-1": 6, "Gb-1": 6, "G-1": 7, "G#-1": 8, "Ab-1": 8, "A-1": 9, "A#-1": 10, "Bb-1": 10, "B-1": 11,
  "C0": 12, "C#0": 13, "Db0": 13, "D0": 14, "D#0": 15, "Eb0": 15, "E0": 16, "F0": 17, "F#0": 18, "Gb0": 18, "G0": 19, "G#0": 20, "Ab0": 20, "A0": 21, "A#0": 22, "Bb0": 22, "B0": 23,
  "C1": 24, "C#1": 25, "Db1": 25, "D1": 26, "D#1": 27, "Eb1": 27, "E1": 28, "F1": 29, "F#1": 30, "Gb1": 30, "G1": 31, "G#1": 32, "Ab1": 32, "A1": 33, "A#1": 34, "Bb1": 34, "B1": 35,
  "C2": 36, "C#2": 37, "Db2": 37, "D2": 38, "D#2": 39, "Eb2": 39, "E2": 40, "F2": 41, "F#2": 42, "Gb2": 42, "G2": 43, "G#2": 44, "Ab2": 44, "A2": 45, "A#2": 46, "Bb2": 46, "B2": 47,
  "C3": 48, "C#3": 49, "Db3": 49, "D3": 50, "D#3": 51, "Eb3": 51, "E3": 52, "F3": 53, "F#3": 54, "Gb3": 54, "G3": 55, "G#3": 56, "Ab3": 56, "A3": 57, "A#3": 58, "Bb3": 58, "B3": 59,
  "C4": 60, "C#4": 61, "Db4": 61, "D4": 62, "D#4": 63, "Eb4": 63, "E4": 64, "F4": 65, "F#4": 66, "Gb4": 66, "G4": 67, "G#4": 68, "Ab4": 68, "A4": 69, "A#4": 70, "Bb4": 70, "B4": 71,
  "C5": 72, "C#5": 73, "Db5": 73, "D5": 74, "D#5": 75, "Eb5": 75, "E5": 76, "F5": 77, "F#5": 78, "Gb5": 78, "G5": 79, "G#5": 80, "Ab5": 80, "A5": 81, "A#5": 82, "Bb5": 82, "B5": 83,
  "C6": 84, "C#6": 85, "Db6": 85, "D6": 86, "D#6": 87, "Eb6": 87, "E6": 88, "F6": 89, "F#6": 90, "Gb6": 90, "G6": 91, "G#6": 92, "Ab6": 92, "A6": 93, "A#6": 94, "Bb6": 94, "B6": 95,
  "C7": 96, "C#7": 97, "Db7": 97, "D7": 98, "D#7": 99, "Eb7": 99, "E7": 100, "F7": 101, "F#7": 102, "Gb7": 102, "G7": 103, "G#7": 104, "Ab7": 104, "A7": 105, "A#7": 106, "Bb7": 106, "B7": 107,
  "C8": 108, "C#8": 109, "Db8": 109, "D8": 110, "D#8": 111, "Eb8": 111, "E8": 112, "F8": 113, "F#8": 114, "Gb8": 114, "G8": 115, "G#8": 116, "Ab8": 116, "A8": 117, "A#8": 118, "Bb8": 118, "B8": 119,
  "C9": 120, "C#9": 121, "Db9": 121, "D9": 122, "D#9": 123, "Eb9": 123, "E9": 124, "F9": 125, "F#9": 126, "Gb9": 126, "G9": 127
} as const

// prettier-ignore
export const keyboardBlackNotes = [
  null, 
  'A#0', null, 'C#1', 'D#1', null, 'F#1', 'G#1', 
  'A#1', null, 'C#2', 'D#2', null, 'F#2', 'G#2', 
  'A#2', null, 'C#3', 'D#3', null, 'F#3', 'G#3',
  'A#3', null, 'C#4', 'D#4', null, 'F#4', 'G#4',
  'A#4', null, 'C#5', 'D#5', null, 'F#5', 'G#5',
  'A#5', null, 'C#6', 'D#6', null, 'F#6', 'G#6',
  'A#6', null, 'C#7', 'D#7', null, 'F#7', 'G#7',
  'A#7', null, null, null
] as const;

// prettier-ignore
export const keyboardWhiteNotes = [
  'A0', 'B0',
  'C1', 'D1', 'E1', 'F1', 'G1', 'A1', 'B1',
  'C2', 'D2', 'E2', 'F2', 'G2', 'A2', 'B2',
  'C3', 'D3', 'E3', 'F3', 'G3', 'A3', 'B3',
  'C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4',
  'C5', 'D5', 'E5', 'F5', 'G5', 'A5', 'B5',
  'C6', 'D6', 'E6', 'F6', 'G6', 'A6', 'B6',
  'C7', 'D7', 'E7', 'F7', 'G7', 'A7', 'B7',
  'C8'
] as const;

// prettier-ignore
export const keyboardRows = [
  ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal"],
  ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight"],
  ["KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote"],
  ["KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash"],
] as const;

export const getClosestNote = (
  forteNotes: Map<number, AudioBuffer>,
  pianoNotes: Map<number, AudioBuffer>,
  midiNote: number,
  velocity?: number,
) => {
  let notes: Map<number, AudioBuffer>;

  if (velocity && velocity < 64 && pianoNotes.size > 0) {
    notes = pianoNotes;
  } else if (forteNotes.size > 0) {
    notes = forteNotes;
  } else {
    throw new Error('No notes loaded');
  }

  const closestNoteMidi = Array.from(notes.keys()).reduce((a, b) =>
    Math.abs(b - midiNote) < Math.abs(a - midiNote) ? b : a,
  );

  return { closestNoteMidi, closestNote: notes.get(closestNoteMidi) };
};
