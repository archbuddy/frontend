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
  const response = await fetch(`${endpoint}/node/${nodeId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
}

const nodes = {
  createNode,
  deleteNode
}

export default nodes
