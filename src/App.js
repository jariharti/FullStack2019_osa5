/* Jari Hartikainen, 13.6.2019 */
/* Aalto University, Course: Full Stack Web Development, Part 2: blogilistan frontrend 5.1 .... 5.4*/

import React, { useState, useEffect } from 'react' 
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './app.css'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationMessageType, setNotificationMessageType] = useState()
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null) 
  const [newTitle, setTitle] = useState('') 
  const [newAuthor, setAuthor] = useState('') 
  const [newUrl, setUrl] = useState('') 
  //const [loginVisible, setLoginVisible] = useState(false)
 
  // Only at a start-up, get all blogs from backend //
  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  // Only at a start-up, check if user already logged in. Login information is stored in the browser local storage //
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // User is trying to login to the system -> Step 2: Logging information is passed to the backend //
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setNotificationMessageType("success")
      setNotificationMessage(`${username} logged successfully`)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
        setNotificationMessageType("error")
        setNotificationMessage('invalid username or password')
        setTimeout(() => {
          setNotificationMessageType(null)
          setNotificationMessage(null)
        }, 5000)
    }
  }

  // User is trying to login to the system -> Step 1: user is giving login information in the window //
  const loginForm = () => {
    return (
    <form onSubmit={handleLogin}>
      <div>
      &nbsp; username &nbsp;
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
      &nbsp; password &nbsp;
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => {
            return setPassword(target.value);
          }}
        />
      </div>
      <button type="submit">login</button>
    </form>  
    )    
  }

  
    // User has decided to logout -> Step 1: a button creation for logout operation
  const logoutForm = () => {
    return (
    <form onSubmit={handleLogOut}>
      <p>
         {user.name} logged in
         <button type="submit">logout</button>
      </p>
    </form>  
    )
  }

  // User has decided to logout -> Step 2: logout command
  const handleLogOut = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
  }

  // User is creating a new blog -> Step 1: user is giving blog information in the window //
  const newForm = () => {

    //const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    //const showWhenVisible = { display: loginVisible ? '' : 'none' }
    
    return (
    <form onSubmit={addBlog}>
      <div>
        &nbsp; title &nbsp;
        <input
          type="text"
          value={newTitle}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        &nbsp; author &nbsp;
        <input
          type="text"
          value={newAuthor}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        &nbsp; url &nbsp;
        <input
          type="text"
          value={newUrl}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
      />
        </div>
      <button type="submit">create</button>
    </form>  
    )
  }

  // User is creating a new blog -> Step 2: Blog information is passed to the backend //
  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(newBlog).then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotificationMessageType("success")
        setNotificationMessage(`a new blog ${newTitle} by ${newAuthor} added`)
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  // List all the blogs for the window
  const rows = () => blogs.map(blog  => 
    <li key={blog.id}>className='blog'>
      {blog.title} &nbsp; by &nbsp; {blog.author}
    </li>
  )

  if (user === null) {
    return (
      <div>
        <Notification message={notificationMessage} notificationMessageType={notificationMessageType} />
        <h2>Log in to application</h2>
          {loginForm()}
      </div>
    )
  }

  else {
    return (
    <div>
      <Notification message={notificationMessage} notificationMessageType={notificationMessageType} />
      <h2>blogs</h2>
      {logoutForm()}
      {newForm()}
      {rows()}
    </div>
   )
  }
}

export default App