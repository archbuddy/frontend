// check this for default edges configs https://reactflow.dev/docs/api/edges/edge-types/

import { useCallback, useState, useEffect } from 'react';
import ReactFlow from 'react-flow-renderer';
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  MiniMap,
  Controls
} from 'react-flow-renderer';
import SystemNode from './nodes/SystemNode';
import Header from './Header';
import Footer from './Footer';

const nodeTypes = { system: SystemNode };
const endpoint = "http://localhost:3000"

function Flow() {
  //load data on init
  useEffect(() => {loadData()}, []);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [inputSystemNode, setInputSystemNode] = useState([]);

  const loadData = () => {
    fetch(endpoint)
    .then(res => res.json())
    .then(
      (result) => {
        setNodes(result.nodes)
        setEdges(result.edges)
      },
      (error) => {
        console.log(error)
      }
    )
  }


  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => {
      console.log(`Connect nodes ${connection.source} > ${connection.target} `)
      if (connection.source === connection.target) {
        console.log('Opps, source and target are the same')
      } else {
        setEdges((eds) => addEdge(connection, eds))
        saveEdges(connection)
      }
    },
    [setEdges]
  );

  const saveEdges = (connection) => {
    fetch(`${endpoint}/edge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(connection)
    })
    .then(res => res.json())
    .then(
      (result) => {
        loadData()
      },
      (error) => {
        console.log(error)
      }
    )
  }
  //custom code to generate elements
  const onClickNewSystem = () => {
    fetch(`${endpoint}/system`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: inputSystemNode })
    })
    .then(res => res.json())
    .then(
      (result) => {
        setInputSystemNode('')
        loadData()
      },
      (error) => {
        console.log(error)
      }
    )
  }

  const onClickSaveNodesPos = () => {
    fetch(`${endpoint}/system`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nodes)
    })
    .then(res => res.json())
    .then(
      (result) => {
        loadData()
      },
      (error) => {
        console.log(error)
      }
    )
  }

  const onClickReadEdges = () => {
    console.log(edges)
  }

  const onClickReadNodes = () => {
    console.log(nodes)
  }

  // connectionMode loose define that handles can connect with each other
  return (
    <div className='main'>
      <Header/>
      <div className='middle'>
        <div className='middleLeft'>
          <p>Buttons and actions to interact with canvas</p>
          <input type="text" onChange={(e) => setInputSystemNode(e.target.value)} value={inputSystemNode}/>
          <button onClick={onClickNewSystem}>Add System</button><br/>
          <p>Console outputs</p>
          <button onClick={onClickReadEdges}>Read Edges</button><br/>
          <button onClick={onClickReadNodes}>Read Nodes</button><br/>
          <button onClick={onClickSaveNodesPos}>Save Nodes Pos</button><br/>
        </div>
        <div className='middleRight'>
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
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>

        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Flow;
