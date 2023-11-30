import BlogForm from './BlogForm'
import Togglable from './Toggable'
import BlogList from './BlogList'
import { useRef } from 'react'

const BlogPage = () => {
  const blogFormRef = useRef()
  return (
    <div className="row">
      <Togglable buttonLabel="Add blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default BlogPage
