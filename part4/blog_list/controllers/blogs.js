const blogsRouter = require('express').Router()
const note = require('../../../learning/backend/models/note.js')
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json({ blogs })
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const result = await blog.save()
  
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  console.log("This is the req body: ", request.body)
  const noteCheck = await Blog.findById(request.params.id)

  for (key of Object.keys(noteCheck)) {
    if (request.body[key]) {
      noteCheck[key] = request.body[key]
    }
  }

  await noteCheck.save()
  response.status(200).json(noteCheck)
})

module.exports = blogsRouter