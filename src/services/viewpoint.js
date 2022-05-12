const endpoint = 'http://localhost:3000'

const list = async () => {
  const response = await fetch(`${endpoint}/viewpoint`, {
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
  return data
}

const nodes = {
  list
}

export default nodes
