const endpoint = 'http://localhost:3000'

const list = async () => {
  const response = await fetch(`${endpoint}/diagrams`, {
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
  for (const item of data.data) {
    item.id = item._id
  }
  return data.data
}

const loadData = async (viewPointId) => {
  let url = endpoint
  if (viewPointId && viewPointId > 0) {
    url += `?viewpoint=${viewPointId}`
  }
  const response = await fetch(url)
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
  const data = await response.json()
  return data
}

const savePosition = async (viewPoint, nodes, edges) => {
  // TODO clear invalid information, but this in the future will be valid
  const nodesToBeSaved = []
  const edgesToBeSaved = []
  for (const node of nodes) {
    nodesToBeSaved.push({
      id: node.id,
      position: node.position
    })
  }
  for (const edge of edges) {
    if (edge.innerList) {
      for (const innerItem of edge.innerList) {
        edgesToBeSaved.push(innerItem.id)
      }
    } else {
      edgesToBeSaved.push(edge.id)
    }
  }
  const response = await fetch(`${endpoint}/viewpoint`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: viewPoint.id,
      name: viewPoint.name,
      nodes: nodesToBeSaved,
      edges: edgesToBeSaved
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
