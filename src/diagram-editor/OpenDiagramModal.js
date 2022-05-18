import React, { useEffect, useState } from 'react'
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

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{viewPoints.map((v) => v.name)}</ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
