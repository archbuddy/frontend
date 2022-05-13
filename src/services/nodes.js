const endpoint = 'http://localhost:3000'

const createNode = async (type, value) => {
  const response = await fetch(`${endpoint}/node`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: value })
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
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
