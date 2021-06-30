import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })


  const handleTitleChange = (event) => {
    setNewBlog({
      ...newBlog,
      title: event.target.value
    })
  }


  const handleAuthorChange = (event) => {
    setNewBlog({
      ...newBlog,
      author: event.target.value
    })
  }


  const handleUrlChange = (event) => {
    setNewBlog({
      ...newBlog,
      url: event.target.value
    })
  }

  const handleCreate = () => {
    createBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }


  return (
    <div>
      <h2>Create New</h2>
      <div>
            title: <input
          type= "text"
          name= "title"
          id= 'title-input'
          value= {newBlog.title}
          onChange={handleTitleChange}  />
      </div>
      <div>
            author: <input
          type= "text"
          name= "title"
          id= 'author-input'
          value= {newBlog.author}
          onChange={handleAuthorChange} />
      </div>
      <div>
            url: <input
          id= "url-input"
          type= "text"
          name= "title"
          value= {newBlog.url}
          onChange={handleUrlChange} />
      </div>
      <button onClick={handleCreate} id="create-button">Create</button>
    </div>
  )
}

export default BlogForm
