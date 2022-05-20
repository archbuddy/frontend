import React, { useState, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'

export default function AddNodeModal(props) {
  const [newNode, setNewNode] = useState(props.newNode)

  useEffect(() => {
    setNewNode(props.newNode)
  }, [props.newNode])

  const onNameChange = (e) => {
    newNode.data.name = e.target.value
    setNewNode(newNode)
  }

  const onDescriptionChange = (e) => {
    newNode.data.description = e.target.value
    setNewNode(newNode)
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Node</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" type="name" onChange={onNameChange} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input id="description" type="description" onChange={onDescriptionChange} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              props.onOk(newNode)
            }}
          >
            Ok
          </Button>
          <Button variant="ghost" onClick={props.onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
