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
  List,
  ListItem,
  ListIcon
} from '@chakra-ui/react'
import { AiFillFolderOpen } from 'react-icons/ai'
import { MdCheckCircle } from 'react-icons/md'

export default function HelpViewPointModal(props) {
  const close = () => {
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={close} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Help</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <List>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="blue.500" />
              To create or select a View Point click on <AiFillFolderOpen />
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="blue.500" />
              To add new object to the view point just select on the left and drag to the center of
              the canvas
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="blue.500" />
              To edit a already in object double click on it. You will be able to change some
              attributes and remove it from this view point
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="blue.500" />
              To connect to objects just point your mouse to the little grey dots on the object and
              the mouse wil turn in a plus sign, after that click and drag to the other point where
              you want to connect
            </ListItem>
            <ListItem>
              <ListIcon as={MdCheckCircle} color="blue.500" />
              After connecting to objects a line is displayed you can click and edit the
              information, to create new connections just repeat the connection process
            </ListItem>
          </List>
        </ModalBody>
        <ModalFooter>
          <Button onClick={close}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
