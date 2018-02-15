const User = require('../models/userModel')

const userController = {};

userController.createUser = (req, res, next) => {
  res.locals.newUsername = req.body.newUsername;
  res.locals.newPassword = req.body.newPassword;
  User.findOne({ 'username': req.body.newUsername }, (err, userObj) => {
    if (err) {
      console.log('ERROR', err)
    }
    if (userObj !== null) {
      if (req.body.newUsername === userObj.username) {
        res.send('username is already taken');
      }
    } else {
      let userObj = new User({ 'username': res.locals.newUsername, 'password': res.locals.newPassword });
      userObj.save((err, obj) => {
        if (err) {
        } else {
          res.locals.user_id = userObj._id
          next()
        }
      });
    }


  })

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
  User.findOne({ 'username': req.body.username }, (err, userObject) => {
    if (err) {
      console.log('ERROR', err)
    }
    if (userObject === null) {
      return res.redirect('/signup')
    }
    if (req.body.password !== userObject.password) {
      res.redirect('/signup');
    } else {
      res.locals.user_id = userObject._id
      next();
    }
  })
}

userController.isLoggedIn = (req, res, next) => {
  console.log(req.cookies);
  if (!req.cookies.ssid) {
    res.redirect('/')
  }
  User.findOne({ '_id': req.cookies.ssid }, (err, userObject) => {
    if (userObject) {
      next();
    } else {
      res.redirect('/')
    }
  })
}



module.exports = userController
