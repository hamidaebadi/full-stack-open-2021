const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')
const { update } = require('../models/blog')



blogRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate('user', {blogs: 0}).populate('comments', {blog: 0})
    response.json(blogs.map(blog => blog.toJSON()))
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
      blogId = request.params.id
      const body = request.body
      const blog = {...body, likes: body.likes}

      const updatedBlog = await Blog.findByIdAndUpdate(blogId, blog, {new: true})
      response.json(updatedBlog)
    }catch(exception){
      response.status(400).end()
    }
  })

  blogRouter.post('/:id/comments', async(request, response) => {
    try{
      const body = request.body
      const blogId = request.params.id
      const newComment = new Comment({
        content: body.content,
        blog: blogId
      })

      //save comment
      const savedComment = await newComment.save()
      const blogData = await Blog.findById(blogId)
      
      updatedComments = blogData.comments.concat(savedComment.id)
      const updated = await Blog.findOneAndUpdate({_id: blogId}, {comments: updatedComments}, {new: true})
      response.status(201).json(updated.toJSON())

    }catch(exception){
      response.status(400).send(exception)
    }
  })

  module.exports = blogRouter