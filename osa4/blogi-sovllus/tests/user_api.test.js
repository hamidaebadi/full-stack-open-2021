const mongoose = require('mongoose')
const test_helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const api = supertest(app)

//prepare  database
beforeEach(async () => {
    await User.deleteMany({})
    const saltRounds = 10
    
    for(const user of test_helper.initialUsers){
        const passwordHash = await bcrypt.hash(user.passwordHash, saltRounds)

        const userObj = new User({
            username: user.username,
            name: user.name,
            passwordHash
        })
        await userObj.save()
    }
})


test('all users are returned', async()=>{
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(test_helper.initialUsers.length)
})

test('addition of user with pass.lenght < 3 ends to 400', async () => {
    const user = {
        username: "testuser123",
        name: "Test User",
        password: 'f'
    }

    await api.post('/api/users')
    .send(user)
    .expect(400)

    const allUsers = await api.get('/api/users')
    expect(allUsers.body).toHaveLength(test_helper.initialUsers.length)
})

test('addition with duplicated username ends to 400', async () => {
    const user = {
        username: test_helper.initialUsers[0].username,
        name: "Test User 2",
        password: 'secret'
    }

    await api.post('/api/users')
    .send(user)
    .expect(400)

    const allUsers = await api.get('/api/users')
    expect(allUsers.body).toHaveLength(test_helper.initialUsers.length)
})

test('addition with valid username and pass ends to 200', async()=>{
    const user = {
        username: "usernamefortes",
        name: "Name Test",
        password: "secret"
    }

    await api.post('/api/users')
    .send(user)
    .expect(200)
    
    const allUsers = await api.get('/api/users')
    expect(allUsers.body).toHaveLength(test_helper.initialUsers.length+1)
})
afterAll(()=>{
    mongoose.connection.close()
})