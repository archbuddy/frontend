// check this for default edges configs https://reactflow.dev/docs/api/edges/edge-types/

import React, { useEffect, useState } from 'react'
import { ChakraProvider, Flex, Spacer, Text, Spinner, Box } from '@chakra-ui/react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Authentication from './services/auth'
import { log } from './util'

function PageNotFound() {
  // eslint-disable-next-line no-unused-vars
  let navigate = useNavigate()
  const [hasJwt, setHasJwt] = useState(false)

  let location = useLocation()
  // eslint-disable-next-line no-unused-vars
  let [search, setSearch] = useSearchParams()

  useEffect(() => {
    process(search.get('type'), location.hash)
  }, [search, location])

  const process = async (type, params) => {
    const data = await Authentication.authenticate(type, params)
    log('setting jwt token')
    localStorage.setItem('jwt', data.token)
    log('ready to navigate authenticated, redirect')
    setHasJwt(true)
  }

  return (
    <ChakraProvider>
      <Flex direction="column" h="100%">
        <Header />
        <Spacer>
          <Box style={{ padding: '10px' }}>
            <Spinner color="blue.500" />
            <Text>Carregando...</Text>
            {hasJwt ? navigate('/diagram', { replace: true }) : <></>}
          </Box>
        </Spacer>
        <Footer />
      </Flex>
    </ChakraProvider>
  )
}

export default PageNotFound
