import { KeyMap, midiToNote, NoteName } from "minikeys"
import { useEffect, useRef, useState } from "react"
import { ModifierKey } from "../Keyboard/Keyboard"
import { ActiveKey } from "../Piano/types"

export const useKeyboardControl = (
  keyMap: KeyMap | undefined,
  playNoteFromMidi?: (midiNote: number, velocity?: number) => void,
  liftNoteFromMidi?: (midiNote: number) => void,
  modifierKeys?: ModifierKey[]
) => {
  const [activeKeys, setActiveKeys] = useState<
    ActiveKey[]
  >([])
  const activeKeysRef = useRef(activeKeys)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const modifierKey = modifierKeys?.find(
        (modifierKey) => modifierKey.keyCode === event.code
      )
      if (
        !modifierKey &&
        activeKeysRef.current.some((key) => key.keyCode === event.code)
      ) {
        return
      }
      if (modifierKey && !keyMap?.get(event.code)) {
        modifierKey?.action()
      }
      const note = keyMap?.get(event.code)?.midiNote
      if (note && playNoteFromMidi) {
        playNoteFromMidi(note)
      }
      const newActiveKeys = [
        ...activeKeysRef.current,
        { keyCode: event.code, note: note ? midiToNote[note] : undefined },
      ]
      setActiveKeys(newActiveKeys)
      activeKeysRef.current = newActiveKeys
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const newActiveKeys = activeKeysRef.current.filter((key) => key.keyCode !== event.code)
      setActiveKeys(newActiveKeys)
      activeKeysRef.current = newActiveKeys
      const note = keyMap?.get(event.code)?.midiNote
      if (note && liftNoteFromMidi) {
        liftNoteFromMidi(note)
      }
      const modifierKey = modifierKeys?.find(
        (modifierKey) => modifierKey.keyCode === event.code
      )
      if (modifierKey && !keyMap?.get(event.code)) {
        modifierKey?.actionOnRelease && modifierKey?.actionOnRelease()
      }
    }

    window.addEventListener("keydown", handleKeyDown, true)
    window.addEventListener("keyup", handleKeyUp, true)

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true)
      window.removeEventListener("keyup", handleKeyUp, true)
    }
  }, [keyMap, playNoteFromMidi, modifierKeys])

  return {
    activeKeys,
  }
}
