const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')
const blogs = require('../test_blogs.json')

test('dummy returns one', () => {
  const blogs = []

  const result = dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    expect(totalLikes([blogs[0]])).toBe(7)
  })

  test('when list has several blogs, equals the likes of that', () => {
    expect(totalLikes(blogs)).toBe(36)
  })

  test('when the list is empty, equals the likes of that', () => {
    expect(totalLikes([])).toBe(0)
  })
})

describe('favorite blog', () => {
  test('when list has only one blog, finds it', () => {
    expect(favoriteBlog([blogs[0]])).toEqual(
      {
        'title': 'React patterns',
        'author': 'Michael Chan',
        'likes': 7,
      }
    )
  })

  test('when list has several blogs, finds the most liked one', () => {
    expect(favoriteBlog(blogs)).toEqual(
      {
        'title': 'Canonical string reduction',
        'author': 'Edsger W. Dijkstra',
        'likes': 12,
      }
    )
  })

  test('when the list is empty, returns an object with empty values', () => {
    expect(favoriteBlog([])).toEqual({
      'title': '',
      'author': '',
      'likes': 0
    })
  })
})

describe('most blogs', () => {

  test('when list has only one blog, finds the author with blog number of 1', () => {
    expect(mostBlogs([blogs[0]])).toEqual({
      author: 'Michael Chan',
      blogs: 1
    })
  })

  test('when list has several blogs, finds the author with most blogs', () => {
    expect(mostBlogs(blogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

  test('when the list is empty, returns an object with empty values', () => {
    expect(mostBlogs([])).toEqual({ 'author': '', 'blogs': 0 })
  })
})

describe('most likes', () => {

  test('when list has only one blog, finds the author and the likes', () => {
    expect(mostLikes([blogs[0]])).toEqual({
      author: 'Michael Chan',
      likes: 7
    })
  })

  test('when list has several blogs, finds the author with most likes', () => {
    expect(mostLikes(blogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })

  test('when the list is empty, returns an object with empty values', () => {
    expect(mostLikes([])).toEqual({ 'author': '', 'likes': 0 })
  })

})