import util from '../util'

const update = async (relation) => {
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

/**
 * Return a list of relations between source and target
 * @param {String} source Source uuid
 * @param {String} target Target uuid
 * @param {String} text Text to filter
 * @returns array
 */
const search = async (source, target, text) => {
  let url = `${util.getUrl()}/relations/${source}/${target}`
  if (text) {
    url += `?name=${text}`
  }
  util.log(`Search relation ${url}`)
  const response = await fetch(url, {
    method: 'GET',
    headers: util.getAuth({
      'Content-Type': 'application/json'
    })
  })
  const data = await response.json()
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    util.log(data)
    throw new Error(message)
  }
  return data
}

const relation = {
  updateRelation: update,
  search
}

export default relation
