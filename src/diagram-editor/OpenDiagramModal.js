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
  Select,
  Text,
  Input
} from '@chakra-ui/react'
import srvViewPoint from '../services/viewpoint'

export default function OpenDiagramModal(props) {
  const [viewPoints, setViewPoints] = useState([])
  const [value, setValue] = React.useState('')
  const handleChange = (event) => setValue(event.target.value)
  const loadViewPoints = async () => {
    setViewPoints(await srvViewPoint.list())
  }
  useEffect(() => {
    if (props.isOpen) {
      loadViewPoints()
    }
  }, [props.isOpen])

  const viewPointOnChange = (event) => {
    props.onSelect(event.target.value)
    props.onClose()
  }

  const createNewViewPoint = async () => {
    await srvViewPoint.create(value)
    setValue('')
    await loadViewPoints()
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
          <br />
          <Text>Or create a new diagram:</Text>
          <Input value={value} onChange={handleChange}></Input>
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
