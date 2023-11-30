import { useDispatch } from 'react-redux'
import { handleLogin } from '../reducers/loginReducer'
import { useState } from 'react'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const logIn = (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    dispatch(handleLogin(username, password))

    setUsername('')
    setPassword('')
  }

  const handleUsernameChange = (event) => {
    event.preventDefault()
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    event.preventDefault()
    setPassword(event.target.value)
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={logIn}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button id="normalButton" className="btn btn-primary" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm
