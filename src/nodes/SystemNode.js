import { Handle, Position } from 'react-flow-renderer';

// Future references, dynamic handles
// https://github.com/wbkd/react-flow/issues/1641

function SystemNode({ data, isConnectable }) {
  const changeStyleOver = () => {
    console.log('over')
  }
  const changeStyleOut = () => {
    console.log('out')
  }
  return (
    <>
      <Handle position={Position.Top} id='a1' key='a1' type="source" className="handleSystemNodeSource"/>
      <Handle position={Position.Right} id="r1" key='r1' type="source" className="handleSystemNodeSource"/>
      <Handle position={Position.Bottom} id="b1" key='b1' type="target" className="handleSystemNodeTarget"/>
      <Handle position={Position.Left} id="l1" key='l1' type="target" className="handleSystemNodeTarget"/>
      <div className='systemNode' onMouseOver={changeStyleOver} onMouseOut={changeStyleOut}>
        {data.label}
      </div>
    </>
  );
}

export default SystemNode;