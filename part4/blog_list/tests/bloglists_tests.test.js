const app = require('../app')
const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const elpers = require('./test_helper')

api = supertest(app)

test('blogs are returned as json', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('valid blogs can be added', async () => {
  const currentBlogList = await elpers.getAllFromDB()
  
  const newBlog = new Blog({
    title: "Blue Gem Karambit",
    author: "Ohnepixel",
    url: "https://www.youtube.com/@ohnepixel",
    likes: 387,
  })

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedBlogList = await elpers.getAllFromDB()

  assert.strictEqual(updatedBlogList.length, currentBlogList.length + 1)  
})

after(async () => {
  await mongoose.connection.close()
})