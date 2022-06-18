import util from '../util'

const edgeCanConnect = (connection) => {
  util.log(`Connect nodes ${connection.source} > ${connection.target} `)
  const can = connection.source !== connection.target
  if (!can) {
    util.log('Opps, source and target are the same')
  }
  return can
}

const createEdge = async (connection, diagram) => {
  util.log(`Create edge on viewpoint ${diagram} values ${JSON.stringify(connection)}`)
  const body = {
    source: {
      handle: connection.sourceHandle,
      node: connection.source
    },
    target: {
      handle: connection.targetHandle,
      node: connection.target
    },
    diagram
  }
  util.log(body)
  const response = await fetch(`${util.getUrl()}/edges`, {
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

const deleteEdge = async (edgeId) => {
  const url = `${util.getUrl()}/edges/${edgeId}`
  util.log(`Deleting edge ${url}`)
  const response = await fetch(url, {
    method: 'DELETE',
    headers: util.getAuth({
      'Content-Type': 'application/json'
    })
  })

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`
    throw new Error(message)
  }
}

const edges = {
  edgeCanConnect,
  createEdge,
  deleteEdge
}

export default edges
