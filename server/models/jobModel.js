const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: [String],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  time:{
    type:Number,
    required:true
  },
  nature:{
    type: String,
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applied:{
    type: [mongoose.Schema.Types.ObjectId],
    ref:'User',
    required:false
  }
},{timestamps:true});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;