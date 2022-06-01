const log = (param) => {
  console.log(param)
}

const isUndefined = (param) => {
  return param === null || param === undefined
}

const buildFiqlQuery = (fiql = null, offset = 0, limit = 10) => {
  let query = ''
  let hasParameter = false

  if (fiql && fiql !== '') {
    query += `${hasParameter ? '&' : '?'}fiql=${encodeURI(fiql)}`
    hasParameter = true
  }

  if (offset) {
    query += `${hasParameter ? '&' : '?'}offset=${offset}`
    hasParameter = true
  }

  if (limit) {
    query += `${hasParameter ? '&' : '?'}offset=${limit}`
    hasParameter = true
  }

  return query
}

module.exports = {
  log,
  isUndefined,
  buildFiqlQuery
}
