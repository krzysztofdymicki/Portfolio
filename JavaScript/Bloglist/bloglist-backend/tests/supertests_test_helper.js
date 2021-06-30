const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Pierwszy blog w bazie',
    author: 'Pierwszy autor w bazie',
    url: 'Pierwszy url w bazie',
    likes: 1
  },
  {
    title: 'Drugi blog w bazie',
    author: 'Drugi autor w bazie',
    url: 'Drugi url w bazie',
    likes: 2
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}