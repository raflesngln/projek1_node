var nama = "nama	:"; //private
var addr = "Alamat :"; //private

var mydata = function(x) {
	return nama + " " + x;
} 
var myaddress = function(x) {
	return addr + " " + x;
} 
module.exports.mydata=mydata; //public
module.exports.myaddress=myaddress; //public