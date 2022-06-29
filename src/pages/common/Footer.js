import { Box, useColorModeValue } from '@chakra-ui/react'

function Footer() {
  return (
    <Box
      fontSize={'small'}
      fontWeight="semibold"
      color="gray.500"
      lineHeight="tight"
      isTruncated
      p={2}
      borderTop={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
    >
      All rights reserved to Arch Buddy and team.{' '}
      <a href="https://github.com/archbuddy" target="_blank" rel="noreferrer">
        https://github.com/archbuddy
      </a>
    </Box>
  )
}

export default Footer
