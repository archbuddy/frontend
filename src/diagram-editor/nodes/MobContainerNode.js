import { Center } from '@chakra-ui/react'
import React, { memo } from 'react'
import Node from './Node'

export const defaultData = {
  type: 'mobContainer',
  variant: 'internal',
  name: 'Mobile Container Name',
  description: 'Description of web browser container role/responsibility.',
  typeDescription: 'e.g. JavaScript, Angular etc.'
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
      className={`shape ${p.variant} ${p.type}`}
      viewBox="0 0 240 160"
    >
      <rect
        x="0"
        y="0"
        width="240"
        height="160"
        rx="8"
        ry="8"
        style={{ fill: '#118acd', stroke: '#0e7dad' }}
      />
      <rect
        x="20"
        y="6.67"
        width="200"
        height="146.66"
        rx="7.33"
        ry="7.33"
        style={{ fill: '#23a2d9', stroke: '#23a2d9' }}
      />
      <ellipse cx="10" cy="80" rx="5" ry="5" style={{ fill: '#23a2d9', stroke: '#23a2d9' }} />
      <rect
        x="228"
        y="70"
        width="1"
        height="20"
        rx="0.5"
        ry="0.5"
        style={{ fill: '#23a2d9', stroke: '#23a2d9' }}
      />

      <foreignObject className="texts" y="30" width="100%" height="100%">
        <Center className="name">{p.name}</Center>
        <Center className="type">{p.typeDescription ?? p.type}</Center>
        <Center className="description">{p.description}</Center>
      </foreignObject>
    </svg>
  )
}

export default memo(function MobContainerNode(props) {
  const _props = {
    ...defaultData,
    ...props,
    ...{
      shape: Shape
    }
  }
  return <Node {..._props} />
})
