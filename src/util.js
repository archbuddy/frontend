const log = (param) => {
  // eslint-disable-next-line no-console
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

const prepareErrorToScreen = (err) => {
  if (!err) return 'Oopss.. this is leak, there is no error to show'

  if (err.toLowerCase().indexOf('failed to fetch') >= 0) {
    return 'The backend system is down/offline'
  }

  if (err.toLowerCase().indexOf('401') >= 0) {
    return 'Missing authentication'
  }

  return err
}

const getUrl = () => {
  return process.env.BACKEND_URL ?? 'http://localhost:3000'
}

const getAuth = (headers) => {
  return { ...headers, authorization: `Bearer ${localStorage.getItem('jwt')}` }
}

module.exports = {
  log,
  isUndefined,
  buildFiqlQuery,
  prepareErrorToScreen,
  getUrl,
  getAuth
}
