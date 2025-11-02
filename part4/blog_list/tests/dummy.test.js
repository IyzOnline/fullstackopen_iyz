const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const listWithTenBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'Canonical string representation in JSON',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/ewd08xx/EWD808.PDF',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'TDD is dead. Long live testing.',
      author: 'David Heinemeier Hansson',
      url: 'http://david.heinemeierhansson.com/2014/tdd-is-dead-long-live-testing.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDetails.html',
      likes: 8,
      __v: 0
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Refactoring: Improving the Design of Existing Code',
      author: 'Martin Fowler',
      url: 'https://martinfowler.com/books/refactoring.html',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422bdc1b54a676234d17fd',
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      url: 'https://www.oreilly.com/library/view/clean-code-a/9780132350884/',
      likes: 15,
      __v: 0
    },
    {
      _id: '5a422be31b54a676234d17fe',
      title: 'The Mythical Man-Month: Essays on Software Engineering',
      author: 'Frederick Brooks Jr.',
      url: 'https://en.wikipedia.org/wiki/The_Mythical_Man-Month',
      likes: 20,
      __v: 0
    },
    {
      _id: '5a422bfc1b54a676234d17ff',
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      author: 'Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides',
      url: 'https://en.wikipedia.org/wiki/Design_Patterns',
      likes: 18,
      __v: 0
    },
    {
      _id: '5a422c071b54a676234d1800',
      title: 'Code Complete: A Practical Handbook of Software Construction',
      author: 'Steve McConnell',
      url: 'https://www.microsoftpressstore.com/store/code-complete-second-edition-9780735619678',
      likes: 9,
      __v: 0
    }
  ]

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  const listWithNoBlogs = []

test('dummy returns one', () => {
  const result = listHelper.dummy(listWithNoBlogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5)  
  })

  test('when list has ten blogs, equal the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(listWithTenBlogs), 106)
  })

  test('when list has ten blogs, equal the likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(listWithNoBlogs), 0)
  })
})

describe('favorite blog', () => {
  test('find favorite blog if there is only blog', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), listWithOneBlog[0])
  })

  test('find favorite blog if there are ten blogs', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithTenBlogs), listWithTenBlogs[7])
  })

  test('find favorite blog if there are no blogs', () => {
    assert.strictEqual(listHelper.favoriteBlog(listWithNoBlogs), null)
  })
})

describe('author with most blogs', () => {
  test('find author with most blogs if there is only blog', () => {
    assert.strictEqual(listHelper.mostBlogs(listWithOneBlog), 'Edsger W. Dijkstra')
  })

  test('find author with most blogs if there are ten blogs', () => {
    assert.strictEqual(listHelper.mostBlogs(listWithTenBlogs), 'Robert C. Martin')
  })

  test('find author with most blogs if there are no blogs', () => {
    assert.strictEqual(listHelper.mostBlogs(listWithNoBlogs), null)
  })
})