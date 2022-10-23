import React from 'react'
import { Box } from '@chakra-ui/react'
import { isUndefined, log } from '../../../util'

export default function ShowNodesInfo(props) {
  if (isUndefined(props.source) || isUndefined(props.target)) {
    return <></>
  }
  const source = props.source
  const target = props.target
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
      <Box style={{ padding: '10px', borderRadius: 5, borderWidth: '2px' }}>{source.data.name}</Box>
      <Box style={{ padding: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
      <Box style={{ padding: '10px', borderRadius: 5, borderWidth: '2px' }}>{target.data.name}</Box>
    </Box>
  )
}
