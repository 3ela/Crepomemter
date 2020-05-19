const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Rate = require('../Models/rateModel');
const User = require('../Models/userModel');
const Place = require('../Models/placeModel');

router.post('/',( req , res , next ) => {
    let rateID = req.body.rateId === 0 ? mongoose.Types.ObjectId() : req.body.rateId ;    
    let newRate = new Rate ({
        _id : rateID,
        placeId : req.body.placeId,
        userId : req.body.userId,
        rate : req.body.rate
    });
    let updateRate = {
        rateId : rateID,
        placeId : req.body.placeId,
        userId : req.body.userId,
        rate : req.body.rate
    };
    let results = {
        user : {},
        place : {}
    }
    let savedRatePromise = new Promise((resolve,reject) => {
            newRate.save((err , rate) => { 
                resolve(rate);
            });    
        });

    Rate.findById( updateRate.rateId  , (err , rate) => {
        if (err){ next(err) }
        else if(rate === null){
            Promise.all([
                savedRatePromise
                ,
                User.findById( updateRate.userId , async (err , user) => {
                    if(err){ next(err) }
                    else {
                        user.rate = [
                            ...user.rate,
                            updateRate.rateId
                        ];
                        user.save();
                        await user.populate({path : 'rate' , model : 'Rate'}).populate({path : 'favs' , model : 'Place'}).execPopulate();
                        console.log(user)
                        results.user = user ;
                    }
                }),
                Place.findById(  updateRate.placeId, async (err , place) => {
                    if(err){ next(err) }
                    else{
                        place.rate = [
                            ...place.rate,
                            updateRate.rateId
                        ];
                        place.save();
                        await place.populate({path : 'rate' , model : 'Rate'}).execPopulate();
                        results.place = place ;
                    }
                })
                
            ]).then(result => {
                console.log(results)
                res.status(200).json({
                    msg : 'rate added ',
                    rate : result[0],
                    user : results.user,
                    place : results.place
                });
            });
        }else{            
            Rate.findById( rateID  , (err , rate) => {
                if (err){ next(err) }
                else if(rate === null){
                    res.status(404).json({
                        msg : 'this rate was not added before '
                    });
                }else{
                    rate.rate = updateRate.rate;
                    rate.save((err , rate) => { 
                        User.findById( updateRate.userId , async (err , user) => {
                            if(err){ next(err) }
                            else {
                                await user.populate({path : 'rate' , model : 'Rate'}).populate({path : 'favs' , model : 'Place'}).execPopulate();
                                res.status(200).json({
                                    msg : 'rating updated',
                                    rate : rate,
                                    user : user
                                })
                            }
                        });
                       
                    });
                };
            });           
        };
    });
});

router.patch('/' , ( req , res , next ) => {
    let updateRate = {
        rateId : req.body.rateId,
        rate : req.body.rate
    };
    
    Rate.findById( rateId  , (err , rate) => {
        if (err){ next(err) }
        else if(rate === null){
            res.status(404).json({
                msg : 'this rate was not added before '
            });
        }else{
            rate.rate = updateRate.rate;
            rate.save((err , rate) => { 
               res.status(200).json({
                   msg : 'rating updated',
                   rate : rate
               })
            });
        };
    });           
});

module.exports = router;