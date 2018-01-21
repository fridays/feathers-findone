/* global test, expect */
const feathers = require('@feathersjs/feathers')
const memory = require('feathers-memory')
const findOne = require('./index')

test('Adds .findOne() service method', async () => {
  const app = feathers()
  .configure(findOne())
  .use('/messages', memory())

  const service = app.service('messages')

  const messages = await service.create([
    {text: 'Message 1'},
    {text: 'Message 2'}
  ])

  const message = await service.findOne()

  expect(message).toEqual(messages[0])
})
