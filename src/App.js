/* Jari Hartikainen, 13.6.2019 */
/* Aalto University, Course: Full Stack Web Development, Part 2: blogilistan frontrend 5.1 .... 5.6*/

import React, { useState, useEffect } from 'react' 
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './app.css'
import NewForm from './components/NewForm'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogList from './components/BlogList'

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
  const [blogVisible, setBlogVisible] = useState(false)
  const [count, setCount] = useState(0)
  
 
  // Only at a start-up, get all blogs from backend //
  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        initialBlogs.map (x => x.details = false)
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
      setTimeout(() => {
        setNotificationMessageType(null)
        setNotificationMessage(null)
      }, 5000)
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

  // User has decided to logout -> Step 2: logout command
  const handleLogOut = (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
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
        setTimeout(() => {
          setNotificationMessageType(null)
          setNotificationMessage(null)
        }, 5000)
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  

  // List all the blogs for the window
  const rows = () => blogs.map(blog => 
    <BlogList
      key={blog.id}
      blog={blog}
      showDetails={() => showDetailsOf(blog.id)}
      likes={() => likes()}
    />
  )

  // Handle visibility change between showing all blogs data, or just sub set of the blogs data
  const showDetailsOf = (_id) => {
    blogs[blogs.findIndex(x => x.id === _id)].details = !blogs[blogs.findIndex(x => x.id === _id)].details
    setBlogs(blogs)
    setCount(count+1)
   }

   // At the momenst this doesn't do anything
   const likes = () => {
     console.log("Likes voted")
   }


const loginForm = () => {
  return (
    <div>
      <LoginForm
        username = {username}
        password = {password}
        handleLogin = {handleLogin}
        handleUserName = {({ target }) => setUsername(target.value)}
        handlePassword = {({ target }) => setPassword(target.value)}
      />
    </div>
  )
}

const logoutForm = () => {
  return (
    <div>
      <LogoutForm
        handleLogOut = {handleLogOut}
        loggedPerson = {user.name}
      />
    </div>
  )
}

const newForm = () => {
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
return (
  <div>
    <div style={hideWhenVisible}>
      <button onClick={() => setBlogVisible(true)}>new note</button>
    </div>
    <div style={showWhenVisible}>
      <NewForm
          addBlog={addBlog}
          newAuthor={newAuthor}
          newUrl={newUrl}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
      />
        <button onClick={() => setBlogVisible(false)}>cancel</button>
    </div>
  </div>
  )
}

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