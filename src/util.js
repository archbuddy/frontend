const log = (param) => {
  console.log(param)
}

const isUndefined = (param) => {
  return param === null || param === undefined
}

module.exports = {
  log,
  isUndefined
}
