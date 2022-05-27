import React from 'react'
import { Box, Popover, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react'

import './index.css'

export default function SidebarItem(props) {
  const onDragStart = (event, data) => {
    event.dataTransfer.setData('application/reactflow', data)
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <Box className="sidebar-item" hidden={props.hidden}>
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
