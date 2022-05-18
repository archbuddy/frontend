import { Center } from '@chakra-ui/react'
import React, { memo } from 'react'
import { Handle } from 'react-flow-renderer'
import Node from './Node'

export const defaultData = {
  type: 'microserviceContainer',
  variant: 'internal',
  name: 'Microservice Container Name',
  description: 'Description of microservice type container role/responsibility.',
  typeDescription: 'e.g Micronaut, etc'
}

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
      className={`shape container ${p.variant} ${p.type}`}
      viewBox="0 0 200 170"
      scale="0.5"
    >
      <path d="M 25 42.5 L 44.93 8.62 Q 50 0 60 0 L 140 0 Q 150 0 155.07 8.62 L 194.93 76.38 Q 200 85 194.93 93.62 L 155.07 161.38 Q 150 170 140 170 L 60 170 Q 50 170 44.93 161.38 L 5.07 93.62 Q 0 85 5.07 76.38 Z" />

      <foreignObject className="texts" y="30" width="200" height="140">
        <Center className="name" style={{ padding: '0 10pt' }} textAlign="center">
          {p.name}
        </Center>
        <Center className="type">{p.typeDescription ?? p.type}</Center>
        <Center className="description">{p.description}</Center>
      </foreignObject>
    </svg>
  )
}

function Handles({ isConnectable }) {
  return (
    <>
      <Handle id="t" type="default" position="top" isConnectable={isConnectable} />
      <Handle
        id="tl"
        type="default"
        position="top"
        style={{ left: 55, top: 25 }}
        isConnectable={isConnectable}
      />
      <Handle
        id="tr"
        type="default"
        position="top"
        style={{ right: 45, top: 25, left: 'auto' }}
        isConnectable={isConnectable}
      />
      <Handle
        id="lt"
        type="default"
        position="left"
        style={{ top: 80, left: 20 }}
        isConnectable={isConnectable}
      />
      <Handle id="l" type="default" position="left" isConnectable={isConnectable} />
      <Handle
        id="lb"
        type="default"
        position="left"
        style={{ bottom: 75, top: 'auto', left: 20 }}
        isConnectable={isConnectable}
      />
      <Handle
        id="bl"
        type="default"
        position="bottom"
        style={{ left: 50, bottom: 30, top: 'auto' }}
        isConnectable={isConnectable}
      />
      <Handle
        id="br"
        type="default"
        position="bottom"
        style={{ right: 45, left: 'auto', bottom: 30, top: 'auto' }}
        isConnectable={isConnectable}
      />
      <Handle id="b" type="default" position="bottom" isConnectable={isConnectable} />
      <Handle
        id="rt"
        type="default"
        position="right"
        style={{ top: 80, right: 20, left: 'auto' }}
        isConnectable={isConnectable}
      />
      <Handle id="r" type="default" position="right" isConnectable={isConnectable} />
      <Handle
        id="rb"
        type="default"
        position="right"
        style={{ bottom: 75, top: 'auto', right: 20 }}
        isConnectable={isConnectable}
      />
    </>
  )
}

export default memo(function MicroserviceContainerNode(props) {
  const _props = {
    ...defaultData,
    ...props,
    ...{
      shape: Shape,
      handles: Handles
    }
  }
  return <Node {..._props} />
})
