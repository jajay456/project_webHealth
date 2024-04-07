const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchema = new Schema({
    user_id: {
        type: String,
        required: [true, 'Please provide email']
    },
    comments: {
        type: String,
        required: [true, 'Please provide comments']
    }
})

const comments = mongoose.model('Comments', commentsSchema)
module.exports = comments