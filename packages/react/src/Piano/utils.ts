import { NoteName } from "minikeys"

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

type WhiteNote = (typeof keyboardWhiteNotes)[number]

export const nextWhiteNoteIndex = (note: NoteName) => {
  const whiteNote = note.replace("#", "")
  if (keyboardWhiteNotes.includes(whiteNote as WhiteNote)) {
    if (note.includes("#")) {
      return keyboardWhiteNotes.indexOf(whiteNote as WhiteNote) + 1
    } else {
      return keyboardWhiteNotes.indexOf(whiteNote as WhiteNote)
    }
  } else {
    throw new Error(`Lower range note ${note} invalid`)
  }
}

export const prevWhiteNoteIndex = (note: NoteName) => {
  const whiteNote = note.replace("#", "")
  if (keyboardWhiteNotes.includes(whiteNote as WhiteNote)) {
    return keyboardWhiteNotes.indexOf(whiteNote as WhiteNote)
  } else {
    throw new Error(`Lower range note ${note} invalid`)
  }
}
