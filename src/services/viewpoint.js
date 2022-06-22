import util from '../util'

const list = async (fiql = null, offset = 0, limit = 10) => {
  let address = `${util.getUrl()}/diagrams${util.buildFiqlQuery(fiql, offset, limit)}`

  const response = await fetch(address, {
    method: 'GET',
    headers: util.getAuth({
      'Content-Type': 'application/json'
    })
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
  const url = `${util.getUrl()}/diagrams/${viewPointId}/reactflow`
  util.log(`Getting data for viewpoint ${url}`)
  const response = await fetch(url, {
    method: 'GET',
    headers: util.getAuth({
      'Content-Type': 'application/json'
    })
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
  const data = await response.json()
  return data
}

const get = async (viewPointId) => {
  const url = `${util.getUrl()}/diagrams/${viewPointId}`
  util.log(`Getting data for viewpoint ${url}`)
  const response = await fetch(url, {
    method: 'GET',
    headers: util.getAuth({
      'Content-Type': 'application/json'
    })
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
  const data = await response.json()
  // TODO check how to fix this and similar situations on the backend
  data.id = data._id
  return data
}

const create = async (name) => {
  util.log('Creating new view point')
  const response = await fetch(`${util.getUrl()}/diagrams`, {
    method: 'POST',
    headers: util.getAuth({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      name
    })
  })

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }

  const data = await response.json()
  return data
}

const nodes = {
  list,
  loadData,
  create,
  get
}

export default nodes
