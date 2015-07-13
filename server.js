var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Words = require('./api/models/wordsM');
var Category = require('./api/models/categoryM');
var cors = require('cors');

mongoose.connect('mongodb://localhost/HangularMan');

var app = express();
var port = 9420;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res) {
	return res.json({message : "hello world"});
});

//get all categories for select menu in view
app.get('/api/categories', function(req, res) {
	Category.find({}).exec()
	.then(function(allCategories) {
		if(!allCategories){
			return res.status(404).end();
		}
		return res.json(allCategories);
	});
});//end get /api/category -- HangularService.getCategories -- HS.setupGame

//ADD NEW CATEGORY/////////////////////////////////////
app.post('/api/categories', function(req, res) {
	Category.create({
		category : req.body.category
	}, function(err, new_category){
		if(err) {
			return res.status(500).end();
		}
		return res.json(new_category);
	});
}); // end post /api/category  -- HangularService.addCategory

//Add word to specific category
app.post('/api/categories:category', function(req, res) {
	Category.findOneAndUpdate({category : req.body.category}, {$push : {words : req.body.word}}, {new : true}, function(err, new_word) {
		if(err) {
			return res.status(500).end();
		}
		return res.json(new_word);
	});
});// end post /api/categories:category


app.listen(port, console.log('listening on port ' + port));







//////////////////////////////////////////////////////
///////////CANT USE, LEFT FOR REF/////////////////////
//////////////////////////////////////////////////////

//ORIGINAL GET WORDS -- LEFT FOR REFERENCE
/*//Get Words
app.get('/api/words', function(req, res) {
	Words.find({}).exec()
	.then(function(words) {
		res.json(words);
	});
}); // end get /api/words -- HangularService.getWords*/

/*	//ORIGINAL ADD WORD -- LEFT FOR REFERENCE
app.post('/api/words', function(req, res) {
	Words.create({
		word : req.body.word
	}, function(err, new_word) {
		if(err) {
			return res.status(500).end();
		}
		return res.json(new_word);
	});
});// end post api/words -- HangularService.addWord -- */ 