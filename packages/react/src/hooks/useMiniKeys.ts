import { MiniKeys, Sample } from "minikeys"
import { useEffect, useRef, useState } from "react"

export const useMiniKeys = (samples: Sample[]) => {
  const minikeysRef = useRef<MiniKeys | null>(null)
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [sustain, setSustain] = useState(false)

  useEffect(() => {
    if (!minikeysRef.current) {
      minikeysRef.current = new MiniKeys()
    }

    return () => {
      minikeysRef.current = null
    }
  }, [])

  const setMiniKeysSustain = (sustain: boolean) => {
    if (minikeysRef.current) {
      minikeysRef.current.setSustain(sustain)
      setSustain(sustain)
    }
  }

  useEffect(() => {
    if (minikeysRef.current) {
      setIsLoading(true)
      minikeysRef.current
        .loadNotes(samples, setProgress)
        .then(() => {
          setIsLoading(false)
          setIsSuccess(true)
        })
        .catch(() => {
          setIsLoading(false)
          setIsError(true)
        })
    }
  }, [samples])

  return {
    playNoteFromName: minikeysRef.current
      ? minikeysRef.current.playNoteFromName
      : undefined,
    playNoteFromMidi: minikeysRef.current
      ? minikeysRef.current.playNoteFromMidi
      : undefined,
    setSustain: setMiniKeysSustain,
    sustain,
    isLoading,
    isSuccess,
    isError,
    progress,
  }
}
