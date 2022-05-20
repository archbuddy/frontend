import { Center } from '@chakra-ui/react'
import React, { memo } from 'react'
import Node from './Node'

export const defaultData = {
  type: 'webContainer',
  variant: 'internal',
  name: 'Web Container Name',
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
      className={`shape rectangle ${p.variant} ${p.type}`}
      viewBox="0 0 240 160"
    >
      <path
        d="M 0 8 C 0 3.58 3.58 0 8 0 L 232 0 C 236.42 0 240 3.58 240 8 L 240 152 C 240 156.42 236.42 160 232 160 L 8 160 C 3.58 160 0 156.42 0 152 Z"
        fill="#118acd"
        stroke="#0e7dad"
      />
      <path
        d="M 5 8 C 5 6.34 6.34 5 8 5 L 181 5 C 182.66 5 184 6.34 184 8 L 184 14 C 184 15.66 182.66 17 181 17 L 8 17 C 6.34 17 5 15.66 5 14 Z M 189 8 C 189 6.34 190.34 5 192 5 L 198 5 C 199.66 5 201 6.34 201 8 L 201 14 C 201 15.66 199.66 17 198 17 L 192 17 C 190.34 17 189 15.66 189 14 Z M 206 8 C 206 6.34 207.34 5 209 5 L 215 5 C 216.66 5 218 6.34 218 8 L 218 14 C 218 15.66 216.66 17 215 17 L 209 17 C 207.34 17 206 15.66 206 14 Z M 223 8 C 223 6.34 224.34 5 226 5 L 232 5 C 233.66 5 235 6.34 235 8 L 235 14 C 235 15.66 233.66 17 232 17 L 226 17 C 224.34 17 223 15.66 223 14 Z M 5 30 C 5 25.58 8.58 22 13 22 L 227 22 C 231.42 22 235 25.58 235 30 L 235 147 C 235 151.42 231.42 155 227 155 L 13 155 C 8.58 155 5 151.42 5 147 Z"
        fill="#23a2d9"
      />

      <foreignObject className="texts" y="30" width="100%" height="100%">
        <Center className="name">{p.name}</Center>
        <Center className="type">{p.typeDescription ?? p.type}</Center>
        <Center className="description">{p.description}</Center>
      </foreignObject>
    </svg>
  )
}

export default memo(function WebContainerNode(props) {
  const _props = {
    ...defaultData,
    ...props,
    ...{
      shape: Shape
    }
  }
  return <Node {..._props} />
})
