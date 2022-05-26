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
  TableContainer
} from '@chakra-ui/react'
import { FaPen as EditIcon, FaTrashAlt as TrashIcon, FaSave as SaveIcon } from 'react-icons/fa'
import { MdCancel as Cancel } from 'react-icons/md'

export default function EdgeSelectionModal(props) {
  const [selectedRowEdgeId, setSelectedRowEdgeId] = useState('')
  const [inputDescriptionEdge, setInputDescriptionEdge] = useState('')
  const [inputDetailEdge, setInputDetailEdge] = useState('')

  const onSelectRow = (edge) => {
    setSelectedRowEdgeId(edge.relation)
    setInputDescriptionEdge(edge.data.description)
    setInputDetailEdge(edge.data.detail)
  }

  const deleteEdge = async (edgeId) => {
    console.log(edgeId)
    // TODO it could receive a list of itens
    // await srvEdges.deleteEdge(edgeId)
    // callback(true)
  }

  const onClickSave = async () => {
    console.loglog(`Saving edge ${selectedRowEdgeId} with value ${inputDescriptionEdge}`)
    // TODO detail field should be checked
    /*
    await srvRelations.updateRelation({
      id: selectedRowEdgeId,
      description: inputEdge,
      detail: ''
    })
    callback(true)
    */
  }

  const renderLine = (item) => {
    if (selectedRowEdgeId === '') {
      return [
        <Tr key={item.relation}>
          <Td>{item.data.description}</Td>
          <Td>{item.data.detail}</Td>
          <Td>
            <button onClick={() => onSelectRow(item)}>
              <EditIcon />
            </button>
            <button onClick={() => deleteEdge(item.relation)}>
              <TrashIcon />
            </button>
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
          <input
            type="text"
            onChange={(e) => setInputDescriptionEdge(e.target.value)}
            value={inputDescriptionEdge}
          />
        </Td>
        <Td>
          <input
            type="text"
            onChange={(e) => setInputDetailEdge(e.target.value)}
            value={inputDetailEdge}
          />
        </Td>
        <Td>
          <button onClick={onClickSave}>
            <SaveIcon />
          </button>
          <button onClick={() => setSelectedRowEdgeId('')}>
            <Cancel />
          </button>
        </Td>
      </Tr>
    ]
  }

  const renderDataTable = () => {
    let list = [props.edges]
    if (props.edges.innerList !== undefined && props.edges.innerList.length >= 0) {
      list = props.edges.innerList
    }
    return (
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th>Detail</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {list.map((item) => {
              if (item.relation === selectedRowEdgeId) {
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
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edge(s) selected data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{renderDataTable()}</ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
