const mongoose = require('mongoose')

// Segment schema
const segmentSchema = mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  option: {
    type: Number,
    required: true
  },
  link: {
    type: [{
      source: String,
      target: String
    }],
    required: true
  }
})

module.exports = mongoose.model('Segment', segmentSchema)
