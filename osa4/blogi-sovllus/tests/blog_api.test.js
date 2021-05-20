const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const supertest = require('supertest')
const test_helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
    //clear the entire collection
    await Blog.deleteMany({})

    const blogObj = test_helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObj.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('correct amount of blogs from database', async ()=>{
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(test_helper.initialBlogs.length)
})

test('_id field is defined as id', async() => {
    const response = await api.get('/api/blogs')
    //if one blog has returned true for id field
    //it assumes that all other blogs got also same field name for _id
    expect(response.body[0].id).toBeDefined()
})

test('adding successfully a new blog to DB', async () => {
    const credentials = {
        username: test_helper.initialUsers[0].username,
        password: test_helper.initialUsers[0].passwordHash
    }
    //first need to be logged in
    const user = await api.post('/api/login').send(credentials)

    const newBlogObj = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
}
    await api.post('/api/blogs')
    .send(newBlogObj)
    .set('Authorization', `bearer ${user.body.token}`)
    .set('token', user.body.token)

    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(b => b.title)
    expect(response.body).toHaveLength(test_helper.initialBlogs.length+1)
    expect(contents).toContain(newBlogObj.title)
})

test('likes without value is set to 0', async () => {

    //first need to be logged in
    const credentials = {
        username: test_helper.initialUsers[0].username,
        password: test_helper.initialUsers[0].passwordHash
    }
    const user = await api.post('/api/login').send(credentials)

    const newBlogObj = {
        title: 'test blog',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }
    
        await api.post('/api/blogs')
        .send(newBlogObj)
        .set('Authorization', `bearer ${user.body.token}`)
        .set('token', user.body.token)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const wantedBlog = response.body.filter(b => b.title === 'test blog')

        //check whether likes exists
        expect(wantedBlog[0].likes).toBeDefined()
        //then check its value
        expect(wantedBlog[0].likes).toBe(0)

})

test('status 400 is returned for incomplete blog data', async () => {
     //first need to be logged in
     const credentials = {
        username: test_helper.initialUsers[0].username,
        password: test_helper.initialUsers[0].passwordHash
    }
    const user = await api.post('/api/login').send(credentials)


    const blogObject = {
        autho: 'sakhi',
        likes: 0
    }

    await api.post('/api/blogs')
    .send(blogObject)
    .set('Authorization', `bearer ${user.body.token}`)
    .set('token', user.body.token)
    .expect(400)
    
})


test('addig blog fails without tokens & ends to 401', async()=> {
    const credentials = {
        username: 'unknow',
        password: 'sillyPass'
    }
    const user = await api.post('/api/login').send(credentials)
    const newBlogObj = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    }
        await api.post('/api/blogs')
        .send(newBlogObj)
        .expect(401)
})
afterAll(()=>{
    mongoose.connection.close()
})