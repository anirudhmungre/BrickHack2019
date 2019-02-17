const express = require('express');

let app = express();

app.listen(8080, function(){
    console.log('Running a server at localhost:8080');
});

let router = express.Router()

router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next(); 
});

router.get('/', function(req, res){
    res.send("HOME PAGE HERE 2")
})

app.use('/', router)