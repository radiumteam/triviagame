const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client'))); //serves all related files in this folder.
app.use(cookieParser());

const URI = 'mongodb://triviacrud:ilovetesting1@ds233228.mlab.com:33228/triviacrud';
mongoose.connect(URI);

//if our login file was called index.html then
//the browser would automatically serve it wihtout this get request;
app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/login.html'));
})

app.post('/login', userController.verifyUser);

app.post('/signup', userController.createUser);




const server = app.listen(3000, () => {
  console.log('listening on port 3000');
});