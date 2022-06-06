import React, { useState } from 'react'
import srvEdges from './services/edges'
import srvRelations from './services/relations'
import { FaPen as EditIcon, FaTrashAlt as TrashIcon, FaSave as SaveIcon } from 'react-icons/fa'
import { MdCancel as Cancel } from 'react-icons/md'
import { log } from './util'

function ModalEdge({ edge, callback, closeModal }) {
  const [selectedRowEdgeId, setSelectedRowEdgeId] = useState('')
  const [inputEdge, setInputEdge] = useState('')

  const onClickSave = async () => {
    log(`Saving edge ${selectedRowEdgeId} with value ${inputEdge}`)
    // TODO detail field should be checked
    await srvRelations.updateRelation({
      id: selectedRowEdgeId,
      description: inputEdge,
      detail: ''
    })
    callback(true)
  }

  const deleteEdge = async (edgeId) => {
    // TODO it could receive a list of itens
    await srvEdges.deleteEdge(edgeId)
    callback(true)
  }

  const onSelectRow = (edgeId, edgeLabel) => {
    setSelectedRowEdgeId(edgeId)
    setInputEdge(edgeLabel)
  }

  const onClickClose = async () => {
    closeModal()
  }

  const renderLine = (item) => {
    if (selectedRowEdgeId === '') {
      return [
        <tr key={item.relation}>
          <td>{item.label}</td>
          <td>
            <button onClick={() => onSelectRow(item.relation, item.label)}>
              <EditIcon />
            </button>
            <button onClick={() => deleteEdge(item.relation)}>
              <TrashIcon />
            </button>
          </td>
        </tr>
      ]
    }

    return [
      <tr key={item.relation}>
        <td>{item.label}</td>
        <td></td>
      </tr>
    ]
  }

  const renderField = (item) => {
    return [
      <tr key={item.relation}>
        <td>
          <input type="text" onChange={(e) => setInputEdge(e.target.value)} value={inputEdge} />
        </td>
        <td>
          <button onClick={onClickSave}>
            <SaveIcon />
          </button>
          <button onClick={() => setSelectedRowEdgeId('')}>
            <Cancel />
          </button>
        </td>
      </tr>
    ]
  }

  const renderDataTable = () => {
    let list = [edge]
    if (edge.innerList !== undefined && edge.innerList.length >= 0) {
      list = edge.innerList
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
          {list.map((item) => {
            if (item.relation === selectedRowEdgeId) {
              return renderField(item)
            } else {
              return renderLine(item)
            }
          })}
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <p>Edge(s) selected data</p>
      {renderDataTable()}
      <br />
      <button onClick={onClickClose}>Close</button>
    </div>
  )
}

export default ModalEdge