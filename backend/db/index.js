const mongoose = require('mongoose');

// connect to mongoose
mongoose.connect('mongodb+srv://karthiknair02:karthikdb@cluster0.h2m4g.mongodb.net/')

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String
})

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  balance: Number,
})


const User = mongoose.model('User', UserSchema)
const Account = mongoose.model('Account', AccountSchema)


module.exports = {
  User,
  Account
}