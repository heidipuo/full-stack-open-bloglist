const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})


blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id.toString()
  })

  let savedBlog = await blog.save()
  savedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
  console.log('saved', savedBlog)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(400).json({ error: 'No such blog in database' })
  } else {

    if (blog.user.toString() === request.user._id.toString()) {
      await Blog.findByIdAndRemove(blog.id)
      response.status(204).end()
    }else{
      response.status(400)
    }
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = {
    title: request.body.title,
    author:request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  }

  let result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  result = await result.populate('user', { username: 1, name: 1 })
  response.json(result)

})

blogsRouter.post('/:id/comments', async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    comments: blog.comments.concat(request.body.content)
  }
  console.log('updated', updatedBlog)
  let result  = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  result = await result.populate('user', { username: 1, name: 1 })
  console.log('res', result)
  response.json(result)
})

module.exports = blogsRouter