import { ModifierKey } from "./Keyboard"

export const keyCodeToLabel = new Map([
  ["Digit1", "1"],
  ["Digit2", "2"],
  ["Digit3", "3"],
  ["Digit4", "4"],
  ["Digit5", "5"],
  ["Digit6", "6"],
  ["Digit7", "7"],
  ["Digit8", "8"],
  ["Digit9", "9"],
  ["Digit0", "0"],
  ["Minus", "-"],
  ["Equal", "="],

  ["KeyQ", "q"],
  ["KeyW", "w"],
  ["KeyE", "e"],
  ["KeyR", "r"],
  ["KeyT", "t"],
  ["KeyY", "y"],
  ["KeyU", "u"],
  ["KeyI", "i"],
  ["KeyO", "o"],
  ["KeyP", "p"],
  ["BracketLeft", "["],
  ["BracketRight", "]"],

  ["KeyA", "a"],
  ["KeyS", "s"],
  ["KeyD", "d"],
  ["KeyF", "f"],
  ["KeyG", "g"],
  ["KeyH", "h"],
  ["KeyJ", "j"],
  ["KeyK", "k"],
  ["KeyL", "l"],
  ["Semicolon", ";"],
  ["Quote", "'"],

  ["KeyZ", "z"],
  ["KeyX", "x"],
  ["KeyC", "c"],
  ["KeyV", "v"],
  ["KeyB", "b"],
  ["KeyN", "n"],
  ["KeyM", "m"],
  ["Comma", ","],
  ["Period", "."],
  ["Slash", "/"],
])

export const keyboardRows = [
  [
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Digit0",
    "Minus",
    "Equal",
  ],
  [
    "KeyQ",
    "KeyW",
    "KeyE",
    "KeyR",
    "KeyT",
    "KeyY",
    "KeyU",
    "KeyI",
    "KeyO",
    "KeyP",
    "BracketLeft",
    "BracketRight",
  ],
  [
    "KeyA",
    "KeyS",
    "KeyD",
    "KeyF",
    "KeyG",
    "KeyH",
    "KeyJ",
    "KeyK",
    "KeyL",
    "Semicolon",
    "Quote",
  ],
  [
    "KeyZ",
    "KeyX",
    "KeyC",
    "KeyV",
    "KeyB",
    "KeyN",
    "KeyM",
    "Comma",
    "Period",
    "Slash",
  ],
]

export const optionalModifier = (
  keyCodes: string[],
  modifierKeys: ModifierKey[] | undefined
) => {
  return modifierKeys?.find((modifierKey) =>
    keyCodes.includes(modifierKey.keyCode)
  )
}

export const getDisplayMap = (
  showFullKeyboard: boolean,
  dualMode: boolean,
  modifierKeys?: ModifierKey[]
) => {
  const displayMap = new Map<string, number | null>()
  // Row 0
  displayMap.set(
    "Escape",
    showFullKeyboard ||
      !!optionalModifier(["Escape", "IntlBackslash"], modifierKeys)
      ? displayMap.size
      : null
  )
  if (showFullKeyboard || dualMode) {
    keyboardRows[0].forEach((key) => displayMap.set(key, displayMap.size))
  } else {
    keyboardRows[0].forEach((key) => {
      displayMap.set(
        key,
        !!optionalModifier([key], modifierKeys) ? displayMap.size : null
      )
    })
  }
  displayMap.set(
    "Backspace",
    showFullKeyboard || !!optionalModifier(["Backspace"], modifierKeys)
      ? displayMap.size
      : null
  )

  // Row 1
  displayMap.set(
    "Tab",
    showFullKeyboard || !!optionalModifier(["Tab", "Backquote"], modifierKeys)
      ? displayMap.size
      : null
  )
  keyboardRows[1].forEach((key) => displayMap.set(key, displayMap.size))
  displayMap.set(
    "Backquote",
    showFullKeyboard || !!optionalModifier(["Backquote"], modifierKeys)
      ? displayMap.size
      : null
  )

  // Row 2
  displayMap.set(
    "CapsLock",
    showFullKeyboard || !!optionalModifier(["CapsLock"], modifierKeys)
      ? displayMap.size
      : null
  )
  keyboardRows[2].forEach((key) => displayMap.set(key, displayMap.size))
  displayMap.set(
    "Enter",
    showFullKeyboard || !!optionalModifier(["Enter"], modifierKeys)
      ? displayMap.size
      : null
  )

  // Row 3
  displayMap.set(
    "ShiftLeft",
    showFullKeyboard || !!optionalModifier(["ShiftLeft"], modifierKeys)
      ? displayMap.size
      : null
  )
  if (showFullKeyboard || dualMode) {
    keyboardRows[3].forEach((key) => displayMap.set(key, displayMap.size))
  } else {
    keyboardRows[3].forEach((key) => {
      displayMap.set(
        key,
        !!optionalModifier([key], modifierKeys) ? displayMap.size : null
      )
    })
  }
  displayMap.set(
    "ShiftRight",
    showFullKeyboard || !!optionalModifier(["ShiftRight"], modifierKeys)
      ? displayMap.size
      : null
  )

  return displayMap
}
