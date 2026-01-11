import {
  Keyboard,
  ModifierKey,
  useKeyboardControl,
  useMiniKeysKeyboard,
} from "@minikeys/react"
import { useEffect, useState } from "react"
import { useNotes } from "../store"

type Props = {
  playNoteFromMidi: ((midiNote: number, velocity?: number) => void) | undefined
  setSustain: ((sustain: boolean) => void) | undefined
}

export const KeyboardWrapper = ({ playNoteFromMidi, setSustain }: Props) => {
  const {
    keyMap,
    noteRange,
    transposeDown,
    transposeUp,
    octaveDown,
    octaveUp,
  } = useMiniKeysKeyboard("single")

  const setNoteRange = useNotes((state) => state.setNoteRange)
  const setActiveNotes = useNotes((state) => state.setActiveNotes)

  useEffect(() => {
    noteRange && setNoteRange(noteRange)
  }, [noteRange, setNoteRange])

  const [leftSustain, setLeftSustain] = useState(false)
  const [rightSustain, setRightSustain] = useState(false)
  const [capsLock, setCapsLock] = useState(false)

  const disableLeftSustain = () => {
    if (!setSustain) return
    setLeftSustain(false)
    if (!rightSustain && !capsLock) {
      setSustain(false)
    }
  }

  const disableRightSustain = () => {
    if (!setSustain) return
    setRightSustain(false)
    if (!leftSustain && !capsLock) {
      setSustain(false)
    }
  }

  const disableCapsLockSustain = () => {
    if (!setSustain) return
    setCapsLock(false)
    if (!leftSustain && !rightSustain) {
      setSustain(false)
    }
  }

  const enableSustain = (fn: () => void) => {
    if (!setSustain) return
    fn()
    setSustain(true)
  }

  const modKeyColour = "#f0f0f0"

  const modifierKeys: ModifierKey[] = [
    {
      keyCode: "CapsLock",
      label: "sustain",
      action: () => enableSustain(() => setCapsLock(true)),
      actionOnRelease: () => disableCapsLockSustain(),
      bgColour: modKeyColour,
    },
    {
      keyCode: "ShiftLeft",
      label: "sustain",
      action: () => enableSustain(() => setLeftSustain(true)),
      actionOnRelease: () => disableLeftSustain(),
      bgColour: modKeyColour,
    },
    {
      keyCode: "ShiftRight",
      label: "sustain",
      action: () => enableSustain(() => setRightSustain(true)),
      actionOnRelease: () => disableRightSustain(),
      bgColour: modKeyColour,
    },
    {
      keyCode: "KeyV",
      label: "octave down",
      action: () => octaveDown(),
      bgColour: modKeyColour,
    },
    {
      keyCode: "KeyB",
      label: "octave up",
      action: () => octaveUp(),
      bgColour: modKeyColour,
    },
    {
      keyCode: "KeyN",
      label: "transpose down",
      action: () => transposeDown(),
      bgColour: modKeyColour,
    },
    {
      keyCode: "KeyM",
      label: "transpose up",
      action: () => transposeUp(),
      bgColour: modKeyColour,
    },
  ]

  const { activeKeys } = useKeyboardControl(
    keyMap,
    playNoteFromMidi,
    modifierKeys,
  )

  useEffect(() => {
    activeKeys && setActiveNotes(activeKeys.map((key) => key.note))
  }, [activeKeys, setActiveNotes])

  return (
    <Keyboard
      width={1200}
      dualMode={false}
      animate={true}
      showFullKeyboard={true}
      activeKeys={activeKeys}
      keyMap={keyMap}
      onKeyClick={playNoteFromMidi}
      modifierKeys={modifierKeys}
    />
  )
}
