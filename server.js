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

//Get Words
app.get('/api/words', function(req, res) {
	Words.find({}).exec()
	.then(function(words) {
		res.json(words);
	});
}); // end get /api/words -- HangularService.getWords

//get all categories for select menu in view
app.get('/api/categories', function(req, res) {
	Category.find({}).exec()
	.then(function(allCategories) {
		if(!allCategories){
			return res.status(404).end();
		}
		return res.json(allCategories);
	});
});//end get /api/category -- HangularService.getCategories

//get specific category -- might fold into get word
app.get('/api/categories:category', function(req, res) {
	Category.findOne({ category : req.params.category }).exec()
	.then(function(category) {
		if(!category) {
			return res.status(404).end();
		}
		return res.json(category);
	});
});//end get /api/category:categories

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

app.post('/api/words', function(req, res) {
	Words.create({
		word : req.body.word
	}, function(err, new_word) {
		if(err) {
			return res.status(500).end();
		}
		return res.json(new_word);
	});
});// end post api/words -- HangularService.addWord --

app.listen(port, console.log('listening on port ' + port));