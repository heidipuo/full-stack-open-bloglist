import { useState } from 'react'
import { deleteBlog, updateLikes, handleComment } from '../reducers/blogReducer'
import { deleteBlogFromUser } from '../reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

const Blog = () => {
  const [comment, setComment] = useState('')

  const loggedInUsername = useSelector((state) => state.login.username)
  const user = useSelector((state) =>
    state.users.find((user) => user.username === loggedInUsername)
  )

  const id = useParams().id
  const blog = useSelector((state) => state.blogs).find(
    (blog) => blog.id === id
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const addALike = async (event) => {
    event.preventDefault()

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(updateLikes(updatedBlog))
  }

  const setBlogToDelete = () => {
    if (
      window.confirm(`Do you want to delete "${blog.title}?" by ${blog.author}`)
    ) {
      dispatch(deleteBlog(blog.id))
      dispatch(deleteBlogFromUser(blog.id, user))
      navigate('/')
    }
  }

  const addComment = (event) => {
    event.preventDefault()
    const commentObj = {
      content: comment,
    }
    dispatch(handleComment(blog.id, commentObj))
    setComment('')
  }

  const handleCommentChange = (event) => {
    event.preventDefault()
    setComment(event.target.value)
  }

  if (!blog) {
    return null
  }

  return (
    <div id="blogInfo" className="row">
      <div className="col-md-6">
        <h3>
          {blog.title} by {blog.author}
        </h3>
        <p>
          {' '}
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          {blog.likes} likes{' '}
          <button
            id="normalButton"
            className="btn btn-primary"
            onClick={addALike}
          >
            like
          </button>
        </p>
        <p>Added by {blog.user.name}</p>
        {loggedInUsername === blog.user.username && (
          <button
            id="attentionButton"
            className="btn btn-primary"
            onClick={setBlogToDelete}
          >
            remove
          </button>
        )}
      </div>
      <div id="commentSection" className="col-6">
        <h3>Comments</h3>

        <form onSubmit={addComment}>
          <input type="text" value={comment} onChange={handleCommentChange} />
          <button type="submit" id="normalButton" className="btn btn-primary">
            comment
          </button>
        </form>
        <ul id="comments">
          {blog.comments.map((comment) => (
            <li key={blog.comments.indexOf(comment)}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
