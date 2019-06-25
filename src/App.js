/* Jari Hartikainen, 25.6.2019 */
/* Aalto University, Course: Full Stack Web Development, Part 2: blogilistan frontrend 5.1 .... 5.10*/

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
  const [loggedIn, setLoggedIn] = useState(null) 
  const [newTitle, setTitle] = useState('') 
  const [newAuthor, setAuthor] = useState('') 
  const [newUrl, setUrl] = useState('') 
  const [blogVisible, setBlogVisible] = useState(false)
  const [count, setCount] = useState(0)
  const [count2, setCoun2] = useState(0)
 
  // Get all blogs from backend, whenver count2 is changing //
  useEffect(() => {
    blogService
      .getAll().then(initialBlogs => {
        initialBlogs.map (x => x.details = false)
        setBlogs(initialBlogs.sort((a,b) => b.likes - a.likes))
      })
  }, [count2])


  // Only at a start-up, check if user already logged in. Login information is stored in the browser local storage //
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const loggedIn = JSON.parse(loggedUserJSON)
      setLoggedIn(loggedIn)
      blogService.setToken(loggedIn.token)
    }
  }, [])

  // User is trying to login to the system -> Step 2: Logging information is passed to the backend //
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedIn = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(loggedIn))
      blogService.setToken(loggedIn.token)
      setNotificationMessageType("success")
      setNotificationMessage(`${username} logged successfully`)
      setTimeout(() => {
        setNotificationMessageType(null)
        setNotificationMessage(null)
      }, 5000)
      setLoggedIn(loggedIn)
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
        setBlogs(blogs.concat(returnedBlog).sort((a,b) => b.likes - a.likes))
        setTitle('')
        setAuthor('')
        setUrl('')
        setNotificationMessageType("success")
        setNotificationMessage(`a new blog ${newTitle} by ${newAuthor} added`)
        setTimeout(() => {
          setNotificationMessageType(null)
          setNotificationMessage(null)
        }, 5000)
      })
  }

  

  // List all the blogs for the window
  const rows = () => blogs.map(blog => 
    <BlogList
      key={blog.id}
      blog={blog}
      loggedIn={loggedIn.username}
      showDetails={() => showDetailsOf(blog.id)}
      likesBlog={() => likes(blog.id)}
      deleteBlog={() => deleteBlog(blog.id)}
    />
  )

  // Handle visibility change between showing all blogs data, or just sub set of the blogs data
  const showDetailsOf = (_id) => {
    blogs[blogs.findIndex(x => x.id === _id)].details = !blogs[blogs.findIndex(x => x.id === _id)].details
    setBlogs(blogs.sort((a,b) => b.likes - a.likes))
    setCount(count+1)
   }

   // Update new likes to backened
   const likes = (_id) => {
    var arrayIndex = blogs.findIndex(x => x.id === _id)
      blogs[arrayIndex].likes = blogs[arrayIndex].likes + 1
      setBlogs(blogs.sort((a,b) => b.likes - a.likes))
      var updatedObject = {
        likes: blogs[arrayIndex].likes,
        author: blogs[arrayIndex].author,
        title: blogs[arrayIndex].title,
        url: blogs[arrayIndex].url
      }

    blogService
      .update(_id,updatedObject).then(returnedBlog => {
        setNotificationMessageType("success")
        setNotificationMessage(`a new like updated to backend`)
        setTimeout(() => {
          setNotificationMessageType(null)
          setNotificationMessage(null)
        }, 5000)
      })
   }

  // Delete blog in backened 
  const deleteBlog = async (_id) => {
    var arrayIndex = blogs.findIndex(x => x.id === _id)
    var blogToBeDeleted = blogs[arrayIndex].title
    if (window.confirm(`remove blog ${blogToBeDeleted} by ${blogs[arrayIndex].author}`)) {
    try {
      await blogService.remove(_id)
          setCoun2(count2+1)
          setNotificationMessageType("success")
          setNotificationMessage(`Blog ${blogToBeDeleted} deteled from backend`)
        } catch (error) {
        setNotificationMessageType("error")
        setNotificationMessage(JSON.stringify(error.response.data.error))
      }
    setTimeout(() => {
      setNotificationMessageType(null)
      setNotificationMessage(null)
    }, 5000)
    }
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
        loggedPerson = {loggedIn.name}
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
          newTitle={newTitle}
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

  if (loggedIn === null) {
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