import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'

const blog = {
  title: 'Testipostaus',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 51,
  user: {
    username: 'Heidi',
  },
}

test('renders content', () => {
  render(<Blog blog={blog} />)

  const element = screen.getAllByText('Testipostaus', { exact: false })
})

test('url, likes and user are displayed when the view button is clicked', async () => {
  const { container } = render(<Blog blog={blog} />)
  const blogInfoDiv = container.querySelector('.blogInfo')

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(blogInfoDiv).not.toHaveStyle({ display: 'none' })
  expect(blogInfoDiv).toHaveTextContent(
    'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll'
  )
  expect(blogInfoDiv).toHaveTextContent('51')
  expect(blogInfoDiv).toHaveTextContent('Heidi')
})

test('like button is clicked twice', async () => {
  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleLikeChange={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const inputTitle = container.querySelector('.title')
  const inputAuthor = container.querySelector('.author')
  const inputUrl = container.querySelector('.url')
  const sendButton = screen.getByText('create')

  await user.type(inputTitle, 'test title')
  await user.type(inputAuthor, 'test author')
  await user.type(inputUrl, 'test url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('test title')
  expect(createBlog.mock.calls[0][0].author).toBe('test author')
  expect(createBlog.mock.calls[0][0].url).toBe('test url')
})
