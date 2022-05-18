import { log } from '../util'

const endpoint = 'http://localhost:3000'

const edgeCanConnect = (connection) => {
  log(`Connect nodes ${connection.source} > ${connection.target} `)
  const can = connection.source !== connection.target
  if (!can) {
    log('Opps, source and target are the same')
  }
  return can
}

const createEdge = async (connection, diagram) => {
  const body = {
    ...connection,
    diagram
  }
  log(body)
  const response = await fetch(`${endpoint}/edges`, {
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

const deleteEdge = async (edgeId) => {
  const url = `${endpoint}/edges/${edgeId}`
  log(url)
  const response = await fetch(url, {
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

const edges = {
  edgeCanConnect,
  createEdge,
  updateEdge,
  deleteEdge
}

export default edges
