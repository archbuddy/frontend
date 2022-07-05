import util from '../util'

const list = async (fiql = null, offset = 0, limit = 10) => {
  let address = `${util.getUrl()}/entities${util.buildFiqlQuery(fiql, offset, limit)}`

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

const update = async (entity) => {
  const url = `${util.getUrl()}/entities/${entity.entity}`
  const body = entity
  delete body.entity
  util.log(`Update entity with id ${entity.entity} ${JSON.stringify(body)}`)
  const response = await fetch(url, {
    method: 'PUT',
    headers: util.getAuth({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(body)
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    util.log(await response.json())
    throw new Error(message)
  }
}

const create = async (body) => {
  const url = `${util.getUrl()}/entities`
  delete body.entity
  util.log(`Create a new entity ${JSON.stringify(body)}`)
  const response = await fetch(url, {
    method: 'POST',
    headers: util.getAuth({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(body)
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }

  // An async function always wraps the return value in a Promise. Using return await is therefore redundant.
  return response.json()
}

const entities = {
  list,
  update,
  create
}

export default entities
