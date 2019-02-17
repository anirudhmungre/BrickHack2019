const express = require('express');
const avail = require('./scripts/search_avail')
const multer = require('multer')
let app = express();

app.listen(8080, function(){
    console.log('Running a server at localhost:8080');
});

// app.use('/', avail)
// app.use('/', multer({ 
//     dest: './uploads/',
//     rename: function (fieldname, filename) {
//         return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
//     },
//     onFileUploadStart: function (file) {
//         console.log(file.fieldname + ' is starting ...')
//     },
//     onFileUploadData: function (file, data) {
//         console.log(data.length + ' of ' + file.fieldname + ' arrived')
//     },
//     onFileUploadComplete: function (file) {
//         console.log(file.fieldname + ' uploaded to  ' + file.path)
//     }
// }));
let router = express.Router()

router.use('/test', function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next(); 
});

router.get('/', function(req, res){
    res.send("HOME PAGE HERE 2")
})

app.use('/', router)