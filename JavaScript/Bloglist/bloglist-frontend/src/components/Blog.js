/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, updateLikes, removeBlog }) => {

  const [visible, setVisible] = useState(false)

  let style = {}

  if(visible) {
    style = {
      display: 'block',
      textAlign: 'center',
      margin: '10px auto',
      borderStyle: 'solid',
      borderWidth: 1,
    }
  }else if(!visible) {
    style = {
      display: 'none'
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }


  return(
    <div style={{ margin: '0px auto', textAlign: 'center' }} className='blogcontainer'>
      <h3 style={{ fontWeight: 'bold', cursor: 'pointer' }} onClick={toggleVisibility} className='title'>{blog.title}</h3>
      <h5 className='author'>{blog.author}</h5>
      <div style={style} className='firstly-hidden'>
        <button onClick={toggleVisibility} style={{ display: 'block' }}>Hide</button>
        <h3 className='titleHidden'>Title: {blog.title}</h3>
        <p style={{ fontWeight: 'normal' }} className='authorHidden'>Author : {blog.author}</p>
        <p className='url'>Url : {blog.url}</p>
        <p style={{ display: 'inline' }} className='likes'>Likes : {blog.likes} </p>
        <button onClick={() => updateLikes(blog.id, { likes: blog.likes + 1 })} className='likeButton'>Like</button>
        <button onClick={() => removeBlog(blog.id)} style={{ display: 'block' }} className='removeButton'>Remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
