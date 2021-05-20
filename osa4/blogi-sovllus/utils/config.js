require('dotenv').config()

let PORT = process.env.PORT

let MONGODB_URL = process.env.NODE_ENV === 'test'
? process.env.MONGODB_URL_TEST
: process.env.MONGODB_URL

module.exports = {
    MONGODB_URL,
    PORT
}