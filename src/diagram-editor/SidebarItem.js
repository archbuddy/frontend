import React from 'react'
import { Box, Popover, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react'

import './index.css'

export default function SidebarItem(props) {
  const isEnable = () => {
    return props.enabled === 'true'
  }

  const onDragStart = (event, data) => {
    if (isEnable()) {
      event.dataTransfer.setData('application/reactflow', data)
      event.dataTransfer.effectAllowed = 'move'
    }
  }
  if (!props.diagramSelected) {
    return <></>
  }
  return (
    <Box className="sidebar-item">
      <Popover trigger="hover" placement="right">
        <PopoverTrigger>
          <Box
            className="sidebar-item"
            onDragStart={(event) => onDragStart(event, JSON.stringify(props))}
            draggable
          >
            {props.shape(props)}
          </Box>
        </PopoverTrigger>
        <PopoverContent style={{ width: '200px' }}>
          {props.shape(props)}
          <Text align="center">{props.label}</Text>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
