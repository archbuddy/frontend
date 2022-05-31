import React, { useState, useEffect } from 'react'
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
  TableCaption,
  Input,
  Box
} from '@chakra-ui/react'
import { FaPen as EditIcon, FaTrashAlt as TrashIcon, FaSave as SaveIcon } from 'react-icons/fa'
import { MdCancel as Cancel } from 'react-icons/md'
import srvEdges from '../../services/edges'
import srvRelations from '../../services/relations'
import { isUndefined, log } from '../../util'

export default function EdgeSelectionModal(props) {
  useEffect(() => {
    if (props.edge) {
      setEdgesList(props.edge.innerList)
    }
  }, [props.edge])

  const [selectedRowEdgeId, setSelectedRowEdgeId] = useState('')
  const [inputDescriptionEdge, setInputDescriptionEdge] = useState('')
  const [inputDetailEdge, setInputDetailEdge] = useState('')
  const [relationId, setRelationId] = useState('')
  const [edgesList, setEdgesList] = useState(undefined)

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
    await props.refresh()
    if (edgesList.length === 1) {
      closeModal()
    } else {
      const newList = edgesList.filter(function (value) {
        return value.id !== edge.id
      })
      setEdgesList(newList)
      resetSelectedData()
    }
  }

  const onClickSave = async () => {
    log(`Saving Relation ${relationId} with value ${inputDescriptionEdge}`)
    // TODO detail field should be checked
    await srvRelations.updateRelation({
      id: relationId,
      description: inputDescriptionEdge,
      detail: inputDetailEdge
    })
    await props.refresh()
    // this solution fix the ux of the screen
    // but is a mud solution
    const newList = JSON.parse(JSON.stringify(edgesList))
    const index = newList.findIndex((e) => e.relation === relationId)
    newList[index].data.description = inputDescriptionEdge
    newList[index].data.detail = inputDetailEdge
    setEdgesList(newList)
    resetSelectedData()
  }

  const renderLine = (item) => {
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
    if (isUndefined(edgesList)) {
      // TODO implement edge creation
      return <></>
    }
    return (
      <TableContainer>
        <Table colorScheme="gray" variant="striped">
          <TableCaption>
            Showing all connections between the nodes of the selected edge
          </TableCaption>
          <Thead>
            <Tr>
              <Th style={{ width: '40%' }}>Description</Th>
              <Th style={{ width: '40%' }}>Detail</Th>
              <Th style={{ width: '20%' }}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {edgesList.map((item) => {
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

  const showNodesInfo = () => {
    if (isUndefined(props.edge)) {
      return ''
    }
    const source = props.nodes.findIndex((e) => e.id === props.edge.source)
    const target = props.nodes.findIndex((e) => e.id === props.edge.target)
    return (
      <Box
        style={{
          paddingBottom: '10px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box style={{ padding: '10px', borderRadius: 5, borderWidth: '2px' }}>
          {props.nodes[source].data.name}
        </Box>
        <Box
          style={{ padding: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}
        >
          <Box
            style={{
              width: '75px',
              height: '2px',
              backgroundColor: 'black'
            }}
          />
          <Box
            style={{
              border: 'solid black',
              borderWidth: '0 3px 3px 0',
              display: 'inline-block',
              padding: '3px',
              transform: 'rotate(-45deg)'
            }}
          />
        </Box>
        <Box style={{ padding: '10px', borderRadius: 5, borderWidth: '2px' }}>
          {props.nodes[target].data.name}
        </Box>
      </Box>
    )
  }

  return (
    <Modal isOpen={props.isOpen} onClose={closeModal} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edge(s) selected data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {showNodesInfo()}
          {renderDataTable()}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={closeModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
