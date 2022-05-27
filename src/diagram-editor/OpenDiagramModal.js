import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button
} from '@chakra-ui/react'
import srvViewPoint from '../services/viewpoint'
import SearchTable from './SearchTable'

export default function OpenDiagramModal(props) {
  const onDiagramSelect = (diagramId) => {
    props.onSelect(diagramId)
    props.onClose()
  }

  const listDiagram = (filter = '', offset = 0, limit = 10) => {
    if (!filter || filter === '') {
      return srvViewPoint.list(null, offset, limit)
    }

    return srvViewPoint.list(`name=re=('.*${filter}.*','i')`, offset, limit)
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
            onSelect={(i) => onDiagramSelect(i.id)}
            placeholder="Diagram Name"
          ></SearchTable>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={createNewViewPoint}>
            Create diagram
          </Button>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
