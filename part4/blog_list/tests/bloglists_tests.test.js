const app = require('../app')
const { test, after } = require('node:test') 
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const { listWithNoBlogs, listWithOneBlog, listWithTenBlogs } = require('./test_helper')

api = supertest(app)

test('notes are returned as json', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  console.log(res.body)
})

after(async () => {
  await mongoose.connection.close()
})