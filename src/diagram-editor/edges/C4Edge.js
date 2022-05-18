import React from 'react'
import { getBezierPath, getEdgeCenter } from 'react-flow-renderer'

export default function C4Edge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd
}) {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  })

  const [centerX, centerY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY
  })

  return (
    <>
      <g>
        <path id={id} className="react-flow__edge-path" d={edgePath} markerEnd={markerEnd} />
        <g>
          <defs>
            <filter x="0" y="0" width="1" height="1" id="solid">
              <feFlood floodColor="white" result="bg" />
              <feMerge>
                <feMergeNode in="bg" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <text
            filter="url(#solid)"
            x={centerX}
            y={centerY}
            startOffset="50%"
            textAnchor="middle"
            style={{
              fontSize: '12pt',
              color: '#000'
            }}
          >
            <tspan x={centerX} dy="0" fontWeight={'bold'}>
              e.g. Makes API calls
            </tspan>
            <tspan x={centerX} dy="1.2em">
              [e.g. JSON/HTTP]
            </tspan>
          </text>
        </g>
      </g>
    </>
  )
}
