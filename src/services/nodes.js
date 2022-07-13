const util = require('../util')

const createNode = async (node, diagramId) => {
  const body = {
    x: node.position.x,
    y: node.position.y,
    variant: node.data.variant,
    diagram: diagramId,
    entity: node.data.entity.id
  }
  util.log(`Creating node ${JSON.stringify(body)}`)
  const response = await fetch(`${util.getUrl()}/nodes`, {
    method: 'POST',
    headers: util.getAuth({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(body)
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    util.log(await response.json())
    throw new Error(message)
  }
}

const deleteNode = async (nodeId) => {
  const url = `${util.getUrl()}/nodes/${nodeId}`
  util.log(`Deleting node ${url}`)
  const response = await fetch(url, {
    method: 'DELETE',
    headers: util.getAuth({
      'Content-Type': 'application/json'
    })
  })

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    util.log(await response.json())
    throw new Error(message)
  }
}

const patchNode = async (node) => {
  const body = { ...node }
  delete body.id
  const url = `${util.getUrl()}/nodes/${node.id}`
  util.log(body)
  util.log(`PATCH ${url}`)
  const response = await fetch(url, {
    method: 'PATCH',
    headers: util.getAuth({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(body)
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    util.log(await response.json())
    throw new Error(message)
  }
}

const nodes = {
  createNode,
  deleteNode,
  patchNode
}

export default nodes
