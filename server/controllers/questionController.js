const Question = require('../models/questionModel');
const questionController = {};

// Creates a new trivia question in the database
questionController.createQuestion = (req, res) => {
  Question.create({
    author_id: req.body.author_id,
    question: req.body.question,
    answerOptions: req.body.answerOptions,
    correctAnswerIndex: req.body.correctAnswerIndex,
    category: req.body.category
  }, (err, createdQuestion) => {
    if (err) res.send(400, err);
    res.send(createdQuestion);
  }); 
};

// Finds all trivia questions for a particular user in the database
questionController.getUserQuestions = (req, res) => {
  Question.find({ author_id: req.body.author_id }, (err, userQuestions) => {
    if (err) res.send(400, err);
    res.send(userQuestions);
  });
};

// Updates a trivia question in the database
questionController.updateQuestionText = (req, res) => {
  Question.findByIdAndUpdate(req.body._id, { 
    question: req.body.question
   }, (err, updatedQuestion) => {
     if (err) res.send(400, err);
     res.send(updatedQuestion);
   });
};

// TODO: Write function(s) to edit and/or delete answer options

// Deletes a trivia question in the database
questionController.deleteQuestion = (req, res) => {
  Question.findByIdAndRemove(req.body._id, (err, deletedQuestion) => {
     if (err) res.send(400, err);
     res.send(deletedQuestion);
   });
};

// For testing: gets all trivia questions in the database
questionController.getAllQuestions = (req, res) => {
  Question.find({}, (err, allQuestions) => {
    if (err) res.send(400, err);
    res.send(allQuestions);
  })
};

// Add question author experience
questionController.updateQuestionAuthor = (req, res) => {
  Question.findByIdAndUpdate(req.body._id, (err, updatedQuestion) => {
    if (err) res.send(400, err);
    res.send(updatedQuestion);
  });
};

module.exports = questionController;