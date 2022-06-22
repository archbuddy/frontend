// check this for default edges configs https://reactflow.dev/docs/api/edges/edge-types/

import React, { useEffect } from 'react'
import { ChakraProvider, Flex, Spacer, Text, Spinner, Box } from '@chakra-ui/react'
import Header from './Header'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'
import Authentication from './services/auth'

function PageNotFound() {
  let location = useLocation()

  useEffect(() => {
    process(location.hash)
  }, [location])

  const process = async (params) => {
    const data = await Authentication.authenticate('google', params)
    console.log(data)
  }

  return (
    <ChakraProvider>
      <Flex direction="column" h="100%">
        <Header />
        <Spacer>
          <Box style={{ padding: '10px' }}>
            <Spinner color="blue.500" />
            <Text>Carregando...</Text>
          </Box>
        </Spacer>
        <Footer />
      </Flex>
    </ChakraProvider>
  )
}

export default PageNotFound
