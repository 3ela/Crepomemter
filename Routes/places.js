const express = require('express');
const router = express.Router();
const Place = require('../Models/placeModel');


router.get('/:place' ,(req , res ,next) => {
    let wantedPlace = req.params.place;

    Place.find( { name : wantedPlace } , ( err , place ) => {
        if(err){ next(err) }
        else if( city === null ){
            res.status(404).json({
                msg : ' place not found ',
            });
        }else {
            res.status(200).json({
                msg : ' places found ',
                places : place 
            });
        };
    });
});

router.post('/' , (req , res , next) => {
    let places = req.body.places;
    Place.find({
        '_id': { $in: places }
    }, function(err, docs){
        if(err){ next(err) }
        else{
            res.status(200).json({
                places :  docs
            });
        };
    });
});

router.put('/', ( req , res , next ) => {
    
    newPlace = new Place ({
        name : req.body.name.toLowerCase(),
        address : req.body.address.toLowerCase(),
        contact : req.body.contact,
        coordinates : {
            lat : req.body.coordinates.lat,
            long : req.body.coordinates.long
        },
        city : req.body.city
    });

    let grabCityId = new Promise ((resolve,reject) => {
       //when there is many cities that have the same name we gotta handle that in the future
    });
    
    Place.findOne({'coordinates.lat' : req.body.coordinates.lat , 'coordinates.long' : req.body.coordinates.long} , (err , place) => {
        if(err){ next(err) }
        else if(place === null){
            newPlace.save((err) => { if(err) next(err); else res.status(200).json({ msg : 'place has been saved' , place : place})  });
        }else {
            res.status(400).json({
                msg : 'place already exists ',
                place : place
            })
        }
    });
});

module.exports = router;