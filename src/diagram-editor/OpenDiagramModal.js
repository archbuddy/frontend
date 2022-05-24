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
  Select
} from '@chakra-ui/react'
import srvViewPoint from '../services/viewpoint'

export default function OpenDiagramModal(props) {
  const [viewPoints, setViewPoints] = useState([])
  // const [value, setValue] = React.useState('')
  // const handleChange = (event) => setValue(event.target.value)

  useEffect(() => {
    const loadViewPoints = async () => {
      setViewPoints(await srvViewPoint.list())
    }

    if (props.isOpen) {
      loadViewPoints()
    }
  }, [props.isOpen])

  const viewPointOnChange = (event) => {
    props.onSelect(event.target.value)
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Open Diagram</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select placeholder="Select option" onChange={viewPointOnChange}>
            {viewPoints.map((v) => {
              return (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              )
            })}
          </Select>
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
