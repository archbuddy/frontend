// check this for default edges configs https://reactflow.dev/docs/api/edges/edge-types/

import React, { useEffect } from 'react'
import { ChakraProvider, Flex, Spacer, Text, Spinner, Box } from '@chakra-ui/react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Authentication from './services/auth'

function PageNotFound() {
  let navigate = useNavigate()

  let location = useLocation()
  // eslint-disable-next-line no-unused-vars
  let [search, setSearch] = useSearchParams()

  useEffect(() => {
    process(search.get('type'), location.hash)
  }, [search, location])

  const process = async (type, params) => {
    const data = await Authentication.authenticate(type, params)
    localStorage.setItem('jwt', data.token)
    navigate('/diagram')
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
