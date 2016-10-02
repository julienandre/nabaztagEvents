var request = require('request');
var config = require('config');
var nab = config.get('nabaztag');


var exports = module.exports = {};

var earspos = {
	left: 0,
	right: 0
}

// which = right/left
// pos = [0;16]
exports.ears = function( which, pos ){
	request('http://'+nab.ip+'/'+which+'?p='+pos+'&d=0', 
			function (error, response, body) {
				if(error){
					throw error;
				}
				earspos[which] = pos;
		});
}

exports.earsTurn = function( which ){
	var posprec = (earspos[which]==0)?16:earspos[which]-1;
	exports.ears( which, posprec );
	setTimeout( function(){
		exports.ears( which, earspos[which] );
	}, 1000 );
}

exports.noseblinkonce = function(){
	exports.noseblink(1);
}

exports.noseblink = function( duration ){
		request('http://'+nab.ip+'/nose?v=1', 
			function (error, response, body) {
				if(error){
					throw error;
				}
		});
		setTimeout( function(){
			exports.nosestop();
		}, duration*1000 );
}

exports.nosestop = function(){
		request('http://'+nab.ip+'/nose?v=0', 
			function (error, response, body) {
				if(error){
					throw error;
				}
			});
}