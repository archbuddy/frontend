// check this for default edges configs https://reactflow.dev/docs/api/edges/edge-types/

import React, { useCallback, useEffect, useState } from 'react'
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap
} from 'react-flow-renderer'
import Modal from 'react-modal'
import ModalEdge from './ModalEdge'
import { log } from './util'

import Footer from './Footer'
import Header from './Header'
import SystemNode from './nodes/SystemNode'
import srvEdges from './services/edges'
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
  const [viewPoints, setViewPoints] = useState([])
  const [inputText, setInputText] = useState('')
  const [selectedEdge, setSelectedEdge] = useState('')
  const [modalEdgeIsOpen, setModalEdgeIsOpen] = React.useState(false)
  const [selectedViewPoint, setSelectedViewPoint] = useState('0')

  const initialLoad = async () => {
    setViewPoints(await srvViewPoint.list())
  }

  const loadData = async (viewPointId) => {
    const searchId = viewPointId === undefined ? selectedViewPoint : viewPointId
    log(`Loading data with viewPoint ${searchId}`)
    const result = await srvViewPoint.loadData(searchId)
    setNodes(result.nodes)
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
        log(`Selected view point ${selectedViewPoint}`)
        await srvEdges.createEdge(connection, selectedViewPoint)
        await loadData()
      }
    },
    [selectedViewPoint]
  )

  //custom code to generate elements
  const onClickNewSystem = async () => {
    await srvNodes.createNode('system', inputText, 0, 0, selectedViewPoint)
    setInputText('')
    await loadData()
  }

  const onClickSaveNodesPos = async () => {
    const index = viewPoints.findIndex((e) => e.id === selectedViewPoint)
    await srvViewPoint.savePosition(viewPoints[index], nodes, edges)
    await loadData()
  }

  const onClickReadEdges = () => {
    log(edges)
  }

  const onClickReadNodes = () => {
    log(nodes)
  }

  const onClickReadViews = () => {
    log(viewPoints)
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

  const viewPointOnChange = (event) => {
    //useState is async and will not garantuee that the value is updated
    setSelectedViewPoint(event.target.value)
    loadData(event.target.value)
  }

  const onClickNewViewPoint = async () => {
    await srvViewPoint.create(inputText)
    setInputText('')
    await initialLoad()
  }

  // save the node position on pan
  const onNodeDragStop = async (event, node) => {
    await srvNodes.patchNode(node, selectedViewPoint)
    await loadData()
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
            {viewPoints.map((item, i) => {
              return (
                <option key={i} value={item.id}>
                  {item.name}
                </option>
              )
            })}
          </select>
          <p></p>
          <p>Nodes</p>
          <input type="text" onChange={(e) => setInputText(e.target.value)} value={inputText} />
          <button onClick={onClickNewSystem}>Add System</button>
          <br />
          <button onClick={onClickNewViewPoint}>Add ViewPoint</button>
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
            onNodeDragStop={onNodeDragStop}
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
