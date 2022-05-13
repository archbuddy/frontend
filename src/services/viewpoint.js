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

const savePosition = async (id, nodes, edges) => {
  const response = await fetch(`${endpoint}/viewpoint`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      nodes,
      edges
    })
  })

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
}

const nodes = {
  list,
  savePosition,
  loadData
}

export default nodes
