import { Center } from '@chakra-ui/react'
import React, { memo } from 'react'
import Node from './Node'

export const defaultData = {
  type: 'busContainer',
  variant: 'internal',
  name: 'Bus Container Name',
  description: 'Description of message bus type container role/responsibility.',
  typeDescription: 'e.g. Apache Kafka, etc.'
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
      viewBox="0 0 240 120"
      scale="0.5"
    >
      <path
        d="M 60 -45 C 60 -53.28 86.86 -60 120 -60 C 135.91 -60 151.17 -58.42 162.43 -55.61 C 173.68 -52.79 180 -48.98 180 -45 L 180 165 C 180 173.28 153.14 180 120 180 C 86.86 180 60 173.28 60 165 Z"
        transform="rotate(90,120,60)"
      />
      <path
        d="M 180 -45 C 180 -36.72 153.14 -30 120 -30 C 86.86 -30 60 -36.72 60 -45"
        transform="rotate(90,120,60)"
      />

      <foreignObject className="texts" y="15" width="210" height="120">
        <Center className="name" textAlign="center">
          {p.name}
        </Center>
        <Center className="type">{p.typeDescription ?? p.type}</Center>
        <Center className="description">{p.description}</Center>
      </foreignObject>
    </svg>
  )
}

export default memo(function BusContainerNode(props) {
  const _props = {
    ...defaultData,
    ...props,
    ...{
      shape: Shape
    }
  }
  return <Node {..._props} />
})
