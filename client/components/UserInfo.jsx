import { useDispatch, useSelector } from 'react-redux'
import { handleLogout } from '../reducers/loginReducer'

const UserInfo = () => {
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const logout = (event) => {
    event.preventDefault()
    console.log('logging out', user.username)
    dispatch(handleLogout())
  }

  return (
    <div style={{ marginBottom: 20, color: 'white' }}>
      {user.name} logged in{' '}
      <button id="normalButton" className="btn btn-primary" onClick={logout}>
        logout
      </button>
    </div>
  )
}

export default UserInfo
