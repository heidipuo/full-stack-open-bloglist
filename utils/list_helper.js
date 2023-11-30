const { countBy } = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce( (sum, blog) => {
    return sum + blog.likes
  } ,0)
}

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce( (max, blog) => {
    return blog.likes > max
      ? max = blog.likes
      : max
  }, 0)

  const mostLikedBlog = blogs.find( blog => blog.likes === mostLikes)

  return mostLikedBlog
    ? {
      'title': mostLikedBlog.title,
      'author': mostLikedBlog.author,
      'likes': mostLikedBlog.likes
    }
    : {
      'title': '',
      'author': '',
      'likes': 0
    }
}
/**
   * Takes an array of blogs, counts the blogs of each author and
   * returns the author with the most blogs and the number of blogs
   * @param array of blog objects
   * @returns an object containing the author with most blogs and the number of blogs
   */
const mostBlogs = (blogs) => {

  const blogsPerAuthor = Object.entries(countBy( blogs, (blog) =>  blog.author))

  const authorWithMostBlogs = blogsPerAuthor.reduce((max, [key, val]) => {
    return val > max[1]
      ? [key , val]
      : max
  },['' , 0])

  return {
    'author': authorWithMostBlogs[0],
    'blogs': authorWithMostBlogs[1]
  }
}

/**
   * Takes a list of blogs and counts the total of likes for each author. Returns the most
   * liked author with the number of likes
   * @param array of blog objects
   * @returns an object with most liked author and the number of likes
   *
   */
const mostLikes = (blogs) => {

  const likesOfAuthors = blogs.reduce((list, blog) => {

    if (!list.find(listItem => blog.author === listItem.author)) {
      list.push({ 'author': blog.author, 'likes': blog.likes })
    } else {
      const objIndex = list.findIndex(listItem => listItem.author === blog.author)
      list[objIndex].likes = list[objIndex].likes + blog.likes
    }
    return list

  }, [])

  const mostLikedAuthor = likesOfAuthors.reduce((mostLiked, author) => {
    return author.likes > mostLiked.likes
      ? { 'author': author.author, 'likes': author.likes }
      : mostLiked
  }, { 'author': '', 'likes': 0 })

  return mostLikedAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}