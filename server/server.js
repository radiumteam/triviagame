const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const server = app.listen(3000, () => {
  console.log('listening on port 3000');
});