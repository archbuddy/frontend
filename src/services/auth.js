import util from '../util'

const authenticate = async (type, params) => {
  const url = `${util.getUrl()}/authentication/${type}`
  util.log(`authentication ${url}`)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ params })
  })

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }

  // An async function always wraps the return value in a Promise. Using return await is therefore redundant.
  return response.json()
}

const providers = async () => {
  const url = `${util.getUrl()}/authentication/providers`
  util.log(`authentication ${url}`)
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }

  // An async function always wraps the return value in a Promise. Using return await is therefore redundant.
  return response.json()
}
const auth = {
  authenticate,
  providers
}

export default auth
