const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

//adding new users
userRouter.post('/', async (request, response) => {
    const body = request.body
    //valid password given?
    if (body.password.length < 3){
        return response.status(400).send({error: 'Too short password was given'})
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })

    try{
        const savedUser = await user.save()
        response.json(savedUser)
    }catch(exception){
        response.status(400).send({error: "username is already existed"})
    }
    
})

//view all users
userRouter.get('/', async(request, response)=>{
    const users = await User.find({}).populate('blogs', {user: 0, likes: 0})
    response.send(users.map(user => user.toJSON()))
})

module.exports = userRouter