const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserDB = mongoose.Schema({
  name: {
    first: String,
    last: String
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now
  },
  token: String
})

UserDB.path('password').validate(function (password) {
  return password.length > 5
}, 'password must be at least 6 characters')

UserDB.pre('save', function (next) {
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(this.password, salt, null, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

UserDB.methods.comparePassword = function (inputPassword, callback) {
  bcrypt.compare(inputPassword, this.password, function (err, isMatch) {
    if (err) return callback(err)
    callback(null, isMatch)
  })
}

module.exports = mongoose.model('User', UserDB)
