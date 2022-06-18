import util from '../util'

const updateRelation = async (relation) => {
  const url = `${util.getUrl()}/relations/${relation.id}`
  util.log(`Update relation ${url}`)
  const response = await fetch(url, {
    method: 'PATCH',
    headers: util.getAuth({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      description: relation.description,
      detail: relation.detail
    })
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    util.log(await response.json())
    throw new Error(message)
  }
}

const relation = {
  updateRelation
}

export default relation
