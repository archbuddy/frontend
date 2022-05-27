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
  Text,
  Box
} from '@chakra-ui/react'
import { v4 } from 'uuid'
import srvEntities from '../services/entities'
import SearchTable from './SearchTable'

export default function AddNodeModal(props) {
  const [newNode, setNewNode] = useState(props.newNode)
  const [isNewEntity, setIsNewEntity] = useState(false)
  const [newEntityName, setNewEntityName] = useState(null)
  const [isNewEntityNameValid, setIsNewEntityNameValid] = useState(false)
  const [newEntityDescription, setNewEntityDescription] = useState(null)
  const [isNewEntityDescriptionValid, setIsNewEntityDescriptionValid] = useState(false)

  useEffect(() => {
    setNewNode(props.newNode)
    setIsNewEntity(false)
    setNewEntityName(null)
    setIsNewEntityDescriptionValid(null)
  }, [props.newNode])

  useEffect(() => {
    setIsNewEntityDescriptionValid(
      newEntityDescription != null && newEntityDescription.trim() !== ''
    )
    setIsNewEntityNameValid(newEntityName != null && newEntityName.trim() !== '')
  }, [newEntityDescription, newEntityName])

  const onNameChange = (e) => {
    setNewEntityName(e.target.value)
  }

  const onDescriptionChange = (e) => {
    setNewEntityDescription(e.target.value)
  }

  const listEntities = async (filter = '', offset = 0, limit = 10) => {
    const filterWithType =
      !filter || filter === ''
        ? `type==${newNode.type}`
        : `type==${newNode.type};name=re=('.*${filter}.*','i')`

    const result = await srvEntities.list(filterWithType, offset, limit)

    if (filter && filter !== '') {
      result.push({
        id: 'new',
        newEntityName: filter,
        name: () => <Text as="i">{filter} (New Entity)</Text>
      })
    }

    return result
  }

  const onEntitySelect = (entity) => {
    if (entity.id === 'new') {
      setIsNewEntity(true)
      setNewEntityName(entity.newEntityName)
    } else {
      newNode.data.name = entity.name
      newNode.data.description = entity.description
      newNode.data.entity = entity.id
      props.onOk(newNode)
    }
  }

  const onOk = () => {
    if (!isNewEntityNameValid || !isNewEntityDescriptionValid) return

    newNode.data.name = newEntityName
    newNode.data.description = newEntityDescription
    newNode.data.entity = {
      id: v4(),
      name: newEntityName,
      description: newEntityDescription,
      type: newNode.type
    }
    setIsNewEntity(false)
    props.onOk(newNode)
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Node</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box hidden={isNewEntity}>
            <SearchTable
              loadData={listEntities}
              columns={[{ header: 'Name', prop: 'name' }]}
              onSelect={(i) => onEntitySelect(i)}
              placeholder="Entity name"
            ></SearchTable>
          </Box>
          <Box hidden={!isNewEntity}>
            <FormControl isInvalid={!isNewEntityNameValid}>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input id="name" type="name" value={newEntityName} onChange={onNameChange} />
              {isNewEntityNameValid}
              {!isNewEntityNameValid ? (
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
                value={newEntityDescription}
                onChange={onDescriptionChange}
              />
              {isNewEntityDescriptionValid}
              {!isNewEntityDescriptionValid ? (
                <FormErrorMessage>Description is required.</FormErrorMessage>
              ) : (
                <></>
              )}
            </FormControl>
          </Box>
        </ModalBody>

        <ModalFooter hidden={!isNewEntity}>
          <Button colorScheme="blue" mr={3} onClick={onOk}>
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
