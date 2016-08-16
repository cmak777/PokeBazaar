var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var userSchema = mongoose.Schema({
  // We require one of (but not both of) username/password or facebookId
  // Unclear how to check this with a Mongoose validator so we don't =\
  username: String,
  email: String,
  password: String,
  phone: Number
});
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('Customer', userSchema);
