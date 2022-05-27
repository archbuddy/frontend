const endpoint = 'http://localhost:3000'

const list = async (fiql = null, offset = 0, limit = 10) => {
  let address = `${endpoint}/entities`
  let hasParameter = false

  if (fiql && fiql !== '') {
    address += `${hasParameter ? '&' : '?'}fiql=${encodeURI(fiql)}`
    hasParameter = true
  }

  if (offset) {
    address += `${hasParameter ? '&' : '?'}offset=${offset}`
    hasParameter = true
  }

  if (limit) {
    address += `${hasParameter ? '&' : '?'}offset=${limit}`
    hasParameter = true
  }

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
