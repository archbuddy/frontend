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
  Box,
  Flex,
  VStack,
  Text
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
    async function load() {
      const source = getSourceEntity(props.edge.source)
      const target = getTargetEntity(props.edge.target)
      const data = await srvRelations.search(source.data.entity, target.data.entity)
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
  const getSourceEntity = (edgeId) => {
    const source = props.nodes.findIndex((e) => e.id === props.edge.source)
    if (source === -1) {
      return -1
    }
    return props.nodes[source]
  }
  const getTargetEntity = (edgeId) => {
    const target = props.nodes.findIndex((e) => e.id === props.edge.target)
    if (target === -1) {
      return -1
    }
    return props.nodes[target]
  }
  const showNodesInfo = () => {
    if (isUndefined(props.edge)) {
      return ''
    }
    const source = getSourceEntity(props.edge.source)
    const target = getTargetEntity(props.edge.target)
    if (source === -1 || target === -1) {
      log(`Edge Node connection source: ${source} target: ${target} isOpen: ${props.isOpen}`)
      return <></>
    }
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
          {source.data.name}
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
          {target.data.name}
        </Box>
      </Box>
    )
  }

  if (props.isOpen === false) {
    return <></>
  }
  const renderConnectionLine = (item) => {
    // TODO Remove all connections listed on the panel on the right
    return (
      <Tr key={item.id}>
        <Td>Check</Td>
        <Td>
          {item.detail}&nbsp;|&nbsp;{item.description}
        </Td>
      </Tr>
    )
  }
  const renderAllConnections = () => {
    if (allConnections === undefined || allConnections.length === 0) {
      return <></>
    } else {
      return (
        <Flex>
          <VStack>
            <Text>Filter:</Text>
            <Text>Input text here</Text>
            <TableContainer>
              <Table colorScheme="gray" variant="striped">
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>Text</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {allConnections.map((item) => {
                    return renderConnectionLine(item)
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </VStack>
        </Flex>
      )
    }
  }

  return (
    <Modal isOpen={props.isOpen} onClose={closeModal} size="full">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edge(s) selected data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {showNodesInfo()}
          <Flex>
            <Box bg="green.500">{renderAllConnections()}</Box>
            <Box bg="tomato">{renderDataTable()}</Box>
          </Flex>
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
