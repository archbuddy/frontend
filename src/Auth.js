// check this for default edges configs https://reactflow.dev/docs/api/edges/edge-types/

import React from 'react'
import { ChakraProvider, Flex, Spacer, Button, Box, Text } from '@chakra-ui/react'
import Header from './Header'
import Footer from './Footer'

import { useNavigate } from 'react-router-dom'

import auth from './services/auth'
import { log } from './util'

function Auth() {
  let navigate = useNavigate()

  const onClick = () => {
    navigate('/diagram')
  }

  /*
   * Create form to request access token from Google's OAuth 2.0 server.
   */
  async function oauthSignIn() {
    // TODO change later to understand what others options we have
    const data = (await auth.providers())[0]
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

  return (
    <ChakraProvider>
      <Flex direction="column" h="100%">
        <Header />
        <Spacer>
          <Box
            style={{
              paddingBottom: '10px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '25px'
            }}
          >
            <Box
              style={{
                backgroundColor: '#fcfcfc',
                width: '50%',
                border: '0px',
                borderRadius: '10px',
                padding: '15px'
              }}
            >
              <Text>Authentication page</Text>
              <Button colorScheme="blue" mr={1} onClick={oauthSignIn}>
                Login With Google
              </Button>
              <Button colorScheme="red" mr={1} onClick={onClick}>
                By pass Login
              </Button>
            </Box>
          </Box>
        </Spacer>
        <Footer />
      </Flex>
    </ChakraProvider>
  )
}

export default Auth
