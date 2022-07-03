import React from 'react'
import { ChakraProvider, Flex, Spacer, Box, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import Header from './common/Header'
import Footer from './common/Footer'

function Home() {
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
              justifyContent: 'space-evenly',
              alignItems: 'center'
            }}
          >
            <Text>
              Welcome to Arch Buddy, this is a open source software and you can check the
              documentation in the following link
              <a href="https://archbuddy.github.io/documentation/" target="_blank" rel="noreferrer">
                https://archbuddy.github.io/documentation/
              </a>
            </Text>
            <Link to="/auth">Click here to login</Link>
          </Box>
        </Spacer>
        <Footer />
      </Flex>
    </ChakraProvider>
  )
}

export default Home
