// check this for default edges configs https://reactflow.dev/docs/api/edges/edge-types/

import React from 'react'
import { ChakraProvider, Flex, Spacer, Text } from '@chakra-ui/react'
import Header from './Header'
import Footer from './Footer'

function PageNotFound() {
  return (
    <ChakraProvider>
      <Flex direction="column" h="100%">
        <Header />
        <Spacer>
          <Text>Page Not Found</Text>
        </Spacer>
        <Footer />
      </Flex>
    </ChakraProvider>
  )
}

export default PageNotFound
