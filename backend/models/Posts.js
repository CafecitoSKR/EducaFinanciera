const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    content: {
        type: String,
        required: true,
        min: 10
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    images: [{
        data: Buffer,
        contentType: String
    }],
    videos: [{
        data: Buffer,
        contentType: String
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);
