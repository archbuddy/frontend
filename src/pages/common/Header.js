import { Box, Flex, Button, Image, Text, useDisclosure } from '@chakra-ui/react'
import { AiOutlineLogout, AiOutlineLogin, AiOutlineQuestionCircle } from 'react-icons/ai'
import { useLocation, useNavigate } from 'react-router-dom'
import HelpViewPointModal from '../help/HelpViewPointModal'
import useAuth from '../../AuthContext'

function Header() {
  const { authed, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const {
    isOpen: isHelpViewPointModalOpen,
    onOpen: onHelpViewPointModalOpen,
    onClose: onHelpViewPointModalClose
  } = useDisclosure()

  const isAuthPage = () => {
    return location.pathname.indexOf('/auth') === 0
  }

  const isDiagramPage = () => {
    return location.pathname.indexOf('/diagram') === 0
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

  const helpButton = () => {
    if (!isDiagramPage()) {
      return <></>
    }
    return (
      <>
        <Button onClick={onHelpViewPointModalOpen}>
          <AiOutlineQuestionCircle size="25" title="Help" color="blue" />
        </Button>
        &nbsp;
      </>
    )
  }

  return (
    <Flex
      direction="row"
      style={{
        borderBottom: '0.5px solid lightGrey'
      }}
    >
      <HelpViewPointModal isOpen={isHelpViewPointModalOpen} onClose={onHelpViewPointModalClose} />
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
          paddingRight: '25px',
          justifyContent: 'space-between'
        }}
      >
        {helpButton()}
        {loginButton()}
        {logoutButton()}
      </Box>
    </Flex>
  )
}

export default Header
