
var express = require('express');
var app = express();



// Memanggil file menggunakan fs library asli nodeJS
var path = require("path");
app.use(express.static(__dirname + '/public'));

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
console.log("Exam ple app listening at http://%s:%s", host, port)
})