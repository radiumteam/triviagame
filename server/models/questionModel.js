const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  author_id: Schema.Types.ObjectId,
  question: {
    type: String,
    required: true
  },
  answerOptions: { 
    type: Array,
    required: true
  },
  correctAnswerIndex: { 
    type: Number,
    required: true
  },
  category: String,
});

module.exports = mongoose.model('Question', questionSchema);