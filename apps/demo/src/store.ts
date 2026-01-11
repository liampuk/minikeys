import { NoteName } from "minikeys";
import { create } from "zustand"


type MiniKeysStore = {
  noteRange: { low: NoteName; high: NoteName } | undefined
  activeNotes: (NoteName | undefined)[]
  setNoteRange: (range: { low: NoteName; high: NoteName }) => void
  setActiveNotes: (notes?: (NoteName | undefined)[]) => void
}

export const useNotes = create<MiniKeysStore>((set) => ({
  noteRange: undefined,
  activeNotes: [],
  setNoteRange: (range: { low: NoteName; high: NoteName }) =>
    set({ noteRange: range }),
  setActiveNotes: (notes?: (NoteName | undefined)[]) =>
    set({ activeNotes: notes }),
}))
