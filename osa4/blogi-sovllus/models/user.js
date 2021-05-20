const mongoose = require('mongoose')
const mongooseValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username: {type: String, required: true, minLength: 3, unique: true},
    name: {type: String, unique: false},
    passwordHash: {type: String, required: true},
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

userSchema.plugin(mongooseValidator)
const User = mongoose.model('User', userSchema)
module.exports = User