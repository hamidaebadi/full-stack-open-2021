const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { response } = require('express')

router.post('/reset', async(req, res) => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    res.status(204).end()
})


module.exports = router