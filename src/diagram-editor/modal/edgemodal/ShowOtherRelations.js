import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box
} from '@chakra-ui/react'

export default function ShowOtherRelations(props) {
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
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
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
