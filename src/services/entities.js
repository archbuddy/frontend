import { buildFiqlQuery, log } from '../util'
const endpoint = 'http://localhost:3000'

const list = async (fiql = null, offset = 0, limit = 10) => {
  let address = `${endpoint}/entities${buildFiqlQuery(fiql, offset, limit)}`

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

const update = async (entity) => {
  const url = `${endpoint}/entities/${entity.entity}`
  const body = entity
  delete body.entity
  log(`Update entity with id ${entity.entity} ${JSON.stringify(body)}`)
  const response = await fetch(url, {
    method: 'PUT',
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

const create = async (entity) => {
  const url = `${endpoint}/entities`
  const body = entity
  delete body.entity
  log(`Create a new entity ${JSON.stringify(body)}`)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
  const data = await response.json()
  return data
}

const entities = {
  list,
  update,
  create
}

export default entities
