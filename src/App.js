import { useCallback, useState } from 'react';
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

import initialNodes from './tmp/nodes.js';
// check this for default edges configs https://reactflow.dev/docs/api/edges/edge-types/
import initialEdges from './tmp/edges.js';

const nodeTypes = { system: SystemNode };

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  //custom code to generate elements
  const onClickNewSystem = useCallback(
    () => {
      console.log('click')
      setNodes((nds) => {
        const id = 'aaaa'
        return [
          ...nds,
          {
            id,
            position: { x: 0, y: 0 },
            data: { label: id },
            type: 'system',
          }
        ];
      })
    },
    []
  )

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
          Buttons and actions to interact with canvas<br/>
          <button onClick={onClickNewSystem}>Add System</button>
          <button onClick={onClickReadEdges}>Read Edges</button>
          <button onClick={onClickReadNodes}>Read Nodes</button>
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
