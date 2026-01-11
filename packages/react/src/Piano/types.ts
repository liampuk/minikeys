import { NoteName } from "minikeys"

export type Highlights = {
  rangeStart?: NoteName
  rangeEnd?: NoteName
  rangeColor?: string
  activeNotes?: NoteName[]
}

export type ActiveKey = { keyCode: string; note?: NoteName }