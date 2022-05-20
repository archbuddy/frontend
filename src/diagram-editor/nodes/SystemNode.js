import React, { memo } from 'react'
import Node, { Shape as DefaultShape } from './Node'

export const defaultData = {
  type: 'system',
  variant: 'internal',
  width: '240px',
  name: 'System Name',
  description: 'Description of software system',
  typeDescription: 'Software System'
}

export function Shape(props) {
  return DefaultShape(props)
}

export default memo(function SystemNode(props) {
  const _props = {
    ...defaultData,
    ...props
  }
  return <Node {..._props} />
})
