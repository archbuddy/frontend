import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Box
} from '@chakra-ui/react'

export default function HelpViewPointModal(props) {
  const close = () => {
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Help</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box>
            <Text>help text</Text>
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button onClick={close}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
