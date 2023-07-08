const mongoose = require('mongoose')
const { isEmail } = require('validator')

const TaskSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'You are not logged in'],
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [20, 'name can not be more than 20 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
})

module.exports = mongoose.model('Task', TaskSchema)
