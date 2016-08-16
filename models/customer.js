var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var customerSchema = mongoose.Schema({
  // We require one of (but not both of) username/password or facebookId
  // Unclear how to check this with a Mongoose validator so we don't =\
  username: {
  	type: String,
  	required: true
  },
  password: {
  	type: String,
  	required: true
  },
  email: {
  	type: String,
  	required: true
  }
});
customerSchema.plugin(findOrCreate);

module.exports = mongoose.model('Customer', customerSchema);
