
//'use strict';
var express = require('express');
var app = express();

// for handle post method
var bodyParser = require('body-parser'); 
var urlencodedParser = bodyParser.urlencoded({ extended: false }); // Create application/x-www-form -urlencoded parser

// for handle file upload
//var fs = require("fs");                  
//var multer = require('multer');        // for handle file upload
//app.use(multer({ dest: './uploads/'}));
//app.use(multer({dest:'./uploads/'}).single('photo'));
//var upload = multer({dest: './public/uploads' });
//app.use(multer({ dest: '/tmp/'}));
var multer = require('multer');
var path = require('path');
var upload = multer(
    { 
        dest : 'uploads/',
        fileFilter : function(req, file , inst){

            var extFile = path.extname(file.originalname);
            if(extFile !== ".jpg"){
                // skip uploadnya
                inst(null, false)
            } else {
                inst(null, true)
            }
        }
    }
);




app.use(express.static('public'));

var cors = require('cors');
var sharp = require('sharp');
/* Cross Origin */
app.use(cors());

app.post('/fileupload', upload.single('photo'), function(req,res){
    if(req.file){
        sharp('./'+req.file.path).toBuffer().then(
            (data) => {
                sharp(data).resize(150).toFile('./'+req.file.path, (err,info) => {
                    res.send("oke");
                });
            }
        ).catch(
            (err) => {
                res.send('something wrong');
            }
        )
    } else {
        console.log('kamu upload apa hayoo');
        res.send('kamu upload apa gan? file apa hayoo');
    }
});




//=============== GET METHOD ===========================================
//----------GET form
app.get('/get_input', function (req, res) {
    //res.send('Hello World');
     res.sendFile(__dirname + '/public/form/get_methode.html');
     //res.sendFile(__dirname + '/public/about.html');
})

//----------process GET
app.get('/get_process', function (req, res) {
// Prepare output in JSON form at
response = {
            first_name:req.query.first_name,
            last_name:req.query.last_name
         };
    console.log(response);
    res.end(JSON.stringify(response));
})

//======================POST METHOD ==================================
app.get('/post_input', function (req, res) {
     res.sendFile(__dirname + '/public/form/post_methode.html');
})

//----------process POST
app.post('/post_process', urlencodedParser, function (req, res) {
// Prepare output in JSON form at
response = {
            first_name:req.body.first_name,
            last_name:req.body.last_name
        };
        console.log(response);
        res.end(JSON.stringify(response));
})
//======================UPLOAD METHOD ==================================
//form upload open
app.get('/upload_form', function (req, res) {
    res.sendFile(__dirname + '/public/form/file_upload.html');
})

//Process Upload
app.post('/upload_process', function (req, res) {
    console.log(req.files.file.name);
    console.log(req.files.file.path);
    console.log(req.files.file.type);

    var file = __dirname + "/" + req.files.file.name;
    fs.readFile(req.files.file.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
            if(err){
                console.log(err);
            }else{
            response = {
                message:'File uploaded successfully',
                filename:req.files.file.name
              };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
})




//===================GET METHOD Default
app.get('/', function (req, res) {
    //res.send('Hello World');
     res.sendFile(__dirname + '/public/index.html');
})
//===================GET METHOD Default
app.get('/about', function (req, res) {
    //res.send('Hello World');
     res.sendFile(__dirname + '/public/about.html');
})


// This responds a POST request for the hom epage
app.post('/', function (req, res) {
console.log("Got a POST request for the hom epage");
res.send('Hello POST');
})

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
console.log("Got a DELETE request for /del_user");
res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user', function (req, res) {
console.log("Got a GET request for /list_user");
res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab* cd', function(req, res) {
console.log("Got a GET request for /ab* cd");
res.send('Page Pattern Match');
})

// routing ke halaman apapun yang tidak didefinisikan. atau halaman 404
app.get('*', function(req,res){
    // disini, kamu bisa melakukan redirect ke halaman 404 yang sudah kamu buat
    console.log('you access the wrong path');
    res.sendFile(__dirname + '/public/error_404.html');
});


var server = app.listen(8000, function () {
var host = server.address().address
var port = server.address().port
console.log("Example app listening at http://%s:%s", host, port)
})