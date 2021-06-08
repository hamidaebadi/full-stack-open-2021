import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

test('New Blog form works perfectly, calls onSubmit', () => {
  const createBlogMock = jest.fn()
  const component = render(
    <BlogForm createBlog={createBlogMock}/>)

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')
  fireEvent.change(title, {
    target: { value: 'new blog' } })
  fireEvent.change(author, {
    target: { value: 'new author' } })
  fireEvent.change(url, {
    target: { value: 'new url' } })

  fireEvent.submit(form)

  //test functionality
  expect(createBlogMock.mock.calls).toHaveLength(1)
  expect(createBlogMock.mock.calls[0][0].title).toBe('new blog')
  expect(createBlogMock.mock.calls[0][0].author).toBe('new author')
  expect(createBlogMock.mock.calls[0][0].url).toBe('new url')

})