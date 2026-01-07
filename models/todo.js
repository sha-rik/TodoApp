let mongoose = require('mongoose');

let todoSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        maxLength: 100,
    },
    description: {
        type: String,
        required: false,
        maxLength: 500,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    updateAt: {
        type: Date,
        default: Date.now(),
        required: true,
    }
})

module.exports = mongoose.model('Todo', todoSchema);