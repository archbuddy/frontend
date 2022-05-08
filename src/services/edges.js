const endpoint = 'http://localhost:3000'

const edgeCanConnect = (connection) => {
  console.log(`Connect nodes ${connection.source} > ${connection.target} `)
  const can = connection.source !== connection.target
  if (!can) {
    console.log('Opps, source and target are the same')
  }
  return can
}

const createEdge = async (connection) => {
  const response = await fetch(`${endpoint}/edge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(connection)
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
}

const updateEdge = async (edge) => {
  const response = await fetch(`${endpoint}/edge`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(edge)
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
}

const deleteEdge = async (nodeId) => {
  const response = await fetch(`${endpoint}/edge/${nodeId}`, {
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
  edgeCanConnect,
  createEdge,
  updateEdge,
  deleteEdge
}
