import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      console.log('notificate', action.payload)
      return action.payload
    },
    resetNotification(state, action) {
      return ''
    },
  },
})

export const { createNotification, resetNotification } =
  notificationSlice.actions

export const setNotification = (content, time) => {
  return (dispatch) => {
    dispatch(createNotification(content))
    setTimeout(() => {
      dispatch(resetNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
