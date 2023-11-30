import Blog from './Blog'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  return (
    <div className="col-xl-6">
      <h2>Bloglist</h2>
      <ul>
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li className="blog" key={blog.id}>
              <Link className="text-dark" to={`/blogs/${blog.id}`}>
                {blog.title} by {blog.author}{' '}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BlogList
