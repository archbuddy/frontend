const endpoint = 'http://localhost:3000'

import { log, buildFiqlQuery } from '../util'

const list = async (fiql = null, offset = 0, limit = 10) => {
  let address = `${endpoint}/diagrams${buildFiqlQuery(fiql, offset, limit)}`

  const response = await fetch(address, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
  const data = await response.json()
  for (const item of data.data) {
    item.id = item._id
  }
  return data.data
}

const loadData = async (viewPointId) => {
  if (!viewPointId || viewPointId === 0) {
    throw new Error('invalid view point id')
  }
  log(`Getting data for viewpoint ${viewPointId}`)
  const response = await fetch(`${endpoint}/diagrams/${viewPointId}/reactflow`)
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
  const data = await response.json()
  return data
}

const create = async (name) => {
  log('Creating new view point')
  const response = await fetch(`${endpoint}/diagrams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name
    })
  })

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }

  const data = await response.json()
  return data.id
}

const nodes = {
  list,
  loadData,
  create
}

export default nodes
