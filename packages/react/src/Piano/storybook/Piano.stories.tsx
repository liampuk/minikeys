import { StoryObj } from "@storybook/react/*"
import { samples } from "../../data"
import { useMiniKeys } from "../../hooks/useMiniKeys"
import { Piano, PianoProps } from "../Piano"

type Story = StoryObj<typeof Piano>

const PlayablePianoSetup = (props: PianoProps) => {
  const { playNoteFromMidi, isLoading } = useMiniKeys(samples)

  return (
    <>
      <Piano {...props} onClick={playNoteFromMidi} />
      <>
        <p>{isLoading ? "Loading samples..." : null}</p>
      </>
    </>
  )
}

export const PlayablePiano: Story = {
  args: {
    width: 1000,
    numKeys: 52,
    strokeColour: "#ccc",
    strokeWidth: 1.5,
  },
  render: PlayablePianoSetup,
  decorators: [
    (Story) => (
      <div style={{ margin: "1em" }}>
        <Story />
      </div>
    ),
  ],
}

export const SmallPlayablePiano: Story = {
  args: {
    showLabels: true,
    width: 1000,
    numKeys: 16,
    strokeColour: "#ccc",
    strokeWidth: 1.5,
  },
  render: PlayablePianoSetup,
  decorators: [
    (Story) => (
      <div style={{ margin: "1em" }}>
        <Story />
      </div>
    ),
  ],
}

export const TwentyFourKey: Story = {
  args: {
    width: 1200,
    numKeys: 24,
    showLabels: true,
    strokeColour: "#ccc",
    strokeWidth: 1.5,
    baseNote: "C3",
  },
  render: Piano,
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "1em",
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export const PianoWithRange: Story = {
  args: {
    width: 1200,
    numKeys: 52,
    strokeColour: "#ccc",
    strokeWidth: 1.5,
    highlights: {
      rangeStart: "C4",
      rangeEnd: "F5",
      rangeColor: "#eee",
    },
  },
  render: Piano,
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "1em",
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export const PianoWithRangeAndActiveNotes: Story = {
  args: {
    width: 1200,
    numKeys: 24,
    strokeColour: "#ccc",
    strokeWidth: 1.5,
    highlights: {
      rangeStart: "F4",
      rangeEnd: "F6",
      rangeColor: "#eee",
      activeNotes: ["E5", "G5", "A#5"],
    },
  },
  render: Piano,
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "1em",
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export const PianoWithNoBorder: Story = {
  args: {
    noBorder: true,
    width: 1200,
    numKeys: 24,
    strokeColour: "#ccc",
    strokeWidth: 1.5,
    highlights: {
      rangeStart: "F4",
      rangeEnd: "F6",
      rangeColor: "#eee",
      activeNotes: ["E5", "G5", "A#5"],
    },
  },
  render: Piano,
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "1em",
          backgroundColor: "#111",
          height: "100vh",
        }}
      >
        <Story />
      </div>
    ),
  ],
}

export default {
  title: "Piano",
  component: Piano,
}
