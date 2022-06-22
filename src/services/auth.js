import util from '../util'

const authenticate = async (type, params) => {
  const url = `${util.getUrl()}/authentication`
  util.log(`authentication ${url}`)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ type, params })
  })

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
  return await response.json()
}

const auth = {
  authenticate
}

export default auth
