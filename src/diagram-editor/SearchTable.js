import React, { useEffect, useState } from 'react'
import {
  TableContainer,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Tfoot,
  Input,
  Box
} from '@chakra-ui/react'

export default function SearchTable(props) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [filter, setFilter] = useState(props.filter)
  const [list, setList] = useState([])
  const [columns, setColumns] = useState(props.columns ?? [])
  const initialRef = React.useRef()

  useEffect(() => {
    const getColumns = (list) => {
      if (props.columns) {
        setColumns(props.columns)
        return
      }

      if (!list || list.length < 0) {
        setColumns([])
        return
      }

      const newColumns = []
      for (const prop in list[0]) {
        newColumns.push({
          header: prop,
          prop
        })
      }

      setColumns(newColumns)
    }

    async function fetchData() {
      const list = await props.loadData(filter)
      getColumns(list)
      setList(list)
      setSelectedIndex(0)
    }

    initialRef.current.focus()

    if (props.loadData) {
      fetchData()
    }
  }, [props, filter])

  function getRandomInt(min = 0, max = 100000) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }

  function getValue(p) {
    if (typeof p === 'function') {
      return p()
    }

    return p
  }

  function getLines(list) {
    const lines = []
    let count = 0

    list.forEach((i) => {
      lines.push(
        <Tr key={`item-${count}`} className={count === selectedIndex ? 'selected' : ''}>
          {columns.map((c) => (
            <Td
              key={`${c.prop}-${i._id}-${getRandomInt()}`}
              onClick={() => props.onSelect && props.onSelect(i)}
            >
              {getValue(i[c.prop])}
            </Td>
          ))}
        </Tr>
      )
      count++
    })

    return lines
  }

  const onKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        if (selectedIndex < list.length - 1) setSelectedIndex(selectedIndex + 1)
        e.preventDefault()
        break
      case 'ArrowUp':
        if (selectedIndex > 0) setSelectedIndex(selectedIndex - 1)
        e.preventDefault()
        break
      case 'Enter':
        if (props.onSelect) {
          props.onSelect(list[selectedIndex])
        }
      // eslint-disable-next-line no-fallthrough
      default: {
        break
      }
    }
  }

  return (
    <>
      <Input
        placeholder={props.placeholder}
        onChange={(v) => setFilter(v.target.value)}
        onKeyDown={onKeyDown}
        ref={initialRef}
      />
      <Box
        overflowY="auto"
        maxHeight={props.maxHeight ? props.maxHeight : '300px'}
        css={{
          '&::-webkit-scrollbar': {
            width: '6px'
          },
          '&::-webkit-scrollbar-track': {
            width: '6px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'lightBlue'
          }
        }}
      >
        <TableContainer>
          <Table className="searchTable" variant="simple">
            <Thead>
              <Tr>
                {columns.map((c) => (
                  <Th key={`column-${c.header}-${getRandomInt()}`}>{c.header}</Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>{getLines(list)}</Tbody>
            <Tfoot>
              <Tr>
                <Th></Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}
