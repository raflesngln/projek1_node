
var express = require('express');
var app = express();
var router = express.Router();
app.use(express.static('public'));

router.get('/user/:id',function(req, res){
	res.send('user' + req.params.id);
});

router.get('/data/*.*',function(req, res){
	//res.send('./public/error_404.html: ' + req.params);
	res.sendFile(__dirname + '/public/error_404.html');
});


var server = app.listen(8000, function () {
var host = server.address().address
var port = server.address().port
console.log("Example app listening at http://%s:%s", host, port)
})