const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionModel = new Schema({
  category: String,
  question: {
    type: String,
    required: true
  },
});