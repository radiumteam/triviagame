const User = require('../models/userModel')

const userController = {};

userController.createUser = (req, res, next) => {
  res.locals.newUsername = req.body.newUsername;
  res.locals.newPassword = req.body.newPassword;

  let userObj = new User({ 'username': res.locals.newUsername, 'password': res.locals.newPassword });

  userObj.save((err, obj) => {
    if (err) {
      console.log('ERROR')
    } else {
      res.locals.user_id = userObj._id
      console.log('IN CREATEE')
      next()
    }
  });
};
// User.create({'username':res.locals.newUsername, 'password':res.locals.newPassword}, (err, obj) => {
//   if(err){
//     console.log('HELLLLLLLP');
//   } else {
//     console.log('in create');
//     next();
//   }

// console.log(userObj);



// userController.findId = (req, res, next) => {

//   User.findOne({ 'username': res.locals.newUsername }, (err, userObject) => {
//     console.log('infind', userObject);
//     res.locals.user_id = userObject._id;
//     next();
//   })
// }

userController.setCookie = (req, res, next) => {

  let cookieVal = res.locals.user_id;
  res.cookie('ssid', cookieVal, { httpOnly: true });
  next();
}

userController.verifyUser = (req, res, next) => {
  res.locals.username = req.body.username;
  res.locals.password = req.body.password;
  console.log(req.cookies.cookieVal, "cookie")
  User.findOne({ 'username': res.locals.username }, (err, userObject) => {
    if (res.locals.password === userObject.password && userObject) {
      next();
    } else {
      res.redirect('/signup');
    }
  })
}




module.exports = userController
