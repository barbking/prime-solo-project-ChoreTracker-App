var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

// mongoose Schema
var bankSchema = {
  username: {type: String, required: true},
  deposit: {type: Number, required: true},
  withdrawal: {type: Number, required: true},
  balance: {type: Number, required: true}
};


module.exports = mongoose.model('banks', taskSchema);