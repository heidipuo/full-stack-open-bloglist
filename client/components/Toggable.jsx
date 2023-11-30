import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div className="col-xl-6">
      <div style={hideWhenVisible}>
        <h2>Welcome to BlogsApp!</h2>
        <p className="fs-4 fw-light">
          Add a new blog or check the bloglist for interesting reading
        </p>
        <button
          id="normalButton"
          className="btn btn-primary"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </button>
      </div>
      <div className="addBlog" style={showWhenVisible}>
        {props.children}
        <button
          id="normalButton"
          className="btn btn-primary"
          onClick={toggleVisibility}
        >
          cancel
        </button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
