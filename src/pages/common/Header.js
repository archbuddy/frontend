import { Box, useColorModeValue } from '@chakra-ui/react'

function Header() {
  return (
    <Box
      fontWeight="semibold"
      as="h4"
      lineHeight="tight"
      isTruncated
      p={3}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
    >
      Arch Buddy
    </Box>
  )
}

export default Header
