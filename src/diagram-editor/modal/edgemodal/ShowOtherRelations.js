import React, { useState } from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Flex,
  VStack,
  HStack,
  Tbody,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Text,
  Input
} from '@chakra-ui/react'

export default function ShowOtherRelations(props) {
  const [inputFilter, setInputFilter] = useState('')

  return (
    <Accordion allowToggle>
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
                <Tbody></Tbody>
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
