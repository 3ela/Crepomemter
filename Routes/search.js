const express = require('express');
const router = express.Router();
const Place = require('../Models/placeModel');
const City = require('../Models/citiesModel');


router.get('/:searchText',( req , res , next ) => {
    const searchText = req.params.searchText.toLowerCase();
    let searchResult = {
        cities : [],
        places : [],
    };
    
    Promise.all([ 
        City.find( { name : searchText } , (err,city)=>{
            if(err){ next(err);
            }else{
                searchResult.cities = [].concat(city);
            };
        }),  

        Place.find({name: searchText} , (err,place)=>{
            if(err){ next(err);
            }else{
                searchResult.places = [].concat(place);
            };
        })
    ]).then((result) => {
        if(result[0].length > 0){
            Place.find({
                '_id': { $in: result[0][0].places }
            }, function(err, places){
                if(err){ next(err) }
                else{
                    res.status(200).json({
                        msg : ' foind results ',
                        searchResult : searchResult,
                        placesInCity : places
                    });
                };
            });
        }else if(result[1].length > 0){
            City.findOne({ _id : result[1][0].city } , (err , city) => {
                if(err){ next(err) }
                else{
                    Place.find({
                        '_id': { $in: city.places } 
                    }, function(err, places){
                        if(err){ next(err) }
                        else{
                            res.status(200).json({
                                msg : ' foind results ',
                                searchResult : searchResult,
                                cityInPlace : city,
                                placesInCity : places
                            });
                        };
                    });
                };
            });
        }else{
            console.log('No Results'); 
            res.status(200).json({
                msg : ' foind results ',
                searchResult : searchResult
            });
        }
        
    });
});




module.exports = router ;