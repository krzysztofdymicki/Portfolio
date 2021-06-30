import React, { useState, useEffect } from 'react'
import Togglable from './components/Togglable'
import ListOfBlogs from './components/ListOfBlogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {

  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // ------------ HOOKS -----------------

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')

    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // ------------- HANDLERS -------------------

  const handlePasswordChange = (target) => {
    setPassword(target.value)
  }

  const handleUsernameChange = (target) => {
    setUsername(target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('click')
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage('You are logged in')
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
  }

  const createBlog = async (newObject) => {
    try{
      const newBlog = await blogService.create(newObject)
      setBlogs(blogs.concat(newBlog))
      setSuccessMessage('New blog added')
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    }catch(exception) {
      setErrorMessage('Error, blog is not added')
    }
  }

  const updateLikes = async (id, newObject) => {
    try{
      const updatedBlog = await blogService.updateLikes(id, newObject)
      setBlogs(blogs.map(blog => blog.id === id ? updatedBlog : blog))
    }catch(exception) {
      setErrorMessage('Error')
      setTimeout(() => {
        setErrorMessage('')
      }, 5000)
    }
  }

  const removeBlog = async (id) => {
    if(window.confirm('Are you sure you want to delete this blog?')){
      try{
        await blogService.removeBlog(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
      }catch(exception) {
        setErrorMessage('This is not your blog')
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
      }
    }
  }


  // ------------- BODY ------------------------

  return (
    <div>
      <p style={{ fontWeight: 'bold' }}>{user && `${user.username} is logged in`}</p>
      {user && <button onClick={handleLogout}> Logout </button>}
      <h2>Blog App</h2>
      <Notification
        errorMessage = {errorMessage}
        successMessage = {successMessage}
      />
      {user &&           <Togglable buttonLabel={'create'}>
        <BlogForm createBlog={createBlog} />
      </Togglable>}
      {!user && <LoginForm
        handleUsernameChange = {handleUsernameChange}
        handlePasswordChange = {handlePasswordChange}
        handleLogin = {handleLogin}
        handleLogout = {handleLogout}
        username = {username}
        password = {password}
      />}
      {user && <ListOfBlogs blogs={blogs} updateLikes={updateLikes} removeBlog={removeBlog}/>}
    </div>
  )
}

export default App