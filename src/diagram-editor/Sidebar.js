import React from 'react'
import { VStack, Box, IconButton, useDisclosure } from '@chakra-ui/react'
import { AiFillFolderOpen } from 'react-icons/ai'
import SidebarItem from './SidebarItem'
import OpenDiagramModal from './modal/OpenDiagramModal'
import { Shape as PersonShape, defaultData as personData } from './nodes/PersonNode'
import { Shape as SystemShape, defaultData as systemData } from './nodes/SystemNode'
// import { Shape as ContainerShape, defaultData as containerData } from './nodes/ContainerNode'
// import {
//   Shape as StorageContainerShape,
//   defaultData as storageContainerData
// } from './nodes/StorageContainerNode'
// import {
//   Shape as MicroserviceContainerShape,
//   defaultData as microserviceContainerData
// } from './nodes/MicroserviceContainerNode'
// import {
//   Shape as BusContainerShape,
//   defaultData as busContainerData
// } from './nodes/BusContainerNode'
// import {
//   Shape as WebContainerNode,
//   defaultData as webContainerData
// } from './nodes/WebContainerNode'
// import {
//   Shape as MobContainerNode,
//   defaultData as mobContainerData
// } from './nodes/MobContainerNode'

import './index.css'

export default function Sidebar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const isDiagramSelected = () => {
    return props.diagramSelected !== null && props.diagramSelected !== undefined
  }

  return (
    <Box
      margin={2}
      padding="10px"
      position="absolute"
      bgColor="white"
      borderWidth="1px"
      borderRadius={'xl'}
      zIndex="20"
    >
      <OpenDiagramModal
        isOpen={isOpen}
        onClose={onClose}
        diagramSelected={props.diagramSelected}
        onSelect={props.onDiagramSelect}
      ></OpenDiagramModal>

      <VStack className="sidebar">
        <IconButton
          colorScheme="gray"
          aria-label="Search database"
          icon={<AiFillFolderOpen title="Open Diagram" />}
          onClick={onOpen}
        />
        <SidebarItem
          shape={PersonShape}
          label="Person"
          {...personData}
          hidden={!isDiagramSelected()}
        />

        <SidebarItem
          shape={PersonShape}
          label="External Person"
          {...{ ...personData, ...{ data: { variant: 'external' } } }}
          hidden={!isDiagramSelected()}
        />

        <SidebarItem
          shape={SystemShape}
          label="System"
          {...systemData}
          hidden={!isDiagramSelected()}
        />

        <SidebarItem
          shape={SystemShape}
          label="External System"
          {...{ ...systemData, ...{ data: { variant: 'external' } } }}
          hidden={!isDiagramSelected()}
        />

        {/* <SidebarItem shape={ContainerShape} label="Container" {...containerData} />

        <SidebarItem
          shape={StorageContainerShape}
          label="Storage Container"
          {...storageContainerData}
        />

        <SidebarItem
          shape={MicroserviceContainerShape}
          label="Microservice Container"
          {...microserviceContainerData}
        />

        <SidebarItem
          shape={BusContainerShape}
          label="Message Bus Container"
          {...busContainerData}
        />

        <SidebarItem shape={WebContainerNode} label="Web Container" {...webContainerData} />

        <SidebarItem shape={MobContainerNode} label="Mobile Container" {...mobContainerData} /> */}
      </VStack>
    </Box>
  )
}
