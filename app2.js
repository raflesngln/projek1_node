
//'use strict';
var express = require('express');
var app = express();

//for calling static file
app.use(express.static('public'));
app.use(express.static('assets')); //or if use alias,use static first in path => app.use('/static', express.static('assets'));

// for handle post method
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false }); // Create application/x-www-form -urlencoded parser

//multer for manage post and file upload
var multer = require('multer');
var upload = multer();

//For mongodb database tools
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/belajar');
    var personSchema = mongoose.Schema({
    name: String,
    age: Number,
    nationality: String
});
var Person = mongoose.model("Person", personSchema);


//Call for PUGS Engine templating
app.set('view engine', 'pug');
app.set('views','./views');

//******************************************ROUTE START FRO HERE ***********************************************************************

//Defaul Route to Home page
app.get('/home', function(req, res){
    res.render('template');
});


//Simple Route with View
app.get('/first_template', function(req, res){
    res.render('first_view');
});


//Simple Route with parsing value to view
app.get('/dynamic_view', function(req, res){
        res.render('dynamic', {
        name: "Rafles Nainggolan",
        address:"jakarta barat",
        jobs : "Programmer/Developer",
        url:"http://localhost:8000/first_template"
    });
});

// condition inside view template if_user is login
app.get('/cek_login', function(req, res){
    res.render('cek_login', {
        name: {depan: "Rafles", belakang: "nainggolan"},
        address:"jakarta barat",
        jobs : "Programmer/Developer"
});
});



//==================== MANAGE FORM DATA =========================
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/xwww-form-urlencoded
app.use(upload.array()); // for parsing multipart/form-data
/* load form data */
app.get('/form_load', function(req, res){
   res.render('form/form');
});

app.post('/post_process', function(req, res){
    response = {
            name:req.body.nama,
            addr:req.body.alamat
        };
        console.log(response);
        res.end(JSON.stringify(response));
});


//==================== MANAGE DATABASE WITH MONGODB =========================



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var server = app.listen(8000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})