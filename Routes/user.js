const express = require('express');
const router = express.Router();
const User = require('../Models/userModel');


router.post('/' , async (req , res , next) => {
    var newUser = new User({
        firstName : req.body.name,
        email : req.body.email,
    });

    User.findOne({email : req.body.email})
        .exec(async (err , user) => { 
            if(err){ next( err )}
            else if(user === null){ newUser.save((err) => { next(err) }); res.status(200).json({ user : user , msg : ' this user has been saved '}) }
            else { 
                await user.populate({path : 'favs' , model : 'Place'}).populate({path : 'rate' , model : 'Rate'}).execPopulate();
                res.status(200).json({ user : user  , msg : ' user has neeb retrieved '})
            }
        });
});

router.patch('/favs', ( req , res , next ) => {
    let updateUser = {
        email : req.body.email ,
        placeId :  req.body.placeId
    };

    User.findOne({email : updateUser.email})
        .exec(async( err , user ) => {
            if(err){ next( err )}
            else if(user === null){ res.status(404).json({ msg : ' this user couldnt be found '}) }
            else { 
                let thisFavs = user.favs.find(value => value == updateUser.placeId);
                let index = user.favs.indexOf(thisFavs);
                console.log(user.favs)
                    if(index === -1){
                        user.favs = [
                            ...user.favs,
                            updateUser.placeId
                        ]
                        user.save(async(err)=>{ 
                            await user.populate({path : 'favs' , model : 'Place'}).populate({path : 'rate' , model : 'Rate'}).execPopulate();
                            res.status(200).json({ user : user , msg : ' user has been updated '})});
                    }else {
                        await user.populate({path : 'favs' , model : 'Place'}).populate({path : 'rate' , model : 'Rate'}).execPopulate();
                        user.favs.splice(index,1);
                        user.save((err)=>{ res.status(200).json({ user : user , msg : ' user has been updated '})});
                    }
                };
        });
});


module.exports = router;