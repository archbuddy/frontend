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
import { v4 as uuidv4 } from 'uuid'

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

import AddNodeModal from './modal/AddNodeModal'
import EdgeSelectionModal from './modal/EdgeSelectionModal'
import ChangeNodeModal from './modal/ChangeNodeModal'

import srvViewPoint from '../services/viewpoint'
import srvEdges from '../services/edges'
import srvNodes from '../services/nodes'

import { isUndefined } from '../util'

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
  const {
    isOpen: isAddNodeModalOpen,
    onOpen: onAddNodeModalOpen,
    onClose: onAddNodeModalClose
  } = useDisclosure()
  const {
    isOpen: isEdgeSelectionOpen,
    onOpen: onEdgeSelectionOpen,
    onClose: onEdgeSelectionClose
  } = useDisclosure()
  const {
    isOpen: isChangeNodeModalOpen,
    onOpen: onChangeNodeModalOpen,
    onClose: onChangeNodeModalClose
  } = useDisclosure()

  const reactFlowWrapper = useRef(null)
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [reactFlowInstance, setReactFlowInstance] = useState(null)
  const [diagramSelected, setDiagramSelected] = useState(null)
  const [newNode, setNewNode] = useState(null)
  const [selectedEdge, setSelectedEdge] = useState(null)
  const [selectedNode, setSelectedNode] = useState(null)

  const loadData = async (viewPoint) => {
    let id
    if (!isUndefined(viewPoint) && viewPoint.id) {
      id = viewPoint.id
    } else {
      id = diagramSelected.id
    }
    const result = await srvViewPoint.loadData(id)
    setNodes(result.nodes)
    setEdges(result.edges.map((e) => formatEdge(e)))
    if (!isUndefined(viewPoint)) {
      setDiagramSelected(viewPoint)
    }
  }

  const onConnect = async (connection) => {
    if (srvEdges.edgeCanConnect(connection)) {
      setEdges((eds) => addEdge(formatEdge(connection), eds))
      await srvEdges.createEdge(connection, diagramSelected.id)
      // It needs to refresh to create the structure
      await loadData()
    }
  }

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const insertNode = async (newNode) => {
    setNodes(nodes.concat(newNode))
    onAddNodeModalClose()
    await srvNodes.createNode(newNode, diagramSelected.id)
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
        id: uuidv4(),
        position,
        type: data.type,
        data: { variant: data.data.variant }
      }
      setNewNode(newNode)
      onAddNodeModalOpen()
    },
    [reactFlowInstance, onAddNodeModalOpen, setNewNode]
  )

  const onNodeDragStop = async (_e, node) => {
    await srvNodes.patchNode({ id: node.id, x: node.position.x, y: node.position.y })
  }

  const onEdgesClick = (event, param) => {
    const index = edges.findIndex((item) => item.id === param.id)
    setSelectedEdge(edges[index])
    onEdgeSelectionOpen()
  }

  const onNodeDoubleClick = (event, param) => {
    setSelectedNode(param)
    onChangeNodeModalOpen()
  }

  return (
    <>
      <AddNodeModal
        isOpen={isAddNodeModalOpen}
        onClose={onAddNodeModalClose}
        onOk={insertNode}
        newNode={newNode}
      ></AddNodeModal>
      <EdgeSelectionModal
        isOpen={isEdgeSelectionOpen}
        onClose={onEdgeSelectionClose}
        edge={selectedEdge}
        nodes={nodes}
        refresh={loadData}
      ></EdgeSelectionModal>
      <ChangeNodeModal
        isOpen={isChangeNodeModalOpen}
        onClose={onChangeNodeModalClose}
        node={selectedNode}
        refresh={loadData}
      ></ChangeNodeModal>
      <ReactFlowProvider>
        <Flex ref={reactFlowWrapper} height="100%">
          <Sidebar onDiagramSelect={loadData} diagramSelected={diagramSelected}></Sidebar>
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
              onEdgeClick={onEdgesClick}
              deleteKeyCode={null}
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              connectionLineStyle={connectionLineStyle}
              onNodeDoubleClick={onNodeDoubleClick}
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
