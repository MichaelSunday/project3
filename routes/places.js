

// Request API access: http://www.yelp.com/developers/getting_started/api_access
var express = require('express');

var placesController = express.Router();


var yelp = require("yelp").createClient({
  consumer_key: "Ywx_i66UnPBCyCned5A5Cg", 
  consumer_secret: "tW_1am0zqABAgKcodi5P454k5U0",
  token: "gelHXikNJkEg2IDRfyRcSsk4sRgtgTQm",
  token_secret: "pxGh2rDa0tOtG9eRd7CwHRP6SoY"
});

// $(document).ready(function() {
// 	$.get('http://www.omdbapi.com/?s=samurai', function(response, status) {
// 		if (status == 'success') {
// 			console.log(response);
// 			// MOVIES = response;
// 			// initPage();
// 		}
// 	});
// });

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({term: "bars", location: "Los Angeles"}, function(error, data) {
  //console.log(error);
  //console.log(data);
});

// See http://www.yelp.com/developers/documentation/v2/business
yelp.business("yelp-san-francisco", function(error, data) {
  //console.log(error);
  //console.log(data);
});
placesController.get('/', function(req, res){
	// yelp.search({term: "bars", location: "Los Angeles"}, function(error, data) {
	    //console.log(error);
	    //console.log(data);
	    res.render('index');

});
placesController.get('/places', function(req, res){
	// console.log('go')
	var location = req.query.searchTerm;
	console.log(location);
	// yelp.search({term: "bars", location: location}, function(error, data) {
	//   // console.log(error);
	//   // console.log(data.businesses);
	//   // res.json(data.businesses);
	// });
});

module.exports = placesController;
