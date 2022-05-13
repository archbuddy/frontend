// check this for default edges configs https://reactflow.dev/docs/api/edges/edge-types/

import React, { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap,
  MarkerType
} from 'react-flow-renderer'
import Modal from 'react-modal'
import ModalEdge from './ModalEdge'
import { log } from './util'

import Footer from './Footer'
import Header from './Header'
import SystemNode from './nodes/SystemNode'
import srvEdges from './services/edges'
import srvGeneral from './services/general'
import srvNodes from './services/nodes'
import srvViewPoint from './services/viewpoint'
import { FaSave as SaveIcon } from 'react-icons/fa'

const modalCustomStyles = {
  overlay: {
    zIndex: 1000
  },
  content: {
    width: '50%',
    height: '50%',
    margin: 'auto'
  }
}

const nodeTypes = { system: SystemNode }
Modal.setAppElement('#root')

function Flow() {
  //load data on init
  useEffect(() => {
    initialLoad()
  }, [])

  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [viewPoint, setViewPoint] = useState([])
  const [inputSystemNode, setInputSystemNode] = useState('')
  const [selectedEdge, setSelectedEdge] = useState('')
  const [modalEdgeIsOpen, setModalEdgeIsOpen] = React.useState(false)
  let selectedViewPoint = '0'

  const initialLoad = async () => {
    const result = await srvGeneral.loadData()
    setNodes(result.nodes)
    for (const item of result.edges) {
      item.markerEnd = {}
      item.markerEnd.type = MarkerType.ArrowClosed
    }
    setEdges(result.edges)
    setViewPoint(await srvViewPoint.list())
  }

  const loadData = async () => {
    log(`Loading data with viewPoint ${selectedViewPoint}`)
    const result = await srvGeneral.loadData(selectedViewPoint)
    setNodes(result.nodes)
    for (const item of result.edges) {
      item.markerEnd = {}
      item.markerEnd.type = MarkerType.ArrowClosed
    }
    setEdges(result.edges)
  }

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  )

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  )

  const onConnect = useCallback(
    async (connection) => {
      if (srvEdges.edgeCanConnect(connection)) {
        setEdges((eds) => addEdge(connection, eds))
        await srvEdges.createEdge(connection)
        await loadData()
      }
    },
    [setEdges]
  )

  //custom code to generate elements
  const onClickNewSystem = async () => {
    await srvNodes.createNode('system', inputSystemNode)
    setInputSystemNode('')
    await loadData()
  }

  const onClickSaveNodesPos = async () => {
    await srvNodes.saveAllNodePosition(nodes)
    await loadData()
  }

  const onClickReadEdges = () => {
    log(edges)
  }

  const onClickReadNodes = () => {
    log(nodes)
  }

  const onClickReadViews = () => {
    log(viewPoint)
  }

  function closeEdgeModal() {
    log('closing')
    setSelectedEdge({})
    setModalEdgeIsOpen(false)
  }
  async function callBackModalEdge(reload = false) {
    if (reload) {
      await loadData()
    }
    setModalEdgeIsOpen(false)
  }
  const onEdgesClick = (event, param) => {
    const index = edges.findIndex((item) => item.id === param.id)
    setSelectedEdge(edges[index])
    setModalEdgeIsOpen(true)
  }

  const onNodesDelete = async (event) => {
    // TODO it could receive a list of itens
    await srvNodes.deleteNode(event[0].id)
    await loadData()
  }

  const onEdgesDelete = async (event) => {
    // TODO it could receive a list of itens
    await srvEdges.deleteEdge(event[0].id)
    await loadData()
  }
  const viewPointOnChange = (event) => {
    selectedViewPoint = event.target.value
    loadData()
  }
  // connectionMode loose define that handles can connect with each other
  return (
    <div className="main" id="main">
      <Modal
        isOpen={modalEdgeIsOpen}
        contentLabel="Example Modal"
        onRequestClose={closeEdgeModal}
        style={modalCustomStyles}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <ModalEdge edge={selectedEdge} callback={callBackModalEdge} closeModal={closeEdgeModal} />
      </Modal>
      <Header />
      <div className="middle">
        <div className="middleLeft">
          <p>Buttons and actions to interact with canvas</p>
          <br />
          <p>View points</p>
          <select
            name="viewPointSelect"
            onChange={viewPointOnChange}
            value={selectedViewPoint}
            multiple={false}
          >
            <option value="0">selecione</option>
            {viewPoint.map((item, i) => {
              return (
                <option key={i} value={item.id}>
                  {item.name}
                </option>
              )
            })}
          </select>
          <p></p>
          <p>Nodes</p>
          <input
            type="text"
            onChange={(e) => setInputSystemNode(e.target.value)}
            value={inputSystemNode}
          />
          <button onClick={onClickNewSystem}>Add System</button>
          <br />
          <p>Console outputs</p>
          <button onClick={onClickReadEdges}>Read Edges</button>
          <br />
          <button onClick={onClickReadNodes}>Read Nodes</button>
          <br />
          <button onClick={onClickReadViews}>Read Views</button>
          <br />
          <p>Actions</p>
          <button onClick={onClickSaveNodesPos}>
            <SaveIcon />
          </button>
          <br />
        </div>
        <div className="middleRight">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            attributionPosition="top-right"
            nodeTypes={nodeTypes}
            connectionMode="loose"
            onEdgeClick={onEdgesClick}
            onNodesDelete={onNodesDelete}
            onEdgesDelete={onEdgesDelete}
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Flow
