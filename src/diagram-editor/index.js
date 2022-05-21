import { Box, Flex, useDisclosure } from '@chakra-ui/react'
import React, { useCallback, useRef, useState } from 'react'
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

import AddNodeModal from './AddNodeModal'

import srvViewPoint from '../services/viewpoint'
import srvEdges from '../services/edges'
import srvNodes from '../services/nodes'

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
      type: MarkerType.ArrowClosed
    },
    type: 'c4',
    data: { ...{ description: '', detail: '' }, ...edge.data }
  }
}

export default function DiagramEditor() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [diagramId, setDiagramId] = useState(null)
  const [newNode, setNewNode] = useState(null)

  const loadData = async (viewPointId) => {
    const result = await srvViewPoint.loadData(viewPointId)
    setNodes(result.nodes)
    setEdges(result.edges.map((e) => formatEdge(e)))
    setDiagramId(viewPointId)
  }

  const onConnect = async (connection) => {
    if (srvEdges.edgeCanConnect(connection)) {
      setEdges((eds) => addEdge(formatEdge(connection), eds))
      await srvEdges.createEdge(connection, diagramId)
    }
  }

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const insertNode = async (newNode) => {
    setNodes(nodes.concat(newNode))
    onClose()
    await srvNodes.createNode(
      newNode.type,
      newNode.data.name,
      newNode.position.x,
      newNode.position.y,
      diagramId
    )
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault()

      const data = JSON.parse(event.dataTransfer.getData('application/reactflow'))

      // check if the dropped element is valid
      if (typeof data === 'undefined' || !data) {
        return
      }

      const position = reactFlowInstance.project({
        x: event.clientX,
        y: event.clientY - 50
      })
      const newNode = {
        id: getId(),
        type: data.type,
        position,
        data: { label: `${data.type} node`, variant: data.variant }
      }
      setNewNode(newNode)
      onOpen()
    },
    [reactFlowInstance, onOpen, setNewNode]
  )

  const onNodeDragStop = async (_e, node) => {
    await srvNodes.patchNode(node, diagramId)
  }

  return (
    <>
      <AddNodeModal
        isOpen={isOpen}
        onClose={onClose}
        onOk={insertNode}
        newNode={newNode}
      ></AddNodeModal>
      <ReactFlowProvider>
        <Flex ref={reactFlowWrapper} height="100%">
          <Sidebar onDiagramSelect={loadData}></Sidebar>
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
              onNodeDragStop={onNodeDragStop}
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
    </>
  )
}
