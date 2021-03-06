var app = angular.module('Hangular');

app.service('HangularService', function($http, $q) {
		/*GAME ESSENTIALS*/
	this.playAgain = false;
	this.word;
	this.wordErr;
	this.remainingGuesses;
	this.categoryArray;
	
	this.setupGame = function(category) {
		var dfd = $q.defer();
		var that = this;
		$http({
			method : 'GET',
			url : 'http://127.0.0.1:9420/api/categories'
		}).then(function(response){
			dfd.resolve(response.data);
			for(var i = 0; i < response.data.length; i++) {
				if(response.data[i].category === category) {
					console.log('responseFromMongoInService' + response.data[i].words);
					var word = response.data[i].words[Math.floor(Math.random() * response.data[i].words.length)];
					console.log('this.word is -- ' + word);
					that.word = word;
					that.answerArray = that.setupAnswerArray(that.word);
					that.remainingLetters = that.word.length;
					that.remainingGuesses = 7;
					that.playAgain = false;					
					return;	
				}
			}	
		});//end .then & dfd.resolve functions
		return dfd.promise;
	};
	
	
	this.setupAnswerArray = function(word) {
		console.log('this.setupAnswerArray HIT');
		var answerArray = [];
		for(var i = 0; i < word.length; i++) {
			answerArray[i] = "_";
		}
		console.log(answerArray);
		return answerArray;
	}; // end setupAnswerArray
	
	//GAME STATE CREATION AND GAME EXECUTION//
		
	this.updateGameState = function(guess, word, answerArray, remGuesses) {
		console.log('this.uGS HIT');
		var count = 0;
		var splitWord = word.split('');
		console.log(splitWord);
		for(var i = 0; i < word.length; i++) {
			if(guess === splitWord[i]) {
				answerArray[i] = guess;
				splitWord[i] = ' ';
				this.remainingLetters -= 1;
				console.log(this.remainingLetters);
				console.log(splitWord);
				word = splitWord;
				count +=1;
				remGuesses += count;
				if(this.remainingLetters === 0) {
					this.answerArray = "You got it! The answer was " + this.word + "!!";
					this.playAgain = true;
				}// end You Win! section

			}// end correct guess section
			if(this.remainingGuesses <= 1) {
				this.remainingGuesses = remGuesses -=1;
				return this.answerArray = "Uh oh... the word was " + this.word + "...";
				}
		}// end for loop
		if(count > 0) { return; }
		return (this.remainingGuesses = remGuesses -=1);
	};// end updateGameState
	
//*******************API CALLS TO BACKEND *********************\\
	//also a call in this.setupGame
	this.addWord = function(catWordObj) {
		if((!catWordObj.newWord) || (catWordObj.newWord.length <= 2)) {
		 	this.wordErr = true;
			return;
		}//
		$http({
			method: 'POST',
			url : 'http://127.0.0.1:9420/api/categories:category',
			data: {
				"word" : catWordObj.newWord,
				"category" : catWordObj.category
			}
		});
	};//end this.addWord
	
	
	this.addCategory = function(category) {
		if((!category) || (category.length <= 2)) {
		 	this.categoryErr = true;
			return;
		}//makes 
		$http({
			method: 'POST',
			url : 'http://127.0.0.1:9420/api/categories',
			data: {
				"category" : category
			}
		});
	};//end this.addCategory
	
	this.getCategories = function() {
		var dfd = $q.defer();
		$http({
			mehtod : "GET",
			url : 'http://127.0.0.1:9420/api/categories'
		})  //end $http call
		.then(function(allCategories) {
			dfd.resolve(allCategories.data);
			console.log(allCategories.data);
			var categoryArray = [];
			for(var i = 0; i < allCategories.data.length; i++) {
				categoryArray.push(allCategories.data[i].category);
			}
			console.log(categoryArray);
			return categoryArray;
		}); //end .then & dfd.resolve 
		
		return dfd.promise;
	};//end this.getCategories
		
});//end HangularService










//			**LEGACY** BEFORE MONGO
/*	this.pickWord = function() {
		var words = ['entourage', 'wheat', 'three'];
		console.log('this.pickWord HIT')
		return words[Math.floor(Math.random() * words.length)];
	};//end pickWord*/