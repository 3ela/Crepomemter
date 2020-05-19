const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');

const app = express();


//all the Routes 
const searchRoute = require('./Routes/search');
const placesRoute = require('./Routes/places');
const citiesRoute = require('./Routes/cities');
const userRoute = require('./Routes/user');
const rateRoute = require('./Routes/rate');

app.use(morgan('tiny'));
app.use(helmet());





app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/search',searchRoute);
app.use('/places',placesRoute);
app.use('/cities',citiesRoute);
app.use('/user',userRoute);
app.use('/rate',rateRoute);

//serve static assets if we are in production 
if( process.env.NODE_ENV === 'production'){
    //set static older 
    app.use(express.static(path.join(__dirname  , '/static')));

    app.get('*' , (req,res,next) => {
        res.sendfile(path.join(__dirname  , 'static/index.html'));
    });
}

app.use((req,res,next) => {
    const error = new Error(' No Route ');
    error.status = 406;
    next(error);    
});

app.use((error,req,res,next) => {
    console.log(error.stack);
    res.status( error.status || 500).json({
        message : ' some wrong happened ',
        err : error.message        
    });
});

module.exports = app;