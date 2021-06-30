import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


test('Only title and author are shown by default', () => {
  const blog = {
    title: 'testing blog',
    author: 'testing author',
    url: 'testing url',
    likes: 0,
    id: 666
  }

  const component = render(
    <Blog blog={blog} />
  )

  const hiddenDiv = component.container.querySelector('.firstly-hidden')

  expect(hiddenDiv).toHaveStyle('display: none')

})

test('Url and likes are shown after clicking the button', () => {
  const blog = {
    title: 'testing blog',
    author: 'testing author',
    url: 'testing url',
    likes: 0,
    id: 666
  }

  const component = render(
    <Blog blog={blog} />
  )
  const clickableTitle = component.container.querySelector('.title')
  fireEvent.click(clickableTitle)

  const hiddenDiv = component.container.querySelector('.firstly-hidden')

  console.log(prettyDOM(hiddenDiv))

  expect(hiddenDiv).toHaveStyle('display: block')

})

test('When like button is clicked twice, event handler response twice', () => {
  const blog = {
    title: 'testing blog',
    author: 'testing author',
    url: 'testing url',
    likes: 0,
    id: 666
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} updateLikes={mockHandler} />
  )

  const button = component.container.querySelector('.likeButton')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})

