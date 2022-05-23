import React, { useEffect, useState } from 'react'
import { TableContainer, Table, Thead, Th, Tr, Tbody, Td, Tfoot, Input } from '@chakra-ui/react'

export default function SearchTable(props) {
  const [filter, setFilter] = useState(props.filter)
  const [list, setList] = useState([])
  const [columns, setColumns] = useState(props.columns ?? [])

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
    }

    if (props.loadData) {
      fetchData()
    }
  }, [props, filter])

  function getRandomInt(min = 0, max = 100000) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }

  return (
    <>
      <Input placeholder="Basic usage" onChange={(v) => setFilter(v.target.value)} />
      <TableContainer>
        <Table className="searchTable" variant="simple">
          <Thead>
            <Tr>
              {columns.map((c) => (
                <Th key={`column-${c.header}-${getRandomInt()}`}>{c.header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {list.map((i) => (
              <Tr key={`${getRandomInt()}`}>
                {columns.map((c) => (
                  <Td
                    key={`${c.prop}-${i._id}-${getRandomInt()}`}
                    onClick={() => props.onSelect && props.onSelect(i)}
                  >
                    {i[c.prop]}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th></Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  )
}
