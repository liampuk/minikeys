import { keyboardWhiteNotes, noteToMidi } from "minikeys"
import { PianoKeyRect } from "./PianoKey"
import { NoteLabel } from "./commonStyles"
import { Highlights } from "./types"
import { nextWhiteNoteIndex, prevWhiteNoteIndex } from "./utils"

type Props = {
  numKeys: number
  width: number
  height: number
  strokeWidth: number
  strokeColour?: string
  baseNoteOffset: number
  showLabels: boolean
  highlights?: Highlights
  noBorder?: boolean
  handleClick?: (midiNote: number | null | undefined) => void
}

export const WhiteNotes = ({
  numKeys,
  width,
  height,
  strokeWidth,
  strokeColour,
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
    if (
      highlights?.activeNotes?.includes(keyboardWhiteNotes[baseNoteOffset + i])
    ) {
      return "#ccc"
    } else if (highlights?.rangeStart || highlights?.rangeEnd) {
      if (
        keyboardWhiteNotes
          .slice(
            nextWhiteNoteIndex(highlights?.rangeStart ?? "A0"),
            prevWhiteNoteIndex(highlights?.rangeEnd ?? "C8") + 1
          )
          .includes(keyboardWhiteNotes[baseNoteOffset + i])
      ) {
        return highlights?.rangeColor ?? "#eee"
      }
    }
    return "white"
  }

  const handleNoteClick = (i: number) => {
    if (!handleClick) {
      return
    }
    const namedNote = keyboardWhiteNotes[baseNoteOffset + i]
    const midiNote = noteToMidi[namedNote]
    handleClick(midiNote)
  }

  return Array.from({ length: numKeys }).map((_, i) => (
    <g key={`piano-key-white-${i}`} onMouseDown={() => handleNoteClick(i)}>
      <PianoKeyRect
        width={keyWidth}
        height={height}
        offset={i * keyWidth - (i * strokeWidth) / 2}
        strokeWidth={strokeWidth}
        strokeColour={strokeColour}
        type="white"
        fill={getFill(i)}
        noBorder={noBorder}
      />
      {showLabels && (
        <NoteLabel
          x={i * keyWidth - (i * strokeWidth) / 2 + keyWidth / 2}
          y={height - height * 0.03}
          textAnchor="middle"
          fontSize={height * 0.04}
          fill="black"
          opacity={0.6}
        >
          {keyboardWhiteNotes[baseNoteOffset + i]}
        </NoteLabel>
      )}
    </g>
  ))
}
