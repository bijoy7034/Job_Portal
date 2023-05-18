const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['job_seeker', 'employer'],
    required: false,
    default:'job_seeker'
  },
  description:{
    type: String,
    required: false,
  },
  phone:{
    type: Number,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('Users', userSchema)