const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reduce = (sum, item) => {
    console.log('item likes:', item.likes)
    return sum + item.likes
  }

  return blogs.reduce(reduce, 0)
}

module.exports = {
  dummy,
  totalLikes
}