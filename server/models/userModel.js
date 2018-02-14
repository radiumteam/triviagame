const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLoginSchema = new Schema({
    username: String,
    password: String
})

module.exports = mongoose.model('User', userLoginSchema);