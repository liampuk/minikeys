import { KeyMap } from "minikeys"
import { useMemo } from "react"
import styled from "styled-components"
import { Key } from "./Key"
import {
  getDisplayMap,
  keyboardRows,
  keyCodeToLabel,
  optionalModifier,
} from "./utils"
import { ActiveKey } from "../Piano/types"

export type ModifierKey = {
  keyCode: string
  label: string
  action: () => void
  actionOnRelease?: () => void
  bgColour?: string
  colour?: string
}

export type KeyboardProps = {
  width?: number
  dualMode?: boolean
  showFullKeyboard?: boolean
  modifierKeys?: ModifierKey[]
  activeKeys: ActiveKey[]
  keyMap: KeyMap | undefined
  animate?: boolean
  onKeyClick?: (midiNote: number) => void
}

const activeKeysIncludes = (activeKeys: ActiveKey[], key: string) => {
  return activeKeys.map((activeKey) => activeKey.keyCode).includes(key)
}

export const Keyboard = ({
  width = 1200,
  dualMode = false,
  showFullKeyboard = false,
  modifierKeys,
  activeKeys,
  keyMap,
  animate = false,
  onKeyClick,
}: KeyboardProps) => {
  const nonPlayableModifierKey = modifierKeys?.some(
    (modifierKey) =>
      !Array.from(keyCodeToLabel.keys()).includes(modifierKey.keyCode),
  )

  const baseWidth =
    width / (showFullKeyboard || nonPlayableModifierKey ? 15 : 12.5)

  const calculateRowShift = (shift: number) => {
    if (showFullKeyboard) {
      return 0
    } else {
      if (dualMode || nonPlayableModifierKey) {
        return baseWidth * shift
      } else {
        return baseWidth * shift - baseWidth * 0.5
      }
    }
  }

  const handleClick = (midiNote: number | null | undefined) => {
    if (onKeyClick && midiNote !== null && midiNote !== undefined) {
      onKeyClick(midiNote)
    }
  }

  const displayMap = useMemo(
    () => getDisplayMap(showFullKeyboard, dualMode, modifierKeys),
    [showFullKeyboard, dualMode, modifierKeys],
  )

  console.log(
    activeKeys,
    keyboardRows[0][1],
    activeKeysIncludes(activeKeys, keyboardRows[0][1]),
  )

  return (
    <Container $width={width}>
      <Row
        $shift={
          nonPlayableModifierKey
            ? modifierKeys?.some((modifierKey) =>
                ["Escape", "IntlBackslash"].includes(modifierKey.keyCode),
              )
              ? 0
              : calculateRowShift(1)
            : calculateRowShift(0)
        }
        $show={
          displayMap.get("Escape") !== null ||
          displayMap.get("Backspace") !== null ||
          keyboardRows[0].some((key) => displayMap.get(key) !== null)
        }
      >
        <Key
          delayDisplay={animate ? displayMap.get("Escape") : null}
          baseWidth={baseWidth}
          size={1}
          hidden={displayMap.get("Escape") === null}
          label="esc"
          active={
            activeKeysIncludes(activeKeys, "Escape") ||
            activeKeysIncludes(activeKeys, "IntlBackslash")
          }
          modifier={optionalModifier(["Escape", "IntlBackslash"], modifierKeys)}
        ></Key>
        {Array.from({ length: 12 }).map((_, i) => (
          <Key
            delayDisplay={animate ? displayMap.get(keyboardRows[0][i]) : null}
            baseWidth={baseWidth}
            key={i}
            label={keyCodeToLabel.get(keyboardRows[0][i])}
            keyType={keyMap?.get(keyboardRows[0][i])?.type}
            active={activeKeysIncludes(activeKeys, keyboardRows[0][i])}
            onClick={() =>
              handleClick(keyMap?.get(keyboardRows[0][i])?.midiNote)
            }
            hiddenOpacity={!displayMap.get(keyboardRows[0][i])}
            modifier={
              dualMode
                ? undefined
                : optionalModifier([keyboardRows[0][i]], modifierKeys)
            }
          />
        ))}
        <Key
          delayDisplay={animate ? displayMap.get("Backspace") : null}
          baseWidth={baseWidth}
          size={2}
          hidden={!displayMap.get("Backspace")}
          label="backspace"
          active={activeKeysIncludes(activeKeys, "Backspace")}
          modifier={optionalModifier(["Backspace"], modifierKeys)}
        />
      </Row>
      <Row
        $shift={
          nonPlayableModifierKey
            ? modifierKeys?.some((modifierKey) =>
                ["Tab"].includes(modifierKey.keyCode),
              )
              ? 0
              : calculateRowShift(1.5)
            : calculateRowShift(0.5)
        }
        $show={true}
      >
        <Key
          delayDisplay={animate ? displayMap.get("Tab") : null}
          baseWidth={baseWidth}
          size={1.5}
          hidden={!displayMap.get("Tab")}
          label="tab"
          active={activeKeysIncludes(activeKeys, "Tab")}
          modifier={optionalModifier(["Tab"], modifierKeys)}
        />
        {Array.from({ length: 12 }).map((_, i) => (
          <Key
            delayDisplay={animate ? displayMap.get(keyboardRows[1][i]) : null}
            baseWidth={baseWidth}
            key={i}
            label={keyCodeToLabel.get(keyboardRows[1][i])}
            keyType={keyMap?.get(keyboardRows[1][i])?.type}
            active={activeKeysIncludes(activeKeys, keyboardRows[1][i])}
            onClick={() =>
              handleClick(keyMap?.get(keyboardRows[1][i])?.midiNote)
            }
          />
        ))}
        <Key
          delayDisplay={animate ? displayMap.get("Backquote") : null}
          baseWidth={baseWidth}
          size={1.5}
          hidden={!displayMap.get("Backquote")}
          label="\"
          active={activeKeysIncludes(activeKeys, "Backquote")}
          modifier={optionalModifier(["Backquote"], modifierKeys)}
        />
      </Row>
      <Row
        $shift={
          nonPlayableModifierKey
            ? modifierKeys?.some((modifierKey) =>
                ["CapsLock"].includes(modifierKey.keyCode),
              )
              ? 0
              : calculateRowShift(1.75)
            : calculateRowShift(0.75)
        }
        $show={true}
      >
        <Key
          delayDisplay={animate ? displayMap.get("CapsLock") : null}
          baseWidth={baseWidth}
          size={1.75}
          hidden={!displayMap.get("CapsLock")}
          label="caps lock"
          active={activeKeysIncludes(activeKeys, "CapsLock")}
          modifier={optionalModifier(["CapsLock"], modifierKeys)}
          indicator={
            optionalModifier(["CapsLock"], modifierKeys) &&
            (activeKeysIncludes(activeKeys, "CapsLock") ? "active" : "inactive")
          }
        />
        {Array.from({ length: 11 }).map((_, i) => (
          <Key
            delayDisplay={animate ? displayMap.get(keyboardRows[2][i]) : null}
            baseWidth={baseWidth}
            key={i}
            label={keyCodeToLabel.get(keyboardRows[2][i])}
            keyType={keyMap?.get(keyboardRows[2][i])?.type}
            active={activeKeysIncludes(activeKeys, keyboardRows[2][i])}
            onClick={() =>
              handleClick(keyMap?.get(keyboardRows[2][i])?.midiNote)
            }
          />
        ))}
        <Key
          delayDisplay={animate ? displayMap.get("Enter") : null}
          baseWidth={baseWidth}
          size={2.25}
          hidden={!displayMap.get("Enter")}
          label="enter"
          active={activeKeysIncludes(activeKeys, "Enter")}
          modifier={optionalModifier(["Enter"], modifierKeys)}
        />
      </Row>
      <Row
        $shift={
          nonPlayableModifierKey
            ? modifierKeys?.some(
                (modifierKey) => modifierKey.keyCode === "ShiftLeft",
              )
              ? 0
              : calculateRowShift(2.25)
            : calculateRowShift(1.25)
        }
        $show={
          displayMap.get("ShiftLeft") !== null ||
          displayMap.get("ShiftRight") !== null ||
          keyboardRows[3].some((key) => displayMap.get(key) !== null)
        }
      >
        <Key
          delayDisplay={animate ? displayMap.get("ShiftLeft") : null}
          baseWidth={baseWidth}
          size={2.25}
          hidden={!displayMap.get("ShiftLeft")}
          label="shift"
          active={activeKeysIncludes(activeKeys, "ShiftLeft")}
          modifier={optionalModifier(["ShiftLeft"], modifierKeys)}
        />
        {Array.from({ length: 10 }).map((_, i) => (
          <Key
            delayDisplay={animate ? displayMap.get(keyboardRows[3][i]) : null}
            baseWidth={baseWidth}
            key={i}
            label={keyCodeToLabel.get(keyboardRows[3][i])}
            keyType={keyMap?.get(keyboardRows[3][i])?.type}
            active={activeKeysIncludes(activeKeys, keyboardRows[3][i])}
            onClick={() =>
              handleClick(keyMap?.get(keyboardRows[3][i])?.midiNote)
            }
            hiddenOpacity={!displayMap.get(keyboardRows[3][i])}
            modifier={
              dualMode
                ? undefined
                : optionalModifier([keyboardRows[3][i]], modifierKeys)
            }
          />
        ))}
        <Key
          delayDisplay={animate ? displayMap.get("ShiftRight") : null}
          baseWidth={baseWidth}
          size={2.75}
          hidden={!displayMap.get("ShiftRight")}
          label="shift"
          active={activeKeysIncludes(activeKeys, "ShiftRight")}
          modifier={optionalModifier(["ShiftRight"], modifierKeys)}
        />
      </Row>
    </Container>
  )
}

const Container = styled.div<{ $width: number }>`
  width: ${(props) => props.$width}px;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }
`

const Row = styled.div<{ $shift: number; $show: boolean }>`
  display: ${(props) => (props.$show ? "flex" : "none")};
  margin-left: ${(props) => props.$shift}px;
`
