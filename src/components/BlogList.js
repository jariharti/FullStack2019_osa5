// Render all blogs information, or subset of blogs information //
import React from 'react'

const BlogList = ({ blog, loggedIn, showDetails, likesBlog, deleteBlog }) => {

  var showWhenDetailsSelected = blog.details? '' : 'none'
  var showWhenSomeSelected = blog.details? 'none' : ''
  var showDetailsWithRemove = 'none'
  if (blog.details && (loggedIn === blog.user.username)) {
    showDetailsWithRemove = ''
    showWhenDetailsSelected = 'none'
  }


  // Define inline CSS //
  const blogStyleLimited = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: showWhenSomeSelected
  }

  // Define inline CSS in details view - no possibility to remove blog//
  const blogStyleWithoutRemove = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: showWhenDetailsSelected
  }

  // Define inline CSS in details view - with possibility to remove//
  const blogStyleWithRemove = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: showDetailsWithRemove
  }



  return (
    <div className='blog'>
      <div style={blogStyleLimited}>
        <button onClick={showDetails}> &nbsp; {blog.title} by {blog.author}</button>
      </div>

      <div style={blogStyleWithoutRemove}>
        <button onClick={showDetails}> &nbsp; {blog.title}</button> <br></br>
        <a href={blog.url}>{blog.url}</a> <br></br>
        {blog.likes} likes
        <button onClick={likesBlog}>like</button><br></br>
          added by {blog.author}<br></br>
      </div>

      <div style={blogStyleWithRemove}>
        <button onClick={showDetails}> &nbsp; {blog.title}</button> <br></br>
        <a href={blog.url}>{blog.url}</a> <br></br>
        {blog.likes} likes
        <button onClick={likesBlog}>like</button><br></br>
          added by {blog.author}<br></br>
        <button onClick={deleteBlog}>remove</button><br></br>
      </div>
    </div>
  )
}

export default BlogList