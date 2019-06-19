// Render all blogs infomration, or subset of blogs information //
import React from 'react'

const BlogList = ({ blog, showDetails, likes}) => {

  const showWhenDetailsSelected = blog.details? '' : 'none'
  const showWhenSomeSelected = blog.details? 'none' : ''

  // Define inline CSS //
  const blogStyleLimited = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: showWhenSomeSelected
  }

  // Define inline CSS //
  const blogStyleAll = {
    paddingTop: 2,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    display: showWhenDetailsSelected
  }


  return (
    <div className='blog'>
       <div style={blogStyleLimited}>
          <button onClick={showDetails}> &nbsp; {blog.title} by {blog.author}</button>
      </div>
     
      <div style={blogStyleAll}>
          <button onClick={showDetails}> &nbsp; {blog.title}</button> <br></br>
          <a href={blog.url}>{blog.url}</a> <br></br>
          {blog.likes} likes
          <button onClick={likes}>like</button><br></br>
          added by {blog.author}
      </div>
    </div>
    )  
  }

export default BlogList