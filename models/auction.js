var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var auctionSchema = mongoose.Schema({
  // We require one of (but not both of) username/password or facebookId
  // Unclear how to check this with a Mongoose validator so we don't =\
  seller: {
  	 type: mongoose.Schema.Types.ObjectId,
     ref: 'Customer'
  },
  buyer: {
  	 type: mongoose.Schema.Types.ObjectId,
     ref: 'Customer'
  },
  sellerPokemon: {
  	type: String,
    required: true
  },
  sellerCP: {
    type: Number,
    required: true
  },
  buyerPokemon: {
  	type: String
  },
  buyerCP: {
    type: Number
  },
  description: {
    type: String
  },
  completed: {
    type: Boolean
  }
});
auctionSchema.plugin(findOrCreate);


module.exports = mongoose.model('Auction', auctionSchema);
