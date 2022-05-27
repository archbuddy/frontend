import { Center } from '@chakra-ui/react'
import React, { memo } from 'react'
import { Handle } from 'react-flow-renderer'

import '../index.css'
import Node from './Node'

export const defaultData = {
  data: {
    name: 'Person Name',
    description: 'Description of person',
    variant: 'internal',
    typeDescription: 'Person'
  },
  type: 'person',
  showType: true,
  width: '200px'
}

export function Shape(props) {
  const p = {
    ...defaultData,
    ...props
  }
  p.data = {
    ...defaultData.data,
    ...props.data
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      className={'shape ' + p.data.variant + ' person'}
      viewBox="0 0 200 200"
    >
      <rect cx="0" y="40%" rx="15%" ry="15%" width="100%" height="60%" strokeMiterlimit="10" />

      <circle cx="50%" cy="23%" r="22%" />

      <foreignObject className="texts" y="45%" width="100%" height="55%">
        <Center className="name">{p.data.name}</Center>
        <Center className="type" hidden={!p.showType}>
          Person
        </Center>
        <Center className="description">{p.data.description}</Center>
      </foreignObject>
    </svg>
  )
}

function Handles({ isConnectable }) {
  return (
    <>
      <Handle id="t" type="default" position="top" isConnectable={isConnectable} />
      <Handle id="lt" type="default" position="left" isConnectable={isConnectable} />
      <Handle
        id="l"
        type="default"
        position="left"
        style={{ bottom: 55, top: 'auto' }}
        isConnectable={isConnectable}
      />
      <Handle
        id="lb"
        type="default"
        position="left"
        style={{ bottom: 15, top: 'auto' }}
        isConnectable={isConnectable}
      />
      <Handle
        id="bl"
        type="default"
        position="bottom"
        style={{ left: 25 }}
        isConnectable={isConnectable}
      />
      <Handle
        id="br"
        type="default"
        position="bottom"
        style={{ right: 25, left: 'auto' }}
        isConnectable={isConnectable}
      />
      <Handle id="b" type="default" position="bottom" isConnectable={isConnectable} />
      <Handle id="rt" type="default" position="right" isConnectable={isConnectable} />
      <Handle
        id="r"
        type="default"
        position="right"
        style={{ bottom: 55, top: 'auto' }}
        isConnectable={isConnectable}
      />
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

export default memo(function PersonNode(props) {
  const _props = {
    ...defaultData,
    ...props
  }
  return <Node shape={Shape} handles={Handles} {..._props} />
})
