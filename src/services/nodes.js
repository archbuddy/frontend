const endpoint = 'http://localhost:3000'
const { log } = require('../util')
import { v4 as uuidv4 } from 'uuid'

const createNode = async (node, diagramId) => {
  const body = {
    _id: node.id ?? uuidv4(),
    x: node.position.x,
    y: node.position.y,
    variant: node.data.variant,
    diagram: diagramId,
    entity: node.data.entity
  }
  log(`Creating node ${JSON.stringify(body)}`)
  const response = await fetch(`${endpoint}/nodes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    log(await response.json())
    throw new Error(message)
  }
}

const deleteNode = async (nodeId) => {
  const url = `${endpoint}/nodes/${nodeId}`
  log(`Deleting node ${url}`)
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    log(await response.json())
    throw new Error(message)
  }
}

const patchNode = async (node) => {
  const body = { ...node }
  delete body.id
  log(body)

  const response = await fetch(`${endpoint}/nodes/${node.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    log(await response.json())
    throw new Error(message)
  }
}

const nodes = {
  createNode,
  deleteNode,
  patchNode
}

export default nodes
