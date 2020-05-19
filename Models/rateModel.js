var mongoose = require('mongoose');
const Schema = mongoose.Schema;


const rateSchema = new Schema({

    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    placeId : {
        type : Schema.Types.ObjectId,
        ref : 'Place',
        required : true
    },
    rate : {
        type : Number ,
        required :true,
        min : 0 ,
        max : 5 
    },
});

module.exports = mongoose.model('Rate',rateSchema);