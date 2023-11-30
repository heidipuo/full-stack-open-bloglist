import { Link } from 'react-router-dom'

const UsersPage = ({ users }) => {
  return (
    <div className="row justify-content-center">
      <div id="usersPage" className="col-lg-6">
        <div>
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>blogs created</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <th>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </th>
                  <th>{user.blogs.length}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UsersPage
