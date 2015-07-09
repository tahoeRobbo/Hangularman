var mongoose = require('mongoose');

var wordsSchema = mongoose.Schema({
	word : String
});

module.exports = mongoose.model('Words', wordsSchema);
