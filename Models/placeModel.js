const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const placeSchema = new Schema({
    
    name : {
        type : String,
        required : true
    },
    address :{
        type : String,
        required : true
    },
    contact : {
        type : String,
        required : true
    },
    coordinates : { 
        lat : {type :Number, required : true },
        long : {type : Number, required : true },
    },
    rate : {
        type : [Schema.Types.ObjectId] ,
        ref : 'Rate',
        required : false
    },
    city : {
        type : Schema.Types.ObjectId,
        ref : 'City',
        required : true
    }
});

module.exports =  mongoose.model('Place',placeSchema);