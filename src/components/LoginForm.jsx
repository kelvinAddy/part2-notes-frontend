const LoginForm = ({ logUserIn }) => {
  const handleLogin = async (formData) => {
    const userObj = {
      username: formData.get('username'),
      password: formData.get('password'),
    }
    logUserIn(userObj)

  }

  return (
    <>
      <h2>Login</h2>
      <form action={handleLogin}>
        <div>
          <label>
            Username :
            <input name="username" type="text" />
          </label>
        </div>
        <div>
          <label>
            Password :
            <input name="password" type="text" />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default LoginForm
