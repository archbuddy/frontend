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
  FormErrorMessage,
  Input,
  Box
} from '@chakra-ui/react'
import { isUndefined } from '../../util'
import srvEntities from '../../services/entities'

export default function ChangeNodeModal(props) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (!isUndefined(props.node)) {
      setName(props.node.data.name)
      setDescription(props.node.data.description)
    }
  }, [props.node])

  const isNewEntityNameValid = () => {
    return true
  }
  const isNewEntityDescriptionValid = () => {
    return true
  }
  const onSave = async () => {
    // TODO implement
    const newNode = props.node
    newNode.data.name = name
    newNode.data.description = description
    newNode.data.type = props.node.type
    await srvEntities.update(newNode.data)
    await props.refresh()
    await props.onClose()
  }
  const getNodeType = (value) => {
    if (isUndefined(value)) {
      return ''
    }
    const txt = value.type
    return txt.charAt(0).toUpperCase() + txt.substring(1)
  }
  const onRemove = () => {
    props.onRemoveNodeFromView(props.node.id)
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Node - {getNodeType(props.node)}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box w="100%" p={2} bg="yellow.100" color="black" borderRadius="md">
            Reminder: When changing this information you will change for all the database
          </Box>
          <br />
          <FormControl isInvalid={!isNewEntityNameValid()}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input id="name" type="name" value={name} onChange={(e) => setName(e.target.value)} />
            {!isNewEntityNameValid() ? (
              <FormErrorMessage>Name is required.</FormErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>
          <FormControl isInvalid={!isNewEntityDescriptionValid}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input
              id="description"
              type="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {!isNewEntityDescriptionValid ? (
              <FormErrorMessage>Description is required.</FormErrorMessage>
            ) : (
              <></>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={props.onClose}>
            Cancel
          </Button>
          <Button colorScheme="gray" onClick={onRemove}>
            Delete from current view
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
