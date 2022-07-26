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
  Input
} from '@chakra-ui/react'
import { FaPen as EditIcon, FaTrashAlt as TrashIcon, FaSave as SaveIcon } from 'react-icons/fa'
import { MdCancel as Cancel } from 'react-icons/md'

import ShowOtherRelations from './edgemodal/ShowOtherRelations'
import ShowNodesInfo from './edgemodal/ShowNodesInfo'

import srvEdges from '../../services/edges'
import srvRelations from '../../services/relations'
import { isUndefined, log } from '../../util'

export default function EdgeSelectionModal(props) {
  useEffect(() => {
    if (props.edge) {
      setEdgesList(props.edge.innerList)
    }
    async function load() {
      const source = getSourceEntity()
      const target = getTargetEntity()
      const currentRelations = props.edge.innerList.map((i) => {
        return i.relation
      })
      const data = await srvRelations.search(
        source.data.entity,
        target.data.entity,
        undefined,
        currentRelations.toString()
      )
      setAllConnections(data)
    }
    load()
  }, [props.edge])

  const [selectedRowEdgeId, setSelectedRowEdgeId] = useState('')
  const [inputDescriptionEdge, setInputDescriptionEdge] = useState('')
  const [inputDetailEdge, setInputDetailEdge] = useState('')
  const [relationId, setRelationId] = useState('')
  const [edgesList, setEdgesList] = useState(undefined)
  const [allConnections, setAllConnections] = useState([])

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
            Showing all connections between the nodes of the selected edge available in this view
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
  const getSourceEntity = () => {
    const source = props.nodes.findIndex((e) => e.id === props.edge.source)
    if (source === -1) {
      return -1
    }
    return props.nodes[source]
  }
  const getTargetEntity = () => {
    const target = props.nodes.findIndex((e) => e.id === props.edge.target)
    if (target === -1) {
      return -1
    }
    return props.nodes[target]
  }

  if (props.isOpen === false) {
    return <></>
  }

  return (
    <Modal isOpen={props.isOpen} onClose={closeModal} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edge(s) selected data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ShowNodesInfo source={getSourceEntity()} target={getTargetEntity()} />
          <ShowOtherRelations />
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
