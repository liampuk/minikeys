import { keyboardBlackNotes, noteToMidi } from "minikeys"
import { PianoKeyRect } from "./PianoKey"
import { NoteLabel } from "./commonStyles"
import { Highlights } from "./types"

type Props = {
  numKeys: number
  width: number
  height: number
  strokeWidth: number
  baseNoteOffset: number
  showLabels: boolean
  highlights?: Highlights
  noBorder?: boolean
  handleClick?: (midiNote: number | null | undefined) => void
}

export const BlackNotes = ({
  numKeys,
  width,
  height,
  strokeWidth,
  baseNoteOffset,
  showLabels,
  highlights,
  noBorder,
  handleClick,
}: Props) => {
  const keyWidth =
    (width - strokeWidth / 2) / numKeys +
    (strokeWidth / 2) * ((numKeys - 1) / numKeys)

  const getFill = (i: number) => {
    const note = keyboardBlackNotes[baseNoteOffset + i]
    if (note !== null) {
      if (highlights?.activeNotes?.includes(note)) {
        return "#444"
      }
    }
    return "#222"
  }

  const nudgeDirection = (i: number) => {
    if (i > 0 && i < keyboardBlackNotes.length) {
      if (keyboardBlackNotes[i - 1] === null) {
        return -1
      } else if (keyboardBlackNotes[i + 1] === null) {
        return 1
      }
    }
    return 0
  }

  const handleNoteClick = (i: number) => {
    if (!handleClick) {
      return
    }
    const namedNote = keyboardBlackNotes[baseNoteOffset + i]
    if (namedNote === null) {
      return
    }
    const midiNote = noteToMidi[namedNote]
    handleClick(midiNote)
  }

  return Array.from({ length: numKeys + 1 }).map(
    (_, i) =>
      keyboardBlackNotes[baseNoteOffset + i] && (
        <g key={`piano-key-black-${i}`} onMouseDown={() => handleNoteClick(i)}>
          <PianoKeyRect
            width={keyWidth * 0.65}
            height={height * 0.65}
            offset={
              i * keyWidth -
              i * (strokeWidth / 2) -
              (keyWidth * 0.65 - strokeWidth) / 2 +
              nudgeDirection(baseNoteOffset + i) * keyWidth * 0.1
            }
            strokeWidth={1.5}
            fill={getFill(i)}
            type="black"
            noBorder={noBorder}
          />
          {showLabels &&
            i * keyWidth - (i * strokeWidth) / 2 > 5 &&
            i * keyWidth - (i * strokeWidth) / 2 < width - 5 && (
              <NoteLabel
                x={
                  i * keyWidth -
                  (i * strokeWidth) / 2 +
                  strokeWidth / 2 +
                  nudgeDirection(baseNoteOffset + i) * keyWidth * 0.1
                }
                y={height * 0.65 - height * 0.03}
                textAnchor="middle"
                fontSize={height * 0.04}
                fill="white"
                opacity={0.8}
              >
                {keyboardBlackNotes[baseNoteOffset + i]}
              </NoteLabel>
            )}
        </g>
      )
  )
}
