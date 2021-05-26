import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

let component
let mockHandler
beforeEach(() => {
  mockHandler = jest.fn()
  const blog = {
    title: 'test',
    author: 'Test User',
    ulr: 'test.com',
    likes: 0,
    user: {
      username: 'testusername',
      name: 'TEST USER'
    }
  }

  const user =  {
    username: 'testusername',
    token: 'token'
  }
  component = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler}/>)
})
test('component renders only title and author', () => {
  const div = component.container.querySelector('.fullView')
  expect(div).toHaveStyle({ display: 'none' })
})


test('all data is shown after clicking view button', () => {
  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.fullView')
  expect(div).not.toHaveStyle({ display: 'none' })

})

test('calling function 2 times when pressing button 2 times', async() => {
  const button = component.getByText('Like')

  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})