import { Box, useColorModeValue, Flex, Button, Image, Text } from '@chakra-ui/react'
import { AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '../../AuthContext'

function Header() {
  const { authed, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const isAuthPage = () => {
    return location.pathname.indexOf('/auth') === 0
  }

  const doLogin = () => {
    navigate('/auth')
  }

  const doLogout = () => {
    logout()
  }

  const loginButton = () => {
    if (isAuthPage()) {
      return <></>
    }
    if (!authed) {
      return (
        <Button onClick={doLogin}>
          <AiOutlineLogin size="25" title="Login" color="blue" />
        </Button>
      )
    }
    return <></>
  }

  const logoutButton = () => {
    if (isAuthPage()) {
      return <></>
    }
    if (authed) {
      return (
        <Button onClick={doLogout}>
          <AiOutlineLogout size="25" title="Logout" color="blue" />
        </Button>
      )
    }
    return <></>
  }

  return (
    <Flex
      direction="row"
      style={{
        borderBottom: '0.5px solid lightGrey'
      }}
    >
      <Box
        fontWeight="semibold"
        as="h4"
        lineHeight="tight"
        isTruncated
        p={3}
        display="flex"
        style={{
          alignItems: 'center'
        }}
      >
        <Image src="/assets/logofull.png" alt="Logo" boxSize="40px" objectFit="cover" />
        <Text>Arch Buddy</Text>
      </Box>
      <Box
        flex="1"
        style={{
          alignSelf: 'center',
          textAlign: '-webkit-right',
          paddingRight: '25px'
        }}
      >
        {loginButton()}
        {logoutButton()}
      </Box>
    </Flex>
  )
}

export default Header
