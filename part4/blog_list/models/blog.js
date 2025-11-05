const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: String,
  url: String,
  likes: {
    type: String,
    default: 0
  },
})

blogSchema.set('toJSON', {
  virtuals: true,
  transform: (docu, ret) => {
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
