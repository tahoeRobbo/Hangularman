var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
	category : String,
	words : []
});

module.exports = mongoose.model('Category', categorySchema);