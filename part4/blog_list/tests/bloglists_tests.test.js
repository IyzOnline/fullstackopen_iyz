const app = require('../app')
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const elpers = require('./test_helper')

api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(elpers.blogsForTesting)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('valid blogs can be added', async () => {
  const newBlog = {
    title: "Blue Gem Karambit",
    author: "Ohnepixel",
    url: "https://www.youtube.com/@ohnepixel",
    likes: 387,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const updatedBlogList = await elpers.getAllFromDB()

  assert.strictEqual(updatedBlogList.length, elpers.blogsForTesting.length + 1)  
})

describe('test missing fields', () => {
  test('missing title should not be allowed', async () => {
  const newBlog = {
    author: "Ohnepixel",
    url: "https://www.youtube.com/@ohnepixel",
    likes: 387,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
  })

  test('missing url should not be allowed', async () => {
    const newBlog = {
      title: "Blue Gem Karambit",
      author: "Ohnepixel",
      likes: 387,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

test('blog is deleted with status code 204', async () => {
    const initialBlogs = await elpers.getAllFromDB()
    const blogToDel = initialBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDel.id}`)
      .expect(204)

    const resultingBlogs = await elpers.getAllFromDB()
    assert(!resultingBlogs.includes(blogToDel.title))

    assert.strictEqual(resultingBlogs.length, elpers.blogsForTesting.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})