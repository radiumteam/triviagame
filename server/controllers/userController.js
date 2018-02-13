const User = require('../models/userModel')

const userController = {};

userController.createUser = (req, res, next) => {
  res.locals.newUsername = req.body.newUsername;
  res.locals.newPassword = req.body.newPassword;

  let userObj = new User({'username' : res.locals.newUsername, 'password' : res.locals.newPassword});
  userObj.save();
  next();
}

userController.findId = (req, res, next) => {
  User.findOne({ 'username' : res.locals.newUsername}, (err, userObject) => {
    res.locals.user_id = userObject._id;
    next();
  })
}

userController.setCookie = (req, res, next) => {
  let cookieVal = res.locals.user_id;
  res.cookie('ssid', cookieVal, {httpOnly: true});
  next();
}

userController.verifyUser = (req, res, next) => {
  res.locals.username = req.body.username;
  res.locals.password = req.body.password;

  User.findOne({ 'username' : res.locals.username }, (err, userObject) => {
    if(!userObject) {
      res.redirect('/signup');
    }
    if(res.locals.password === userObject.password){
      res.redirect('/question')
    } else {
      res.redirect('/signup');
    }
  })
}

module.exports = userController
