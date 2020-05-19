const express = require('express');
const router = express.Router();
const City = require('../Models/citiesModel');


router.get('/:city' ,(req , res ,next) => {
    let wantedCity = req.params.city;

    City.find( { name : wantedCity } , ( err , city ) => {
        if(err){ next(err) }
        else if( city === null ){
            res.status(404).json({
                msg : ' city not found ',
            });
        }else {
            res.status(200).json({
                msg : ' cities found ',
                cities : city 
            });
        };
    });
});

router.put('/', ( req , res , next ) => {
    
    newCity = new City ({
        name : req.body.name.toLowerCase(),
        key : req.body.key,
        coordinates : {
            lat : req.body.coordinates.lat,
            long : req.body.coordinates.long
        }
    });
    
    City.findOne({'coordinates.lat' : req.body.coordinates.lat , 'coordinates.long' : req.body.coordinates.long} , (err , city) => {
        if(err){ next(err) }
        else if(city === null){
            newCity.save((err ,city) => { if(err) next(err); else res.status(200).json({ msg : 'place has been saved' , city : city})  });
        }else {
            res.status(400).json({
                msg : 'city already exists ',
                city : city
            });
        };
    }); 
});
    
router.patch('/' , (req , res ,next ) => {
    let updateCity = {
        id : req.body.id ,
        places : req.body.places
    };
    
    City.findOne( { _id : updateCity.id } , (err , city) => {
        if(err){ next(err) }
        else if(city === null){
            res.status(404).json({ msg : 'city was not found'});
        }else {
            city.save( { places : updateCity.places } ,(err) => next(err)); 
            res.status(200).json({
                msg : ' city updated ',
                city : city
            });
        };
    });
    
});

module.exports = router;