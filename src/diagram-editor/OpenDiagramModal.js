import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  SimpleGrid
} from '@chakra-ui/react'
import srvViewPoint from '../services/viewpoint'

export default function OpenDiagramModal(props) {
  const [viewPoints, setViewPoints] = useState([])

  useEffect(() => {
    const loadViewPoints = async () => {
      setViewPoints(await srvViewPoint.list())
    }

    if (props.isOpen) {
      loadViewPoints()
    }
  }, [props.isOpen])

  const onDiagramSelect = (diagramId) => {
    props.onSelect(diagramId)
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Open Diagram</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid columns={2} spacing={10}>
            {viewPoints.map((v) => {
              return (
                <Button key={v.id} onClick={() => onDiagramSelect(v.id)} fontSize="sm">
                  {v.name}
                </Button>
              )
            })}
          </SimpleGrid>
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
