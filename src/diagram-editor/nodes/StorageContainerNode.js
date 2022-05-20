import { Center } from '@chakra-ui/react'
import React, { memo } from 'react'
import Node from './Node'

export const defaultData = {
  type: 'storageContainer',
  variant: 'internal',
  name: 'Storage Container Name',
  description: 'Description of storage type container role/responsibility.',
  typeDescription: 'e.g Postgres'
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
      className={`shape rectangle container ${p.variant} ${p.type}`}
      viewBox="0 0 240 120"
    >
      <path d="M 0 15 C 0 6.72 53.73 0 120 0 C 151.83 0 182.35 1.58 204.85 4.39 C 227.36 7.21 240 11.02 240 15 L 240 105 C 240 113.28 186.27 120 120 120 C 53.73 120 0 113.28 0 105 Z" />
      <path
        d="M 240 15 C 240 23.28 186.27 30 120 30 C 53.73 30 0 23.28 0 15"
        fill="none"
        stroke="#0e7dad"
      />

      <foreignObject className="texts" y="30" width="100%" height="100%">
        <Center className="name">{p.name}</Center>
        <Center className="type">{p.typeDescription ?? p.type}</Center>
        <Center className="description">{p.description}</Center>
      </foreignObject>
    </svg>
  )
}

export default memo(function StorageContainerNode(props) {
  const _props = {
    ...defaultData,
    ...props,
    ...{
      shape: Shape
    }
  }
  return <Node {..._props} />
})
