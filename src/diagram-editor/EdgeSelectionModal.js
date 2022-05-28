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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input
} from '@chakra-ui/react'
import { FaPen as EditIcon, FaTrashAlt as TrashIcon, FaSave as SaveIcon } from 'react-icons/fa'
import { MdCancel as Cancel } from 'react-icons/md'
import srvEdges from '../services/edges'
import srvRelations from '../services/relations'
import { isUndefined, log } from '../util'

export default function EdgeSelectionModal(props) {
  const [selectedRowEdgeId, setSelectedRowEdgeId] = useState('')
  const [inputDescriptionEdge, setInputDescriptionEdge] = useState('')
  const [inputDetailEdge, setInputDetailEdge] = useState('')
  const [relationId, setRelationId] = useState('')

  const onSelectRow = (edge) => {
    log(`Selected edge ${edge.id}`)
    setSelectedRowEdgeId(edge.id)
    setInputDescriptionEdge(edge.data.description)
    setInputDetailEdge(edge.data.detail)
    setRelationId(edge.relation)
  }

  const deleteEdge = async (edge) => {
    log(`Deleting edge ${edge.id}`)
    // TODO it could receive a list of itens
    await srvEdges.deleteEdge(edge.id)
    resetSelectedData()
    await props.refresh()
  }

  const onClickSave = async () => {
    log(`Saving Relation ${relationId} with value ${inputDescriptionEdge}`)
    // TODO detail field should be checked
    await srvRelations.updateRelation({
      id: relationId,
      description: inputDescriptionEdge,
      detail: inputDetailEdge
    })
    resetSelectedData()
    await props.refresh()
  }

  const renderLine = (item) => {
    if (selectedRowEdgeId === '') {
      return [
        <Tr key={item.relation}>
          <Td>{item.data.description}</Td>
          <Td>{item.data.detail}</Td>
          <Td>
            <Button onClick={() => onSelectRow(item)}>
              <EditIcon />
            </Button>
            &nbsp;&nbsp;
            <Button onClick={() => deleteEdge(item)}>
              <TrashIcon />
            </Button>
          </Td>
        </Tr>
      ]
    }

    return [
      <Tr key={item.relation}>
        <Td>{item.data.description}</Td>
        <Td>{item.data.detail}</Td>
        <Td></Td>
      </Tr>
    ]
  }

  const renderField = (item) => {
    return [
      <Tr key={item.relation}>
        <Td>
          <Input
            type="text"
            onChange={(e) => setInputDescriptionEdge(e.target.value)}
            value={inputDescriptionEdge}
            placeholder="Inform description of the edge"
            size="sm"
            variant="outline"
            borderColor="blue.400"
          />
        </Td>
        <Td>
          <Input
            type="text"
            onChange={(e) => setInputDetailEdge(e.target.value)}
            value={inputDetailEdge}
            placeholder="Inform detail of the edge"
            size="sm"
            variant="outline"
            borderColor="blue.400"
          />
        </Td>
        <Td>
          <Button onClick={onClickSave}>
            <SaveIcon />
          </Button>
          &nbsp;&nbsp;
          <Button onClick={() => setSelectedRowEdgeId('')}>
            <Cancel />
          </Button>
        </Td>
      </Tr>
    ]
  }

  const renderDataTable = () => {
    if (isUndefined(props.edges)) {
      // TODO implement edge creation
      return <></>
    }
    return (
      <TableContainer>
        <Table colorScheme="gray" variant="striped">
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th>Detail</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {props.edges.innerList.map((item) => {
              if (item.id === selectedRowEdgeId) {
                return renderField(item)
              } else {
                return renderLine(item)
              }
            })}
          </Tbody>
        </Table>
      </TableContainer>
    )
  }
  const resetSelectedData = () => {
    setInputDetailEdge('')
    setInputDescriptionEdge('')
    setSelectedRowEdgeId('')
    setRelationId('')
  }
  const closeModal = () => {
    resetSelectedData()
    props.onClose()
  }

  return (
    <Modal isOpen={props.isOpen} onClose={closeModal} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edge(s) selected data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{renderDataTable()}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
