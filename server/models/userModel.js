const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLoginSchema = new Schema({
    username: String,
    password: { type: String, required: true }
})

module.exports = mongoose.model('User', userLoginSchema);