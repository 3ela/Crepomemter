var mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  firstName : {
    type : String,
    required : true 
  },
  email: {
    type : String,
    required :true
  },
  favs : {
    type : [Schema.Types.ObjectId],
    ref : 'Place',
    required : false
  },
  rate : {
    type : [Schema.Types.ObjectId],
    ref : 'Rate',
    required : false
  }
});

module.exports = mongoose.model('User',userSchema);