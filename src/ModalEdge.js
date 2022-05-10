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

  const renderDataTable = () => {
    if (edge.innerList === undefined || edge.innerList.length === 0) {
      return
    }

    return (
      <table>
        <thead>
          <tr>
            <td>Label</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {edge.innerList.map((item) => {
            return [
              <tr key={item.id}>
                <td>{item.label}</td>
                <td>a | b</td>
              </tr>
            ]
          })}
        </tbody>
      </table>
    )
  }

  const renderInputCommand = () => {
    if (edge.innerList !== undefined && edge.innerList.length > 0) {
      return
    }
    return (
      <input
        type="text"
        onChange={(e) => setInputEdgeLabel(e.target.value)}
        value={inputEdgeLabel}
      />
    )
  }

  return (
    <div>
      <p>Edge operation</p>
      {renderInputCommand()}
      {renderDataTable()}
      <br />
      <button onClick={onClickSaveEdgeLabel}>Save Edge label</button>
      &nbsp;&nbsp;&nbsp;
      <button onClick={onClickDeleteEdgeLabel}>Delete Edge</button>
      <br />
      <br />
      <button onClick={onClickClose}>Close</button>
    </div>
  )
}

export default ModalEdge
