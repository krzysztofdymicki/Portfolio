import React from 'react'

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin
}) => {

  return (
    <div className='login-form-container'>
      <form onSubmit= {handleLogin}>
        <div>
                  username
          <input
            type= "text"
            name= "username"
            id= "username-input"
            value= {username}
            onChange= {({ target }) => handleUsernameChange(target)}
          />
        </div>
        <div>
                 password
          <input
            type= "password"
            name= "password"
            id= "password-input"
            value= {password}
            onChange= {({ target }) => handlePasswordChange(target)}
          />
        </div>
        <button type= "submit" id="login-button">Login</button>
      </form>
    </div>
  )
}

export default LoginForm
