import { KeyboardMode, KeyMap, MiniKeysKeyboard } from "minikeys"
import { useEffect, useRef, useState } from "react"

export const useMiniKeysKeyboard = (mode: KeyboardMode) => {
  const miniKeysKeyboardRef = useRef<MiniKeysKeyboard | null>(null)
  const [keyMap, setKeyMap] = useState<KeyMap>()
  const noteRange = miniKeysKeyboardRef.current?.getNoteRange()

  useEffect(() => {
    if (!miniKeysKeyboardRef.current) {
      miniKeysKeyboardRef.current = new MiniKeysKeyboard(mode)
      setKeyMap(miniKeysKeyboardRef.current.getNoteMap())
    }

    return () => {
      miniKeysKeyboardRef.current = null
      setKeyMap(undefined)
    }
  }, [mode])

  const transposeDown = () => {
    miniKeysKeyboardRef.current?.shiftLeft()
    setKeyMap(miniKeysKeyboardRef.current?.getNoteMap())
  }

  const transposeUp = () => {
    miniKeysKeyboardRef.current?.shiftRight()
    setKeyMap(miniKeysKeyboardRef.current?.getNoteMap())
  }

  const octaveDown = () => {
    miniKeysKeyboardRef.current?.shiftLeftOctave()
    setKeyMap(miniKeysKeyboardRef.current?.getNoteMap())
  }

  const octaveUp = () => {
    miniKeysKeyboardRef.current?.shiftRightOctave()
    setKeyMap(miniKeysKeyboardRef.current?.getNoteMap())
  }

  return {
    keyMap,
    noteRange,
    transposeDown,
    transposeUp,
    octaveDown,
    octaveUp,
  }
}
