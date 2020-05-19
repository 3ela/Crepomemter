const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citiesSchema = new Schema({
    name : {
        type :String,
        required : true
    },
    key : {
        type : String,
        required : true
    },
    coordinates : {
        lat : {type :Number, required : true },
        long : {type : Number, required : true },
    },
    places : {
        type : [Schema.Types.ObjectId],
        ref : 'Place',
        required : false
    }
});

module.exports = mongoose.model('City',citiesSchema);