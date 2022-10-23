import { Box, Flex, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useCallback, useRef, useState, useEffect } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Controls,
  MarkerType
} from 'react-flow-renderer'
import { useSearchParams } from 'react-router-dom'

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

import { isUndefined, log, prepareErrorToScreen } from '../util'

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
  // TODO when we have tags for the edge we will add on the data.detail
  return {
    ...edge,
    style: { stroke: '#000' },
    markerEnd: {
      type: MarkerType.ArrowClosed
    },
    type: 'c4',
    data: { description: edge.data ? edge.data.description : '' }
  }
}

export default function DiagramEditor() {
  const toast = useToast()
  // eslint-disable-next-line no-unused-vars
  let [queryString, setQueryString] = useSearchParams()
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

  useEffect(() => {
    async function load() {
      const id = queryString.get('id')
      if (id && id.length > 0) {
        const viewPoint = await srvViewPoint.get(id)
        await loadData(viewPoint)
      }
    }
    load()
  }, [queryString])

  const loadData = async (viewPoint) => {
    try {
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
        setQueryString({
          id: viewPoint.id
        })
      }
    } catch (err) {
      toast({
        title: 'Error loading diagram',
        description: prepareErrorToScreen(err.message),
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  const onConnect = async (connection) => {
    if (srvEdges.edgeCanConnect(connection)) {
      await srvEdges.createEdge(connection, diagramSelected.id)
      setEdges((eds) => addEdge(formatEdge(connection), eds))
      // It needs to refresh to create the structure
      await loadData()
    }
  }

  const onDragOver = useCallback((event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const insertNode = async (newNode) => {
    await srvNodes.createNode(newNode, diagramSelected.id)
    await loadData()
    // setNodes(nodes.concat(newNode))
    onAddNodeModalClose()
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

  const onEdgesClick = (_event, param) => {
    const index = edges.findIndex((item) => item.id === param.id)
    setSelectedEdge(edges[index])
    onEdgeSelectionOpen()
  }

  const onNodeDoubleClick = (event, param) => {
    setSelectedNode(param)
    onChangeNodeModalOpen()
  }

  const onRemoveNodeFromView = async (nodeId) => {
    log(`Remove node from view ${nodeId} diagram ${diagramSelected.id}`)
    await srvNodes.deleteNode(nodeId)
    await loadData()
    onChangeNodeModalClose()
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
        diagramSelected={diagramSelected}
      ></EdgeSelectionModal>
      <ChangeNodeModal
        isOpen={isChangeNodeModalOpen}
        onClose={onChangeNodeModalClose}
        node={selectedNode}
        refresh={loadData}
        onRemoveNodeFromView={onRemoveNodeFromView}
      ></ChangeNodeModal>
      <ReactFlowProvider>
        <Flex ref={reactFlowWrapper} height="100%">
          <Sidebar onDiagramSelect={loadData} diagramSelected={diagramSelected} />
          <Box height="100%" width="100%" bgColor="gray.50">
            <ReactFlow
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
              fitView={true}
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
