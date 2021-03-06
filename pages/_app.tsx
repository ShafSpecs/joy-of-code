import { ReactNode } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { ChakraProvider, useColorMode } from '@chakra-ui/react'
import { Global, css } from '@emotion/react'
import { MDXProvider } from '@mdx-js/react'

import { MDXComponents } from '@/components/ui'
import { selectionBg, selectionText } from '@/styles/colors'
import { prismDarkTheme, prismLightTheme } from '@/styles/prism'
import chakraTheme from '@/styles/theme'

// hide Chakra UI outline borders around clickable components
import 'focus-visible/dist/focus-visible'

interface GlobalStyleProps {
  children: ReactNode
}

function GlobalStyle({ children }: GlobalStyleProps) {
  const { colorMode } = useColorMode()

  return (
    <>
      <Global
        styles={css`
          ${colorMode === 'dark' ? prismDarkTheme : prismLightTheme};

          ::selection {
            background-color: ${selectionBg[colorMode]};
            color: ${selectionText[colorMode]};
          }

          body {
            overflow-x: hidden;
          }
        `}
      />
      {children}
    </>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={chakraTheme}>
      <MDXProvider components={MDXComponents}>
        <GlobalStyle>
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Component {...pageProps} />
        </GlobalStyle>
      </MDXProvider>
    </ChakraProvider>
  )
}
