const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./supertests_test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

// ----------------GET REQUESTS-------------------//

describe('GET requests', () => {

  test('blogs are returned as JSON', async () => {

    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {

    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('all blogs have id property', async () => {

    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
  })
})

//------------------------POST REQUESTS--------------------------

describe('POST requests', () => {

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'New author',
      url: 'New url',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  })

  test('if missing, likes defaults to 0', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'New author',
      url: 'New url',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const newlyAdded = blogsAtEnd.find(blog => blog.title === 'New blog')
    expect(newlyAdded.likes).toBe(0)
  })

  test('blogs without title/author arent added with status 400', async () => {
    const blogWithoutTitle = {
      author: 'New author',
      url: 'New url',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)

    const blogWithoutAuthor = {
      title: 'New Blog',
      url: 'New url',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(blogWithoutAuthor)
      .expect(400)

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })
})


afterAll(() => {
  mongoose.connection.close()
})