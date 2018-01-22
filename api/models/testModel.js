const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema( {
  imageData: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('TestModel', TestSchema);