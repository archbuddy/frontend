import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react'

export default function EdgeSelectionModal(props) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edge Selection</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>body</p>
        </ModalBody>

        <ModalFooter>
          <p>footer</p>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
