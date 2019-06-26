// User is creating a new blog -> Step 1: user is giving blog information in the window //
import React from 'react'
const NewForm = ({
  addBlog,
  newTitle,
  newAuthor,
  newUrl,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange
}) => {
  return (
    <form onSubmit={addBlog}>
      <div>
        &nbsp; title &nbsp;
        <input
          type="text"
          value={newTitle}
          name="title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        &nbsp; author &nbsp;
        <input
          type="text"
          value={newAuthor}
          name="author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        &nbsp; url &nbsp;
        <input
          type="text"
          value={newUrl}
          name="url"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}
export default NewForm