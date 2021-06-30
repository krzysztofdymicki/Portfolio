const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./supertests_test_helper')
const app = require('../app')
const api = supertest(app)


beforeEach(async () => {

  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)

  const user = new User({
    username: 'newuser',
    passwordHash
  })

  await user.save()
})


describe('when there is one user in DB', () => {

  test('a valid user is added to DB', async () => {
    const usersAtStart = await helper.usersInDb()

    const user = {
      username: 'seconduser',
      name: 'Second User',
      password: 'secret',
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(user.username)
  })

  test('creation fails when username already exists in the DB', async () => {
    const usersAtStart = await helper.usersInDb()

    const user = {
      username: 'newuser',
      name: 'NewUser',
      password: 'dupcia',
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails when password/username is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const user = {
      username: 'ab',
      password: 'abcd'
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` (`ab`) is shorter than the minimum allowed length (3).')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)

    const secondUser = {
      username: 'abcd',
      password: 'ab'
    }

    const secondResult = await api
      .post('/api/users')
      .send(secondUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(secondResult.body.error).toContain('Too short password')

    const usersAtVeryEnd = await helper.usersInDb()
    expect(usersAtVeryEnd.length).toBe(usersAtEnd.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})