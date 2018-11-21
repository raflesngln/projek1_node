
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



//load mongoose
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//hubungkan ke Mongodb
mongoose.connect('mongodb://localhost/belajar')  
  .then(() => console.log('Berhasil terhubung dengan MongoDB'))
  .catch((err) => console.error(err));


//Call for PUGS Engine templating
app.set('view engine', 'pug');
app.set('views','./views');

//******************************************ROUTE START FRO HERE ***********************************************************************

//Defaul Route to Home page
app.get('/home', function(req, res){
    res.render('template', { title: 'Belajar Node JS PUGS engine,mongodb dll', message: 'Wellcome to My website!' })
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
//Call form
app.get('/anggota_form', function(req, res){
    res.render('crud_mongo/form_anggota',{ title: 'Belajar Node JS PUGS engine,mongodb dll', message: 'Wellcome to My website!' });
});



app.post('/save_anggota', function(req, res){
    var anggotaInfo = req.body; //Get the parsed information

    if(!anggotaInfo.username || !anggotaInfo.password || !anggotaInfo.alamat || !anggotaInfo.nilai){
            res.render('show_message', {message: "Sorry, Please input form correctly ! ",
            type: "error"});
        } else {
        var newAnggota = new Anggota({
                        username: anggotaInfo.username,
                        password: anggotaInfo.password,
                        alamat: anggotaInfo.alamat,
                        nilai: anggotaInfo.nilai
                 });

        newAnggota.save(function(err, Anggota){
        if(err)
            res.render('show_message', {message: "Database error", type: "error"});
        else
            res.render('show_message', {message: "Data anggota ditambahkan", type:"success", save_anggota: anggotaInfo});
            console.log(response);
            res.end(JSON.stringify(response));
        });
    }

});






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