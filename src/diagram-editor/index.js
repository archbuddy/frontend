import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect, useCallback, useRef, useState } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  MarkerType
} from 'react-flow-renderer'

import Sidebar from './Sidebar'
import PersonNode from './nodes/PersonNode'
import SystemNode from './nodes/SystemNode'
import ContainerNode from './nodes/ContainerNode'
import StorageContainerNode from './nodes/StorageContainerNode'
import MicroserviceContainerNode from './nodes/MicroserviceContainerNode'
import BusContainerNode from './nodes/BusContainerNode'
import WebContainerNode from './nodes/WebContainerNode'
import MobContainerNode from './nodes/MobContainerNode'
import C4Edge from './edges/C4Edge'

const nodeTypes = {
  person: PersonNode,
  system: SystemNode,
  container: ContainerNode,
  storageContainer: StorageContainerNode,
  microserviceContainer: MicroserviceContainerNode,
  busContainer: BusContainerNode,
  webContainer: WebContainerNode,
  mobContainer: MobContainerNode
}
const edgeTypes = {
  c4: C4Edge
}

const connectionLineStyle = { stroke: '#ddddd' }
const snapGrid = [20, 20]

let id = 50
const getId = () => `dndnode_${id++}`

const formatEdge = (edge) => {
  return {
    ...edge,

    style: { stroke: '#000' },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#000'
    },
    type: 'c4',
    data: { text: 'custom edge' }
  }
}

export default function DiagramEditor() {
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  useEffect(() => {
    setNodes([
      {
        id: '1',
        type: 'system',
        data: {
          name: 'System Name',
          description: 'Description of software system'
        },
        position: { x: 0, y: 0 }
      },
      {
        id: '2',
        type: 'person',
        data: {
          name: 'Person Name',
          description: 'Description of person'
        },
        position: { x: 400, y: -100 }
      },
      {
        id: '3',
        type: 'storageContainer',
        position: { x: 0, y: 200 }
      },
      {
        id: '4',
        type: 'microserviceContainer',
        position: { x: 0, y: 400 }
      },
      {
        id: '5',
        type: 'busContainer',
        position: { x: 0, y: 700 }
      },
      {
        id: '6',
        type: 'webContainer',
        position: { x: 0, y: 900 }
      },
      {
        id: '7',
        type: 'mobContainer',
        position: { x: 0, y: 1200 }
      }
    ])

    setEdges([
      formatEdge({
        id: 'e1-2',
        source: '1',
        target: '2',
        sourceHandle: 'r',
        targetHandle: 'l'
      })
    ])
  }, [])

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(formatEdge(params), eds)), [])

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const data = JSON.parse(event.dataTransfer.getData('application/reactflow'))

      // check if the dropped element is valid
      if (typeof data === 'undefined' || !data) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX - 120,
        y: event.clientY - 10
      })
      const newNode = {
        id: getId(),
        type: data.type,
        position,
        data: { label: `${data.type} node`, variant: data.variant }
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [reactFlowInstance]
  )

  return (
    <ReactFlowProvider>
      <Flex ref={reactFlowWrapper} height="100%">
        <Sidebar></Sidebar>
        <Box height="100%" width="100%" bgColor="gray.50">
          <ReactFlow
            minZoom={0.05}
            maxZoom={2}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            connectionLineStyle={connectionLineStyle}
            snapToGrid={true}
            snapGrid={snapGrid}
            defaultZoom={1.5}
            fitView
            attributionPosition="bottom-left"
            connectionMode="loose"
          >
            <MiniMap />
            <Controls />
          </ReactFlow>
        </Box>
      </Flex>
    </ReactFlowProvider>
  )
}
