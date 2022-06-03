const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3
    },

    favrotiGenres: [{type: String}]
})

module.exports = mongoose.model('User', schema)