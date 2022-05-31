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
  Text
} from '@chakra-ui/react'
import srvViewPoint from '../services/viewpoint'
import SearchTable from './SearchTable'

export default function OpenDiagramModal(props) {
  const onDiagramSelect = async (diagram) => {
    if (diagram.id === 'new') {
      props.onSelect(await srvViewPoint.create(diagram.newDiagramName))
    } else {
      props.onSelect(diagram.id)
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

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Open Diagram</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SearchTable
            loadData={listDiagram}
            columns={[{ header: 'Name', prop: 'name' }]}
            onSelect={(i) => onDiagramSelect(i)}
            placeholder="Diagram Name"
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
