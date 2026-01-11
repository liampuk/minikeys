import type { Preview } from "@storybook/react"
import { useEffect } from "react"
import { createGlobalStyle } from "styled-components"

const preview: Preview = {
  decorators: [
    (Story) => {
      useEffect(() => {
        const handler = (event: KeyboardEvent) => event.stopPropagation()
        window.addEventListener("keydown", handler, true)
        return () => {
          window.removeEventListener("keydown", handler, true)
        }
      }, [])

      return (
        <>
          <GlobalStyle />
          <Story />
        </>
      )
    },
  ],
}

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0!important;
  }
`

export default preview
