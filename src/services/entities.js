import { buildFiqlQuery } from './util'

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

const entities = {
  list
}

export default entities