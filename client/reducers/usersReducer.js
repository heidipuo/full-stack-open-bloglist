import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'
import blogService from '../services/blogs'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    handleUserUpdate(state, action) {
      const users = state.map((user) =>
        user.id === action.payload.id ? action.payload : user
      )
      return users
    },
  },
})

const generateTemporateId = () => {
  return Math.floor(Math.random() * 100000)
}

export const { setUsers, handleUserUpdate } = usersSlice.actions

export const initialUsers = () => {
  return async (dispatch) => {
    const users = await usersService.getAll()
    dispatch(setUsers(users))
  }
}

export const addBlogToUser = (newBlog, user) => {
  return (dispatch) => {
    newBlog.id = generateTemporateId()
    const userUpdated = {
      ...user,
      blogs: user.blogs.concat(newBlog),
    }
    dispatch(handleUserUpdate(userUpdated))
  }
}

export const deleteBlogFromUser = (id, user) => {
  return async (dispatch) => {
    const blogsFromDB = await blogService.getAll()
    const updatedBlogs = blogsFromDB
      .filter((blog) => blog.user.id === user.id)
      .filter((blog) => blog.id !== id)

    const userUpdated = {
      ...user,
      blogs: updatedBlogs,
    }

    dispatch(handleUserUpdate(userUpdated))
  }
}

export default usersSlice.reducer
