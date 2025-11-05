const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config.js')
const logger = require('./utils/logger.js')
const blogsRouter = require('./controllers/blogs.js')
const middleware = require('./utils/middleware.js')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Successfully connected to database.')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB: ', error.message)
  })

const app = express()

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware)

module.exports = app
