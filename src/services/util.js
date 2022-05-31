export function buildFiqlQuery(fiql = null, offset = 0, limit = 10) {
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
