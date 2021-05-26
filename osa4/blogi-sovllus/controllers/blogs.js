const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogRouter.get('/', async(request, response) => {
    const notes = await Blog.find({}).populate('user', {blogs: 0})
    response.json(notes.map(note => note.toJSON()))
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  //get token
  if(!request.token){
    return response.status(401).json({error: "token nist pedarsag"})
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id){
    return response.status(401).json({error: "token missing or invalid"})
  }

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  try{
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog.toJSON())
  }catch(exception){
    response.status(400).send(exception)
  }
    
})

  blogRouter.delete('/:id', async(request, response) => {
    const blogToRemove = request.params.id
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id){
      return response.status(401).json({error: "token missing or invalid"})
    }

    const user = request.user

    const blog = await Blog.findById(blogToRemove)
    if(blog.user.toString() !== user.id){
      return response.status(401).json({error: "You can not remove this blog"})
    }
    try{
      await Blog.findByIdAndRemove(blogToRemove)
      response.status(204).end()
    }catch(exception){
      response.status(400).end()
    }
  })

  blogRouter.put('/:id', async(request, response) => {
    
    try{
      blogToUpdate = request.params.id
      const body = request.body
      const blog = {...body, likes: body.likes}

      const updatedBlog = await Blog.findByIdAndUpdate(blogToUpdate, blog, {new: true})
      response.json(updatedBlog)
    }catch(exception){
      response.status(400).end()
    }
  })

  module.exports = blogRouter