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

  return authorWithMostBlogs.author
}

const mostLikesAuthor = (blogs) => {
  if (blogs.length === 0) return null
  // here, I will the manual step-by-step method instead of chaining
  // it's so I can learn more lol
  const blogsGroupedByAuthor = _.groupBy(blogs, 'author')

  const authorsWithTotalLikes = _.map(blogsGroupedByAuthor, (value, key) => {
    return ({
      author: key,
      likeCount: _.sumBy(value, 'likes')
    })
  })

  console.log('list of authors: \n', authorsWithTotalLikes)

  const authorWithMostLikes = _.maxBy(authorsWithTotalLikes, 'likeCount')
  
  console.log('author with most likes: \n', authorWithMostLikes)

  return authorWithMostLikes.author
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikesAuthor,
}