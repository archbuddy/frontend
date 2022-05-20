import { Center } from '@chakra-ui/react'
import React, { memo } from 'react'
import { Handle } from 'react-flow-renderer'

import '../index.css'

export function Shape(props) {
  const p = {
    ...{
      showType: true,
      variant: 'internal'
    },
    ...props,
    ...props.data
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className={`shape rectangle ${p.variant} ${p.type}`}
      viewBox="0 0 240 125"
    >
      <rect rx="10%" ry="20%" width="100%" height="100%" strokeMiterlimit="10" />

      <foreignObject className="texts" y="15%" width="100%" height="100%">
        <Center className="name">{p.name}</Center>
        <Center className="type">{p.typeDescription ?? p.type}</Center>
        <Center className="description">{p.description}</Center>
      </foreignObject>
    </svg>
  )
}

function DefaultHandles({ isConnectable }) {
  return (
    <>
      <Handle id="t" type="default" position="top" isConnectable={isConnectable} />
      <Handle
        id="tl"
        type="default"
        position="top"
        style={{ left: 20 }}
        isConnectable={isConnectable}
      />
      <Handle
        id="tr"
        type="default"
        position="top"
        style={{ right: 20, left: 'auto' }}
        isConnectable={isConnectable}
      />
      <Handle
        id="lt"
        type="default"
        position="left"
        style={{ top: 20 }}
        isConnectable={isConnectable}
      />
      <Handle id="l" type="default" position="left" isConnectable={isConnectable} />
      <Handle
        id="lb"
        type="default"
        position="left"
        style={{ bottom: 20, top: 'auto' }}
        isConnectable={isConnectable}
      />
      <Handle
        id="bl"
        type="default"
        position="bottom"
        style={{ left: 20 }}
        isConnectable={isConnectable}
      />
      <Handle
        id="br"
        type="default"
        position="bottom"
        style={{ right: 20, left: 'auto' }}
        isConnectable={isConnectable}
      />
      <Handle id="b" type="default" position="bottom" isConnectable={isConnectable} />
      <Handle
        id="rt"
        type="default"
        position="right"
        style={{ top: 20 }}
        isConnectable={isConnectable}
      />
      <Handle id="r" type="default" position="right" isConnectable={isConnectable} />
      <Handle
        id="rb"
        type="default"
        position="right"
        style={{ bottom: 15, top: 'auto' }}
        isConnectable={isConnectable}
      />
    </>
  )
}

export default memo(function Node(props) {
  const _props = {
    ...{
      name: 'Name',
      showType: true,
      description: 'Description',
      variant: 'internal',
      size: {
        width: '240px'
      }
    },
    ...props,
    ...props.data
  }

  let shape = Shape(_props)
  if (props.shape) {
    shape = props.shape(_props)
  }

  let handles = DefaultHandles(_props)
  if (props.handles) {
    handles = props.handles(_props)
  }

  return (
    <div className="node" style={{ width: '100%', height: '100%' }}>
      {shape}
      {handles}
    </div>
  )
})
