// check this for default edges configs https://reactflow.dev/docs/api/edges/edge-types/

import { useCallback, useEffect, useState } from 'react'
import ReactFlow from 'react-flow-renderer'
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  MiniMap
} from 'react-flow-renderer'

import Footer from './Footer'
import Header from './Header'
import SystemNode from './nodes/SystemNode'
import srvEdges from './services/edges'
import srvGeneral from './services/general'
import srvNodes from './services/nodes'

const nodeTypes = { system: SystemNode }

function Flow() {
  //load data on init
  useEffect(() => {
    loadData()
  }, [])

  const [nodes, setNodes] = useState([])
  const [edges, setEdges] = useState([])
  const [inputSystemNode, setInputSystemNode] = useState([])
  const [inputEdgeLabel, setInputEdgeLabel] = useState([])
  const [selectedEdge, setSelectedEdge] = useState([])

  const loadData = async () => {
    const result = await srvGeneral.loadData()
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
    console.log(edges)
  }

  const onClickReadNodes = () => {
    console.log(nodes)
  }

  const onEdgesClick = (event, param) => {
    const index = edges.findIndex((item) => item.id === param.id)
    setSelectedEdge(edges[index])
    setInputEdgeLabel(edges[index].label)
  }

  const onClickSaveEdgeLabel = () => {
    selectedEdge.label = inputEdgeLabel
    setInputEdgeLabel('')
    setSelectedEdge('')
  }

  const onNodesDelete = async (event) => {
    await srvNodes.deleteNode(event[0].id)
    await loadData()
  }

  // connectionMode loose define that handles can connect with each other
  return (
    <div className="main">
      <Header />
      <div className="middle">
        <div className="middleLeft">
          <p>Buttons and actions to interact with canvas</p>
          <p></p>
          <p>Nodes</p>
          <input
            type="text"
            onChange={(e) => setInputSystemNode(e.target.value)}
            value={inputSystemNode}
          />
          <button onClick={onClickNewSystem}>Add System</button>
          <br />
          <p></p>
          <p>Edge</p>
          <input
            type="text"
            onChange={(e) => setInputEdgeLabel(e.target.value)}
            value={inputEdgeLabel}
          />
          <button onClick={onClickSaveEdgeLabel}>Save Edge label</button>
          <br />
          <p>Console outputs</p>
          <button onClick={onClickReadEdges}>Read Edges</button>
          <br />
          <button onClick={onClickReadNodes}>Read Nodes</button>
          <br />
          <p>Actions</p>
          <button onClick={onClickSaveNodesPos}>Save Nodes Pos</button>
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
