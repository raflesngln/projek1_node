var express = require('Express');
var app = express();
var my_module = require('./my_module.js');

//both my_module.js and my_module.js should be in same directory
app.use('/my_module', my_module);


//use for dynamic routes access param
app.get('/:nama/:alamat', function(req, res){
	res.send('Anda mengakses URL dengan URI ke-1  ' + req.params.nama + ',  URI param ke-2 ' + req.params.alamat);
});

//Pattern Matched Routes, id to be maks 5-digit long number
/* app.get('/things/:id([0-9]{5})', function(req, res){
	res.send('id: ' + req.params.id);
}); */

//all routes if not founded routes
app.get('*', function(req, res){
	res.send('Sorry, this is an invalid URL.');
});
app.listen(3000);


var server = app.listen(8000, function () {
var host = server.address().address
var port = server.address().port
console.log("Example app listening at http://%s:%s", host, port)
})