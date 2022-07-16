import util from '../src/util'

test('isUndefined', async () => {
  expect(util.isUndefined(undefined)).toBe(true)
  expect(util.isUndefined(null)).toBe(true)
  expect(util.isUndefined('')).toBe(false)
  expect(util.isUndefined('sds')).toBe(false)
  expect(util.isUndefined(123)).toBe(false)
})

test('getUrl', async () => {
  expect(util.getUrl().length > 0).toBe(true)
})

describe('getAuth', () => {
  test('null', async () => {
    const nullResult = util.getAuth(null)
    expect(nullResult).toHaveProperty('authorization')
    expect(nullResult.authorization).toBe('Bearer undefined')
  })
  test('undefined', async () => {
    const undefinedResult = util.getAuth(undefined)
    expect(undefinedResult).toHaveProperty('authorization')
    expect(undefinedResult.authorization).toBe('Bearer undefined')
  })
  test('not null or undefined', async () => {
    const undefinedResult = util.getAuth({})
    expect(undefinedResult).toHaveProperty('authorization')
    expect(undefinedResult.authorization).toBe('Bearer undefined')
  })
  test('object with properties', async () => {
    const result = util.getAuth({ a: 1, b: 'b' })
    expect(result).toHaveProperty('a')
    expect(result).toHaveProperty('b')
    expect(result).toHaveProperty('authorization')
    expect(result.authorization).toBe('Bearer undefined')
  })
})

describe('prepareErrorToScreen', () => {
  test('null', async () => {
    expect(util.prepareErrorToScreen(null)).toBe('Oopss.. this is leak, there is no error to show')
  })
  test('undefined', async () => {
    expect(util.prepareErrorToScreen(undefined)).toBe(
      'Oopss.. this is leak, there is no error to show'
    )
  })
  test('not a string', async () => {
    expect(util.prepareErrorToScreen({})).toBe('Invalid call, expected string')
  })
  test('failed to fetch', async () => {
    expect(util.prepareErrorToScreen('failed to fetch')).toBe('The backend system is down/offline')
  })
  test('401', async () => {
    expect(util.prepareErrorToScreen('401')).toBe('Missing authentication')
  })
  test('default', async () => {
    expect(util.prepareErrorToScreen('default')).toBe('default')
  })
})
