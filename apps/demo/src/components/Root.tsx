import { useMiniKeys } from "@minikeys/react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { samples } from "../data"
import { KeyboardWrapper } from "./KeyboardWrapper"
import { Loading } from "./Loading"
import { PianoWrapper } from "./PianoWrapper"

export const Root = () => {
  const [isFontLoading, setIsFontLoading] = useState(true)
  const {
    playNoteFromMidi,
    liftNoteFromMidi,
    setSustain,
    isLoading,
    progress,
  } = useMiniKeys(samples)

  useEffect(() => {
    document.fonts.load("12px Vollkorn").then(() => {
      setIsFontLoading(false)
    })
  }, [])

  if (isFontLoading) {
    return null
  }

  return (
    <Container>
      <Block>
        <Title>MiniKeys</Title>
        <SubTitle>
          A tiny Javascript Library that plays the piano - see more on{" "}
          <Link href="https://github.com/liampuk/minikeys" target="_blank">
            github
          </Link>
        </SubTitle>
      </Block>
      {isLoading ? (
        <Loading progress={progress} />
      ) : (
        <MiniKeysBlock $gap="8vh">
          <PianoWrapper
            playNoteFromMidi={playNoteFromMidi}
            liftNoteFromMidi={liftNoteFromMidi}
          />
          <KeyboardWrapper
            playNoteFromMidi={playNoteFromMidi}
            liftNoteFromMidi={liftNoteFromMidi}
            setSustain={setSustain}
          />
        </MiniKeysBlock>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  flex-direction: column;
  padding-top: 5vh;
  padding-bottom: 5vh;
`

const Title = styled.h1`
  font-family: "Vollkorn", serif;
  font-weight: normal;
  font-size: 4em;
  margin: 0;
  user-select: none;
`

const SubTitle = styled.h2`
  font-family: "Vollkorn", serif;
  font-weight: normal;
  font-size: 1em;
  margin: 0;
  user-select: none;
`

const Block = styled.div<{ $gap?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $gap }) => $gap || "0"};
`

const MiniKeysBlock = styled(Block)`
  margin-top: 5vh;
`

const Link = styled.a`
  color: black;
  text-decoration: underline;
`
