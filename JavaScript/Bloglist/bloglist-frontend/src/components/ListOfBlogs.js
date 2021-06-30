import React from 'react'
import Blog from './Blog'

const ListOfBlogs = ({ blogs, updateLikes, removeBlog }) => {
  return (
    <div style={{
      width: '50%',
      margin: '0px auto' }}>
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes} removeBlog={removeBlog} />)}
    </div>
  )
}

export default ListOfBlogs
