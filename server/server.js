const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const userController = require('./controllers/userController');
const questionController = require('./controllers/questionController');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client'))); //serves all related files in this folder.

const URI = 'mongodb://triviacrud:ilovetesting1@ds233228.mlab.com:33228/triviacrud';
mongoose.connect(URI);

//if our login file was called index.html then
//the browser would automatically serve it without this get request;
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/login.html'));
})
app.get('/signup', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/signup.html'))
})

app.post('/login', userController.verifyUser, (req, res) => {
  res.redirect('/question')
});
app.post('/signup',
  userController.createUser,
  userController.setCookie,
  (req, res) => {
    res.redirect('/')
  });

// Route to user's trivia questions page
app.get('/question', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/question.html'));
});

// Question CRUD routes
app.post('/addQ', questionController.createQuestion);
app.post('/getUserQ', questionController.getUserQuestions);
app.post('/updateQText', questionController.updateQuestionText);
app.post('/deleteQ', questionController.deleteQuestion);

// For testing purposes only
app.get('/getAllQ', questionController.getAllQuestions);
app.post('/addQAuthor', questionController.updateQuestionAuthor);

const server = app.listen(3000, () => {
  console.log('listening on port 3000');
});
