const { test, after } = require('note:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

api = supertest(app)

test('notes are returned as json', async () => {
  await app
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
})