const endpoint = 'http://localhost:3000'

const loadData = async (viewPointId) => {
  let url = endpoint
  if (viewPointId && viewPointId > 0) {
    url += `?viewPoint=${viewPointId}`
  }
  const response = await fetch(url)
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
