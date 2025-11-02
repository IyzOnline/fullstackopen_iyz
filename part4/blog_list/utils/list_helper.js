const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reduce = (sum, item) => {
    return sum + item.likes
  }

  return blogs.reduce(reduce, 0)
}

const favoriteBlog = (blogs) => {
  const findMaxReducer = (max, cur) => {
    if (cur.likes > max.likes) {
      return cur
    }
    
    return max
  }

  return blogs.length === 0 
    ? null 
    : blogs.reduce(findMaxReducer)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const authorWithMostBlogs = _.chain(blogs)
    .groupBy('author')
    .map((blogs, author) => ({author: author, blogCount: blogs.length}))
    .maxBy('blogCount')
    .value()

  console.log(authorWithMostBlogs)

  return authorWithMostBlogs.author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}