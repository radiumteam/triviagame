const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const questionController = require('./questionController');

//question model schema
require('./model/questionModel');

// Send root react page

//mlab server
mongoose
  .connect('mongodb://simon:1072322sp@ds123718.mlab.com:23718/feedme-dev')
  .then(() => console.log('connected to mLab'));
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.use(bodyParser.json());

// app.get('/sample', (req, res)[

// ])

//routes
require('./routes/sampleRoute')(app);

app.get('/', (req, res) => {
  res.sendFile('/Users/Skyler/Desktop/CodeSmith/scratch-project/public/index.html');
  // res.send(res.body);
});

app.get('/question', dataController.getData);

const server = app.listen(3000, () => {
  console.log('listening on port 3000');
});
app.use(express.static('public'));

// let io = socket(server);

// io.on('connection', function (socket) {
//   console.log('made socket connection')
// });