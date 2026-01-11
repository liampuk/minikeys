import { KeyMap, midiToNote, NoteName } from "minikeys"
import { useEffect, useState } from "react"
import { ModifierKey } from "../Keyboard/Keyboard"
import { ActiveKey } from "../Piano/types"

export const useKeyboardControl = (
  keyMap: KeyMap | undefined,
  playNoteFromMidi?: (midiNote: number, velocity?: number) => void,
  modifierKeys?: ModifierKey[]
) => {
  const [activeKeys, setActiveKeys] = useState<
    ActiveKey[]
  >([])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const modifierKey = modifierKeys?.find(
        (modifierKey) => modifierKey.keyCode === event.code
      )
      if (
        !modifierKey &&
        activeKeys.some((key) => key.keyCode === event.code)
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
      setActiveKeys((prev) => [
        ...prev,
        { keyCode: event.code, note: note ? midiToNote[note] : undefined },
      ])
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      setActiveKeys((prev) => prev.filter((key) => key.keyCode !== event.code))
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
