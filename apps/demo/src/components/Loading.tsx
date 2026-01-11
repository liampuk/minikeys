import styled from "styled-components"

type Props = {
  progress: number
}

export const Loading = ({ progress }: Props) => {
  return (
    <Container>
      <LoadingBar>
        <Progress $progress={progress} />
      </LoadingBar>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const LoadingBar = styled.div`
  width: 30vw;
  height: 0.5vw;
  background-color: #f0f0f0;
  border-radius: 0.25vw;
  overflow: hidden;
`

const Progress = styled.div<{ $progress: number }>`
  height: 100%;
  background-color: #111;
  width: ${({ $progress }) => $progress * 100}%;
`
