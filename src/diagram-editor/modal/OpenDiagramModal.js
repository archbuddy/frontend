import React, { useState } from 'react'
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
  Box,
  Flex
} from '@chakra-ui/react'
import srvViewPoint from '../../services/viewpoint'
import SearchTable from '../SearchTable'
import { isUndefined, prepareErrorToScreen } from '../../util'

export default function OpenDiagramModal(props) {
  const [error, setError] = useState(undefined)

  const close = () => {
    setError(undefined)
    props.onClose()
  }

  const onDiagramSelect = async (diagram) => {
    if (diagram.id === 'new') {
      try {
        const data = await srvViewPoint.create(diagram.newDiagramName)
        props.onSelect(data)
        close()
      } catch (err) {
        setError(err.message)
      }
    } else {
      props.onSelect(diagram)
      close()
    }
  }

  const listDiagram = async (filter = '', offset = 0, limit = 10) => {
    let result = []
    try {
      if (!filter || filter === '') {
        result = await srvViewPoint.list(null, offset, limit)
      } else {
        result = (await srvViewPoint.list(`name=re=('.*${filter}.*','i')`, offset, limit)).concat({
          id: 'new',
          newDiagramName: filter,
          name: () => <Text as="i">{filter} (New Diagram)</Text>
        })
      }
      setError(undefined)
    } catch (err) {
      setError(prepareErrorToScreen(err.message))
    }
    return result
  }
  const currentView = () => {
    const value = props.diagramSelected
    if (!isUndefined(value)) {
      return value.name
    }
    return undefined
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
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Open Diagram</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {renderError()}
          <Box
            w="100%"
            p={2}
            color="black"
            hidden={currentView() === undefined}
            bg="gray.200"
            borderRadius="md"
          >
            <Flex>
              <Text fontSize="sm" as="i">
                Current diagram:
              </Text>
              <Text fontSize="sm" as="i">
                {currentView()}
              </Text>
            </Flex>
          </Box>
          <br />
          <SearchTable
            loadData={listDiagram}
            columns={[{ header: 'Name', prop: 'name' }]}
            onSelect={(i) => onDiagramSelect(i)}
            placeholder="Diagram Name (type to create a new one)"
          ></SearchTable>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
