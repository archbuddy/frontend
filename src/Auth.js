// check this for default edges configs https://reactflow.dev/docs/api/edges/edge-types/

import React from 'react'
import { ChakraProvider, Flex, Spacer, Button, Box, Text } from '@chakra-ui/react'
import Header from './Header'
import Footer from './Footer'

import { useNavigate } from 'react-router-dom'

function Auth() {
  let navigate = useNavigate()

  const onSave = () => {
    navigate('/diagram')
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
              <Button colorScheme="blue" mr={1} onClick={onSave}>
                Login
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
