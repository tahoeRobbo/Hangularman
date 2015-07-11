var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
	category : String
});

module.exports = mongoose.model('Category', categorySchema);