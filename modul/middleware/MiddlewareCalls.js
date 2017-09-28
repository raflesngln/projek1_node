var express = require('express');
var app = express();

//First middleware before response is sent
app.use(function(req, res, next){
		console.log("Start middleawre function");
		next();
});

//Route handler
app.get('/', function(req, res, next){
		res.send("Middle middleawre function");
		next();
});

app.use('/', function(req, res){
		console.log('End middleawre function');
});

app.listen(8000);