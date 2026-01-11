import styled from "styled-components"

type Props = {
  width: number
  height: number
  offset: number
  fill?: string
  strokeWidth: number
  strokeColour?: string
  noBorder?: boolean
  type: "black" | "white"
}

export const PianoKeyRect = ({
  width,
  height,
  offset,
  fill,
  strokeWidth,
  strokeColour,
  noBorder,
  type,
}: Props) => {
  const curve = height * 0.025
  return (
    <Path
      $type={type}
      d={`
    M${width + (noBorder ? offset - strokeWidth : offset)} ${
        type === "white" ? (noBorder ? 0 : strokeWidth / 2) : 0
      },
    L${width + (noBorder ? offset - strokeWidth : offset)} ${
        height - curve - strokeWidth / 2
      },
    q0,${curve} -${curve},${curve},
    L${offset + curve + strokeWidth / 2} ${height - strokeWidth / 2},
    q-${curve},0 -${curve},-${curve},
    L${offset + strokeWidth / 2} ${
        type === "white" ? (noBorder ? 0 : strokeWidth / 2) : 0
      },
    Z
    `}
      fill={fill ?? (type === "white" ? "white" : "#222")}
      stroke={
        noBorder ? "none" : type === "white" ? strokeColour ?? "black" : "none"
      }
      strokeWidth={strokeWidth}
    />
  )
}

const Path = styled.path<{ $type: "black" | "white" }>`
  cursor: pointer;

  &:hover {
    fill: ${({ $type }) => ($type === "white" ? "#ddd" : "black")};
  }

  &:active {
    fill: ${({ $type }) => ($type === "white" ? "#ccc" : "#444")};
  }
`
