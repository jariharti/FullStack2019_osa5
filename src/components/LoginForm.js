// User is trying to login to the system -> Step 1: user is giving login information in the window //
import React from 'react'
const LoginForm = (
  {
    handleLogin,
    username,
    password,
    handleUserName,
    handlePassword
  }
) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
      &nbsp; username &nbsp;
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUserName}
        />
      </div>
      <div>
      &nbsp; password &nbsp;
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePassword}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
