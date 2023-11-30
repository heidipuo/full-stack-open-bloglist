import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  //className={props.style}
  if (notification) {
    return <div className="alert alert-secondary"> {notification} </div>
  } else {
    return null
  }
}

export default Notification
