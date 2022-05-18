const endpoint = 'http://localhost:3000'
const { log } = require('../util')
const createNode = async (type, name, x, y, diagramId) => {
  const body = {
    type,
    name,
    x,
    y,
    diagram: diagramId
  }
  log(body)
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
  log(url)
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

const patchNode = async (node, diagram) => {
  const body = {
    name: node.data.label,
    x: node.position.x,
    y: node.position.y,
    diagram
  }
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
