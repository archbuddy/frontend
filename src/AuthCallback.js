// check this for default edges configs https://reactflow.dev/docs/api/edges/edge-types/

import React, { useEffect } from 'react'
import { ChakraProvider, Flex, Spacer, Text, Spinner, Box } from '@chakra-ui/react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import srvAuth from './services/auth'
import { log } from './util'
import useAuth from './AuthContext'

function AuthCallback() {
  let location = useLocation()
  let navigate = useNavigate()
  const { login } = useAuth()
  // eslint-disable-next-line no-unused-vars
  let [search, setSearch] = useSearchParams()

  useEffect(() => {
    async function load() {
      const data = await srvAuth.authenticate(search.get('type'), location.hash)
      log('setting jwt token' + data.token)
      log('ready to navigate authenticated, redirect')
      login(data.token).then(() => {
        navigate('/diagram')
      })
    }
    load()
  }, [location.hash, login, navigate, search])

  return (
    <ChakraProvider>
      <Flex direction="column" h="100%">
        <Header />
        <Spacer>
          <Box style={{ padding: '10px' }}>
            <Spinner color="blue.500" />
            <Text>Loading...</Text>
          </Box>
        </Spacer>
        <Footer />
      </Flex>
    </ChakraProvider>
  )
}

export default AuthCallback
