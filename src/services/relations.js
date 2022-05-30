import { log } from '../util'

const endpoint = 'http://localhost:3000'

const updateRelation = async (relation) => {
  const url = `${endpoint}/relations/${relation.id}`
  log(`Update relation ${url}`)
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: relation.description,
      detail: relation.detail
    })
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    log(await response.json())
    throw new Error(message)
  }
}

const relation = {
  updateRelation
}

export default relation
