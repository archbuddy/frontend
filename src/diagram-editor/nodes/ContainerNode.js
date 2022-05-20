import React, { memo } from 'react'
import Node, { Shape as DefaultShape } from './Node'

export const defaultData = {
  type: 'container',
  variant: 'internal',
  width: '240px',
  name: 'Container Name',
  description: 'Description of container',
  typeDescription: 'e.g SpringBoot, ElasticSearch, etc.'
}

export function Shape(props) {
  return DefaultShape(props)
}

export default memo(function ContainerNode(props) {
  const _props = {
    ...defaultData,
    ...props
  }
  return <Node {..._props} />
})
