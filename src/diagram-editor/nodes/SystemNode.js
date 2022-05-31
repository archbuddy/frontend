import React, { memo } from 'react'
import Node, { Shape as DefaultShape } from './Node'

export const defaultData = {
  data: {
    name: 'System Name',
    description: 'Description of software system',
    variant: 'internal',
    typeDescription: 'Software System'
  },
  type: 'system',
  width: '240px'
}

export function Shape(props) {
  const _props = {
    ...defaultData,
    ...props
  }
  _props.data = {
    ...defaultData.data,
    ...props.data
  }

  return DefaultShape(_props)
}

export default memo(function SystemNode(props) {
  const _props = {
    ...defaultData,
    ...props
  }
  _props.data = {
    ...defaultData.data,
    ...props.data
  }
  return <Node {..._props} />
})
