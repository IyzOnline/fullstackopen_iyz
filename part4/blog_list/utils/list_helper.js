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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}