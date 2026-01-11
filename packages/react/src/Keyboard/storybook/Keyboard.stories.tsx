import { StoryObj } from "@storybook/react/*"
import { useEffect, useState } from "react"
import { samples } from "../../data"
import { useKeyboardControl } from "../../hooks/useKeyboardControl"
import { useMiniKeys } from "../../hooks/useMiniKeys"
import { useMiniKeysKeyboard } from "../../hooks/useMiniKeysKeyboard"
import { Keyboard, KeyboardProps, ModifierKey } from "../Keyboard"

type Story = StoryObj<typeof Keyboard>

const defaultArgs: Partial<KeyboardProps> = {
  width: 1200,
  dualMode: false,
  animate: true,
  showFullKeyboard: false,
}

const InteractiveSingleKeyboardNoModifiers = (props: KeyboardProps) => {
  const { playNoteFromMidi } = useMiniKeys(samples)
  const { keyMap } = useMiniKeysKeyboard(props?.dualMode ? "dual" : "single")

  const { activeKeys } = useKeyboardControl(keyMap, playNoteFromMidi)

  return (
    <Keyboard
      {...props}
      activeKeys={activeKeys}
      keyMap={keyMap}
      onKeyClick={playNoteFromMidi}
    />
  )
}

const InteractiveSingleKeyboard = (props: KeyboardProps) => {
  const { playNoteFromMidi } = useMiniKeys(samples)
  const { keyMap, transposeDown, transposeUp, octaveDown, octaveUp } =
    useMiniKeysKeyboard(props?.dualMode ? "dual" : "single")

  const modifierKeys: ModifierKey[] = [
    {
      keyCode: "KeyZ",
      label: "octave down",
      action: () => octaveDown(),
    },
    {
      keyCode: "KeyX",
      label: "octave up",
      action: () => octaveUp(),
    },
    {
      keyCode: "KeyC",
      label: "shift down",
      action: () => transposeDown(),
    },
    {
      keyCode: "KeyV",
      label: "shift up",
      action: () => transposeUp(),
    },
  ]

  const { activeKeys } = useKeyboardControl(
    keyMap,
    playNoteFromMidi,
    modifierKeys
  )

  return (
    <Keyboard
      {...props}
      animate={false}
      activeKeys={activeKeys}
      keyMap={keyMap}
      onKeyClick={playNoteFromMidi}
      modifierKeys={modifierKeys}
    />
  )
}

const InteractiveDualKeyboard = (props: KeyboardProps) => {
  const { playNoteFromMidi, setSustain } = useMiniKeys(samples)
  const { keyMap, octaveDown, octaveUp } = useMiniKeysKeyboard(
    props?.dualMode ? "dual" : "single"
  )

  useEffect(() => {
    setSustain(true)
  }, [])

  const modifierKeys: ModifierKey[] = [
    {
      keyCode: "ShiftLeft",
      label: "octave down",
      action: () => octaveDown(),
    },
    {
      keyCode: "ShiftRight",
      label: "octave up",
      action: () => octaveUp(),
    },
  ]

  const { activeKeys } = useKeyboardControl(
    keyMap,
    playNoteFromMidi,
    modifierKeys
  )

  return (
    <Keyboard
      {...props}
      activeKeys={activeKeys}
      keyMap={keyMap}
      onKeyClick={playNoteFromMidi}
      modifierKeys={modifierKeys}
    />
  )
}

const InteractiveSingleKeyboardWithColour = (props: KeyboardProps) => {
  const [dualModeToggle, setDualModeToggle] = useState(props.dualMode)
  const [showFullKeyboardToggle, setShowFullKeyboardToggle] = useState(
    props.showFullKeyboard
  )
  const { playNoteFromMidi } = useMiniKeys(samples)
  const { keyMap, transposeDown, transposeUp, octaveDown, octaveUp } =
    useMiniKeysKeyboard(dualModeToggle ? "dual" : "single")

  useEffect(() => {
    setDualModeToggle(props.dualMode)
  }, [props.dualMode])

  useEffect(() => {
    setShowFullKeyboardToggle(props.showFullKeyboard)
  }, [props.showFullKeyboard])

  const modifierKeys: ModifierKey[] = [
    {
      keyCode: "ShiftLeft",
      label: "toggle mode",
      action: () => setDualModeToggle((prev) => !prev),
      bgColour: "rgb(206, 93, 151)",
      colour: "white",
    },
    {
      keyCode: "KeyZ",
      label: "octave down",
      action: () => octaveDown(),
      bgColour: "rgb(209, 77, 65)",
      colour: "white",
    },
    {
      keyCode: "KeyX",
      label: "octave up",
      action: () => octaveUp(),
      bgColour: "rgb(218, 112, 44)",
      colour: "white",
    },
    {
      keyCode: "KeyC",
      label: "shift down",
      action: () => transposeDown(),
      bgColour: "rgb(208, 162, 21)",
      colour: "white",
    },
    {
      keyCode: "KeyV",
      label: "shift up",
      action: () => transposeUp(),
      bgColour: "rgb(135, 154, 57)",
      colour: "white",
    },
    {
      keyCode: "ShiftRight",
      label: "full keyboard",
      action: () => setShowFullKeyboardToggle((prev) => !prev),
      bgColour: "rgb(58, 169, 159)",
      colour: "white",
    },
  ]

  const { activeKeys } = useKeyboardControl(
    keyMap,
    playNoteFromMidi,
    modifierKeys
  )

  return (
    <Keyboard
      {...props}
      dualMode={dualModeToggle}
      showFullKeyboard={showFullKeyboardToggle}
      activeKeys={activeKeys}
      keyMap={keyMap}
      onKeyClick={playNoteFromMidi}
      modifierKeys={modifierKeys}
    />
  )
}

const InteractiveSingleKeyboardWithSustain = (props: KeyboardProps) => {
  const { playNoteFromMidi, setSustain } = useMiniKeys(samples)
  const { keyMap, transposeDown, transposeUp, octaveDown, octaveUp } =
    useMiniKeysKeyboard(props?.dualMode ? "dual" : "single")

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
    modifierKeys
  )

  return (
    <Keyboard
      {...props}
      activeKeys={activeKeys}
      keyMap={keyMap}
      onKeyClick={playNoteFromMidi}
      modifierKeys={modifierKeys}
    />
  )
}

export const SingleKeyboardNoModifiers: Story = {
  args: defaultArgs,
  render: InteractiveSingleKeyboardNoModifiers,
  decorators: [
    (Story) => (
      <div style={{ margin: "1em" }}>
        <Story />
      </div>
    ),
  ],
}

export const SingleKeyboardNoAnimation: Story = {
  args: defaultArgs,
  render: InteractiveSingleKeyboard,
  decorators: [
    (Story) => (
      <div style={{ margin: "1em" }}>
        <Story />
      </div>
    ),
  ],
}

export const FullSingleKeyboardNoAnimation: Story = {
  args: { ...defaultArgs, showFullKeyboard: true },
  render: InteractiveSingleKeyboard,
  decorators: [
    (Story) => (
      <div style={{ padding: "1em" }}>
        <Story />
      </div>
    ),
  ],
}

export const DualKeyboard: Story = {
  args: { ...defaultArgs, dualMode: true },
  render: InteractiveDualKeyboard,
  decorators: [
    (Story) => (
      <div style={{ margin: "1em" }}>
        <Story />
      </div>
    ),
  ],
}

export const FullSingleKeyboardWithColour: Story = {
  args: { ...defaultArgs, showFullKeyboard: true },
  render: InteractiveSingleKeyboardWithColour,
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "1em",
          height: "100vh",
          backgroundColor: "rgb(255, 252, 240)",
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export const FullSingleKeyboardWithSustain: Story = {
  args: { ...defaultArgs, showFullKeyboard: true },
  render: InteractiveSingleKeyboardWithSustain,
  decorators: [
    (Story) => (
      <div style={{ padding: "1em" }}>
        <Story />
      </div>
    ),
  ],
}

export default {
  title: "Keyboard",
  component: Keyboard,
  argTypes: {
    onKeyClick: { control: { disable: true } },
    keyMap: { control: { disable: true } },
    activeKeys: { control: { disable: true } },
    modifierKeys: { control: { disable: true } },
  },
}
