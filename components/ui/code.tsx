import { ReactNode, useRef, useState } from 'react'
import { Button, Box, Code, useColorMode } from '@chakra-ui/react'
import Confetti from 'react-dom-confetti'

import { bgColor, inlineCodeBg, inlineCodeText } from '@/styles/colors'

interface Props {
  children: ReactNode
}

export function InlineCode(props: Props) {
  const { colorMode } = useColorMode()

  return (
    <Code
      d="inline"
      py="0.1rem"
      bg={inlineCodeBg[colorMode]}
      color={inlineCodeText[colorMode]}
      fontSize="inherit"
      {...props}
    />
  )
}

export function Pre({ children }: Props) {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  const preEl = useRef<HTMLInputElement>(null)
  const { colorMode } = useColorMode()

  const config = {
    duration: 2000,
    angle: 90,
    spread: 360,
    stagger: 3,
    elementCount: 70,
    startVelocity: 40,
    dragFriction: 0.12,
    perspective: '500px',
  }

  function copyToClipboard() {
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)

    try {
      const textareaEl = document.createElement('textarea')

      if (preEl && preEl.current) {
        textareaEl.value = preEl.current.innerText
      }

      // remove from the document flow
      textareaEl.style.position = 'absolute'
      textareaEl.style.visibility = 'none'
      document.body.appendChild(textareaEl)

      // select and copy
      textareaEl.select()
      document.execCommand('copy')

      // cleanup
      document.body.removeChild(textareaEl)
    } catch (error) {
      console.error('💩 Copying failed!', error)
    }
  }

  return (
    <Box pos="relative" mb={8}>
      <Box pos="absolute" top={8} right={4}>
        <Box pos="absolute" right="10">
          <Confetti active={isCopied} config={config} />
        </Box>
        <Button userSelect="none" onClick={copyToClipboard}>
          {isCopied ? '🎉 Copied!' : '📋 Copy'}
        </Button>
      </Box>

      <Box
        ref={preEl}
        as="pre"
        bg={bgColor[colorMode]}
        fontSize={[16, 18, 20]}
        p={4}
        pt={8}
        overflow="auto"
        boxShadow="lg"
        rounded="base"
      >
        {children}
      </Box>
    </Box>
  )
}

export function CodeTitle(props: Props) {
  return <Box fontSize={[16, 16, 18]} {...props} />
}
