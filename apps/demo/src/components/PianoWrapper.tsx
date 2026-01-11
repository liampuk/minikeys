import { Highlights, Piano } from "@minikeys/react"
import styled from "styled-components"
import { useNotes } from "../store"

type Props = {
  playNoteFromMidi: ((midiNote: number, velocity?: number) => void) | undefined
}

export const PianoWrapper = ({ playNoteFromMidi }: Props) => {
  const noteRange = useNotes((state) => state.noteRange)
  const activeNotes = useNotes((state) => state.activeNotes)

  const highlights: Highlights = {
    rangeStart: noteRange?.low,
    rangeEnd: noteRange?.high,
    activeNotes: activeNotes.filter((note) => note !== undefined),
  }

  return (
    <>
      <StyledPiano
        width={1200}
        numKeys={52}
        strokeColour="#ddd"
        strokeWidth={1.5}
        onClick={playNoteFromMidi}
        highlights={highlights}
        noBorder={true}
      />
    </>
  )
}

const StyledPiano = styled(Piano)`
  filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.15));
  animation: 1s ease 0s 1 slideInFromLeft;

  @keyframes slideInFromLeft {
    0% {
      transform: translateY(-20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`
