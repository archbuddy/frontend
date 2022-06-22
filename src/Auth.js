// check this for default edges configs https://reactflow.dev/docs/api/edges/edge-types/

import React from 'react'
import { ChakraProvider, Flex, Spacer, Button, Box, Text } from '@chakra-ui/react'
import Header from './Header'
import Footer from './Footer'

import { useNavigate } from 'react-router-dom'

function Auth() {
  let navigate = useNavigate()

  const onClick = () => {
    navigate('/diagram')
  }

  /*
   * Create form to request access token from Google's OAuth 2.0 server.
   */
  function oauthSignIn() {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth'

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form')
    form.setAttribute('method', 'GET') // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint)

    // Parameters to pass to OAuth 2.0 endpoint.
    // https://developers.google.com/people/v1/how-tos/authorizing#email
    var params = {
      client_id: '407853460821-co2oqe6ph6k0pcc4h4nae31cb1vvi5bb.apps.googleusercontent.com',
      redirect_uri: 'http://localhost:3001/authenticate',
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
