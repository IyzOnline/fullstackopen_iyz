const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const { listWithNoBlogs, listWithOneBlog, listWithTenBlogs } = require('./test_helper')

test('dummy returns one', () => {
  const result = listHelper.dummy(listWithNoBlogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)  
  })

  test('when list has ten blogs, equal the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(listWithTenBlogs), 129)
  })

  test('when list has ten blogs, equal the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(listWithNoBlogs), 0)
  })
})

describe('favorite blog', () => {
  test('find favorite blog - 1 blog', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), listWithOneBlog[0])
  })

  test('find favorite blog - 10 blogs', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithTenBlogs), listWithTenBlogs[2])
  })

  test('find favorite blog - no blogs', () => {
    assert.strictEqual(listHelper.favoriteBlog(listWithNoBlogs), null)
  })
})

describe('most blogs', () => {
  test('find author w/ most blogs - 1 blog', () => {
    assert.strictEqual(listHelper.mostBlogs(listWithOneBlog), 'Edsger W. Dijkstra')
  })

  test('find author w/ most blogs - 10 blogs', () => {
    assert.strictEqual(listHelper.mostBlogs(listWithTenBlogs), 'Robert C. Martin')
  })

  test('find author w/ most blogs - no blogs', () => {
    assert.strictEqual(listHelper.mostBlogs(listWithNoBlogs), null)
  })
})

describe('most likes', () => {
  test('find author with most likes if 1 blog', () => {
    assert.strictEqual(listHelper.mostLikesAuthor(listWithOneBlog), 'Edsger W. Dijkstra')
  })

  test('find author with most likes if 10 blogs', () => {
    assert.strictEqual(listHelper.mostLikesAuthor(listWithTenBlogs), 'David Heinemeier Hansson')
  })

  test('find author with most likes if no blogs', () => {
    assert.strictEqual(listHelper.mostLikesAuthor(listWithNoBlogs), null)
  })
})