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
  const [description, setDescription] = useState()
  const [name, setName] = useState()
  const [newNode, setNewNode] = useState(props.newNode)

  useEffect(() => {
    setNewNode(props.newNode)
  }, [props.newNode])

  useEffect(() => {
    if (!newNode?.data) return
    newNode.data.name = name
    newNode.data.description = description
    setNewNode(newNode)
  }, [props.isOpen, setName, setDescription, newNode, description, name])

  const onNameChange = (e) => {
    setName(e.target.value)
  }

  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
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
              console.log(newNode)
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
