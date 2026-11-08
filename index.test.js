const test = require('node:test')
const assert = require('node:assert/strict')
const findOne = require('./index')

function setup (result) {
  const app = { mixins: [] }
  const calls = []
  const service = {
    find (params) {
      calls.push(params)
      return Promise.resolve(result)
    }
  }

  findOne()(app)
  app.mixins.forEach(mixin => mixin.call(app, service))

  return { service, calls }
}

test('returns the first item of a paginated result', async () => {
  const { service } = setup({ total: 2, limit: 1, skip: 0, data: [{ id: 1 }] })

  assert.deepEqual(await service.findOne(), { id: 1 })
})

test('returns the first item of an array result', async () => {
  const { service } = setup([{ id: 1 }, { id: 2 }])

  assert.deepEqual(await service.findOne(), { id: 1 })
})

test('returns undefined for an empty result', async () => {
  assert.equal(await setup({ total: 0, limit: 1, skip: 0, data: [] }).service.findOne(), undefined)
  assert.equal(await setup([]).service.findOne(), undefined)
})

test('calls find with $limit: 1', async () => {
  const { service, calls } = setup([])

  await service.findOne()
  await service.findOne({ provider: 'rest', query: { text: 'a', $limit: 10 } })

  assert.deepEqual(calls, [
    { query: { $limit: 1 } },
    { provider: 'rest', query: { text: 'a', $limit: 1 } }
  ])
})

test('does not mutate params', async () => {
  const { service } = setup([])
  const query = { text: 'a' }
  const params = { provider: 'rest', query }
  const withoutQuery = { provider: 'rest' }

  await service.findOne(params)
  await service.findOne(withoutQuery)

  assert.equal(params.query, query)
  assert.deepEqual(params, { provider: 'rest', query: { text: 'a' } })
  assert.deepEqual(withoutQuery, { provider: 'rest' })
})
