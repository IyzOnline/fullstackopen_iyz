const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const { listWithNoBlogs, listWithOneBlog, listWithTenBlogs } = require('./test_helper')

api = supertest(app)

describe('get requests', () => {
  
})