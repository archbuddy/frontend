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
  if (!viewPointId || viewPointId === 0) {
    throw new Error('invalid view point id')
  }
  const response = await fetch(`${endpoint}/diagrams/${viewPointId}/reactflow`)
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
  const data = await response.json()
  return data
}

// TODO remove this implementation and change for real time colaboration
// Like how it works with Miro
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

const create = async (name) => {
  const response = await fetch(`${endpoint}/diagrams`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name
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
  loadData,
  create
}

export default nodes
