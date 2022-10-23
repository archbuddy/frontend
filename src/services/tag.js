import util from '../util'

const list = async (fiql = null, offset = 0, limit = 10) => {
  let address = `${util.getUrl()}/tags${util.buildFiqlQuery(fiql, offset, limit)}`

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
  return response.json()
}

const listByType = async (type) => {
  return list(`type==${type}`)
}

const tags = {
  list,
  listByType
}

export default tags
