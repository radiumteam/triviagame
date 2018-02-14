const Question = require('../models/questionModel');

const questionController = {
  getQuestion(req, res) {
    Question.find(req.body, function(err, data) {
      return res.send(data);
    });
  }
};
module.exports = questionController;