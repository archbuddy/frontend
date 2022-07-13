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
import srvEntities from '../../services/entities'
import SearchTable from '../SearchTable'
import { prepareErrorToScreen } from '../../util'

export default function AddNodeModal(props) {
  const [error, setError] = useState(undefined)

  const [newNode, setNewNode] = useState(props.newNode)
  const [isNewEntity, setIsNewEntity] = useState(false)
  const [newEntityName, setNewEntityName] = useState('')
  const [isNewEntityNameValid, setIsNewEntityNameValid] = useState(false)
  const [newEntityDescription, setNewEntityDescription] = useState('')
  const [isNewEntityDescriptionValid, setIsNewEntityDescriptionValid] = useState(false)
  const descriptionRef = React.useRef()

  useEffect(() => {
    setNewNode(props.newNode)
    setIsNewEntity(false)
    setNewEntityName('')
    setIsNewEntityDescriptionValid('')
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
    try {
      const filterWithType =
        !filter || filter === ''
          ? `type==${newNode.type}`
          : `type==${newNode.type};name=re=('.*${filter}.*','i')`

      const response = await srvEntities.list(filterWithType, offset, limit)
      const result = response.data
      if (filter && filter !== '') {
        result.push({
          id: 'new',
          newEntityName: filter,
          name: () => <Text as="i">{filter} (New Entity)</Text>
        })
      }
      setError(undefined)
      return result
    } catch (err) {
      setError(prepareErrorToScreen(err.message))
    }
    return []
  }

  const onEntitySelect = (entity) => {
    if (entity.id === 'new') {
      setIsNewEntity(true)
      setNewEntityName(entity.newEntityName)
      setNewEntityDescription('')
      descriptionRef.current.focus()
    } else {
      newNode.data.entity = {
        id: entity.id,
        name: entity.name,
        description: entity.description,
        type: entity.type
      }
      props.onOk(newNode)
    }
  }

  const onOk = async () => {
    if (!isNewEntityNameValid || !isNewEntityDescriptionValid) {
      return
    }
    try {
      const obj = await srvEntities.create({
        name: newEntityName,
        description: newEntityDescription,
        type: newNode.type
      })

      newNode.data.name = newEntityName
      newNode.data.description = newEntityDescription
      newNode.data.entity = obj.id

      setIsNewEntity(false)

      props.onOk(newNode)
    } catch (err) {
      setError(prepareErrorToScreen(err.message))
    }
  }

  const close = () => {
    setError(undefined)
    props.onClose()
  }

  const renderError = () => {
    if (error === undefined) {
      return <></>
    }
    return (
      <>
        <Box w="100%" p={2} bg="red.100" color="black" borderRadius="md">
          {error}
        </Box>
        <br />
      </>
    )
  }

  return (
    <Modal isOpen={props.isOpen} onClose={close}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Node</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {renderError()}
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
                ref={descriptionRef}
              />
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
          <Button variant="ghost" onClick={close}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
