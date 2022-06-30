// check this for default edges configs https://reactflow.dev/docs/api/edges/edge-types/

import React, { useEffect, useState } from 'react'
import { ChakraProvider, Flex, Spacer, Button, Box, Text, Spinner } from '@chakra-ui/react'
import Header from './common/Header'
import Footer from './common/Footer'

import auth from '../services/auth'
import { log } from '../util'

function Auth() {
  const [loaded, setLoaded] = useState(false)
  const [providers, setProviders] = useState([])

  useEffect(() => {
    async function load() {
      const data = await auth.providers()
      setProviders(data)
      setLoaded(true)
    }
    load()
  }, [])

  /*
   * Create form to request access token from Google's OAuth 2.0 server.
   */
  async function googleOauthSignIn() {
    const index = providers.findIndex((element) => element.providerId === 'google')
    const data = providers[index]
    log(data)
    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form')
    form.setAttribute('method', 'GET') // Send as a GET request.
    form.setAttribute('action', data.config.endpoint)

    // Parameters to pass to OAuth 2.0 endpoint.
    // https://developers.google.com/people/v1/how-tos/authorizing#email
    var params = {
      client_id: data.config.id,
      redirect_uri: data.config.redirectUrl,
      response_type: 'token',
      scope: 'openid email profile',
      include_granted_scopes: 'true',
      state: ''
    }

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input')
      input.setAttribute('type', 'hidden')
      input.setAttribute('name', p)
      input.setAttribute('value', params[p])
      form.appendChild(input)
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form)
    form.submit()
  }

  function getGoogle() {
    if (!loaded) {
      return <></>
    }
    const index = providers.findIndex((element) => element.providerId === 'google')
    if (index === -1) {
      return <></>
    }
    return (
      <Button colorScheme="blue" mr={1} onClick={googleOauthSignIn}>
        Login with Google
      </Button>
    )
  }

  return (
    <ChakraProvider>
      <Flex direction="column" h="100%">
        <Header />
        <Spacer
          style={{
            paddingBottom: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '25px',
            justifyContent: 'center'
          }}
        >
          <Box
            style={{
              backgroundColor: '#fcfcfc',
              width: '75%',
              border: '0px',
              borderRadius: '10px',
              padding: '15px',
              height: '80%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly'
            }}
          >
            <Text>Use one of the options bellow to authenticate</Text>
            {getGoogle()}
            {!loaded ? <Spinner color="blue.500" /> : <></>}
          </Box>
        </Spacer>
        <Footer />
      </Flex>
    </ChakraProvider>
  )
}

export default Auth
