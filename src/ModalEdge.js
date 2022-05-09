import React, { useState } from 'react'
import srvEdges from './services/edges'

function ModalEdge({ edge, callback, closeModal }) {
  const [inputEdgeLabel, setInputEdgeLabel] = useState(edge.label)

  const onClickSaveEdgeLabel = async () => {
    edge.label = inputEdgeLabel
    await srvEdges.updateEdge(edge)
    callback(true)
  }

  const onClickDeleteEdgeLabel = async () => {
    await srvEdges.deleteEdge(edge.id)
    callback(true)
  }

  const onClickClose = async () => {
    closeModal()
  }

  return (
    <div>
      <p>Edge operation</p>
      <input
        type="text"
        onChange={(e) => setInputEdgeLabel(e.target.value)}
        value={inputEdgeLabel}
      />
      <br />
      <button onClick={onClickSaveEdgeLabel}>Save Edge label</button>
      <br />
      <button onClick={onClickDeleteEdgeLabel}>Delete Edge</button>
      <br />
      <br />
      <button onClick={onClickClose}>Close</button>
    </div>
  )
}

export default ModalEdge
