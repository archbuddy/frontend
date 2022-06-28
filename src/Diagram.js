// check this for default edges configs https://reactflow.dev/docs/api/edges/edge-types/

import React from 'react'
import { ChakraProvider, Flex, Spacer } from '@chakra-ui/react'
import Header from './Header'
import Footer from './Footer'
import DiagramEditor from './diagram-editor'
function Flow() {
  // connectionMode loose define that handles can connect with each other
  return (
    <ChakraProvider>
      <Flex direction="column" h="100%">
        <Header />
        <Spacer>
          <DiagramEditor />
        </Spacer>
        <Footer />
      </Flex>
    </ChakraProvider>
  )
}

export default Flow
