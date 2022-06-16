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
  Box,
  Flex
} from '@chakra-ui/react'
import srvViewPoint from '../../services/viewpoint'
import SearchTable from '../SearchTable'
import { isUndefined } from '../../util'

export default function OpenDiagramModal(props) {
  const onDiagramSelect = async (diagram) => {
    if (diagram.id === 'new') {
      const data = await srvViewPoint.create(diagram.newDiagramName)
      props.onSelect(data)
    } else {
      props.onSelect(diagram)
    }
    props.onClose()
  }

  const listDiagram = async (filter = '', offset = 0, limit = 10) => {
    if (!filter || filter === '') {
      return await srvViewPoint.list(null, offset, limit)
    } else {
      return (await srvViewPoint.list(`name=re=('.*${filter}.*','i')`, offset, limit)).concat({
        id: 'new',
        newDiagramName: filter,
        name: () => <Text as="i">{filter} (New Diagram)</Text>
      })
    }
  }
  const currentView = () => {
    const value = props.diagramSelected
    if (!isUndefined(value)) {
      return value.name
    }
    return undefined
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Open Diagram</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
