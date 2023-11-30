/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import User from './components/User'
import UsersPage from './components/UsersPage'
import Blog from './components/Blog'
import BlogPage from './components/BlogPage'
import UserInfo from './components/UserInfo'
import { initialBlogs } from './reducers/blogReducer'
import { handleLoggedInUser } from './reducers/loginReducer'
import { initialUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route
} from 'react-router-dom'



const App = () => {
  const user = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('getting blogs...')
    dispatch(initialBlogs())

    console.log('getting users...')
    dispatch(initialUsers())

    dispatch(handleLoggedInUser())
  }, [])

  if (user === null) {
    return (
      <div className="container-sm">
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="container-fluid">
      <Router>
        <ul className="navi">
          <li>
            <Link to="/" className="text-light">
              blogs
            </Link>
          </li>
          <li>
            <Link to="/users" className="text-light">
              users
            </Link>
          </li>

          <li style={{ float: 'right' }}>
            <UserInfo />
          </li>
        </ul>

        <div className="container-sm">
          <h2 id="header">BlogsApp</h2>
          <Notification />

          <Routes>
            <Route path="/" element={<BlogPage />} />
            <Route path="/users" element={<UsersPage users={users} />} />
            <Route path="/users/:id" element={<User users={users} />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
