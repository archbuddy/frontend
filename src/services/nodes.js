const endpoint = 'http://localhost:3000'

const createNode = async (type, value) => {
  const response = await fetch(`${endpoint}/system`, {
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

const saveAllNodePosition = async (listOfNodes) => {
  const response = await fetch(`${endpoint}/system`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(listOfNodes)
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

module.exports = {
  createNode,
  saveAllNodePosition,
  deleteNode
}
