const endpoint = 'http://localhost:3000'

const loadData = async () => {
  const response = await fetch(endpoint)
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
  const data = await response.json()
  return data
}

const general = {
  loadData
}

export default general
