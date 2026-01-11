import styled, { css } from "styled-components"

type Props = {
  state: "active" | "inactive"
}

export const Indicator = ({ state }: Props) => {
  return <ColourIndicator $state={state} />
}

const ColourIndicator = styled.div<{ $state: string }>`
  position: absolute;
  right: calc(var(--height) * 0.23);
  top: calc(var(--height) * 0.23);
  width: calc(round(var(--height) * 0.06, 1px));
  height: calc(round(var(--height) * 0.06, 1px));
  border-radius: 50%;
  background-color: #ccc;
  transition: all 0.3s ease;

  ${({ $state }) =>
    $state === "active" &&
    css`
      background-color: #8eff00;
      box-shadow: 0px 0px calc(var(--height) * 0.08) calc(var(--height) * 0.04)
        rgba(0, 255, 0, 0.9);
      transform: translateY(calc(var(--height) * 0.03));
    `}
`

const Container = styled.div<{ $active: boolean }>`
  width: calc(round(var(--height) * 0.06, 1px));
  height: calc(round(var(--height) * 0.06, 1px));
  border-radius: calc(round(var(--height) * 0.03, 1px));
  position: absolute;
  right: calc(var(--height) * 0.23);
  top: calc(var(--height) * 0.23);
  transition: all 0.3s ease;

  ${({ $active }) =>
    $active &&
    css`
      transform: translateY(calc(var(--height) * 0.03));
    `}
`
