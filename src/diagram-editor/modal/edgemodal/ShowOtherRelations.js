import React, { useState, useEffect } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  HStack,
  Tbody,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Text,
  Input,
  Button
} from '@chakra-ui/react'

import srvRelations from '../../../services/relations'

export default function ShowOtherRelations(props) {
  const [inputFilter, setInputFilter] = useState('')
  const [list, setList] = useState([])

  const renderLine = (item) => {
    return (
      <Tr key={item.id}>
        <Td>{item.description}</Td>
        <Td>{item.detail}</Td>
        <Td>
          <Button
            onClick={() => {
              addToDiagram(item.id)
            }}
          >
            Add to View
          </Button>
        </Td>
      </Tr>
    )
  }

  const addToDiagram = async (relationId) => {
    console.log(relationId)
  }

  const onToogle = async (evt) => {
    if (evt >= 0) {
      const data = await srvRelations.search(
        props.source.data.entity,
        props.target.data.entity,
        undefined,
        props.exclude
      )
      setList(data)
    }
  }

  return (
    <Accordion allowToggle onChange={onToogle}>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              See other connections between the objects above
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel>
          <Box>
            <HStack>
              <Text>Filter:</Text>
              <Text>
                <Input
                  type="text"
                  onChange={(e) => setInputFilter(e.target.value)}
                  value={inputFilter}
                  placeholder="Filter"
                  size="sm"
                  variant="outline"
                  borderColor="blue.400"
                />
              </Text>
            </HStack>
            <TableContainer>
              <Table colorScheme="gray" variant="striped">
                <Thead>
                  <Tr>
                    <Th style={{ width: '40%' }}>Description</Th>
                    <Th style={{ width: '40%' }}>Detail</Th>
                    <Th style={{ width: '20%' }}>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {list.map((item) => {
                    return renderLine(item)
                  })}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}

/**
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
 */
