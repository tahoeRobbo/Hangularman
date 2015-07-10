var app = angular.module('Hangular');

app.service('HangularService', function($http, $q) {
		/*GAME ESSENTIALS*/
	this.playAgain = false;
	
/*	this.pickWord = function() {
		var words = ['entourage', 'wheat', 'three'];
		console.log('this.pickWord HIT')
		return words[Math.floor(Math.random() * words.length)];
	};//end pickWord*/
	
	this.word;
	
	this.pickWord = function() {
		var dfd = $q.defer();
		var that = this;
		$http({
			method : 'GET',
			url : 'http://127.0.0.1:9420/api/words'
		}).then(function(response){
			dfd.resolve(response.data);
			console.log(response.data);
			var word = response.data[Math.floor(Math.random() * response.data.length)].word;
			console.log(word);
			that.word = word;
			that.answerArray = that.setupAnswerArray(that.word);
			that.remainingLetters = that.word.length;
			that.playAgain = false;
		});
		return dfd.promise;
	};
	



	
	this.setupAnswerArray = function(word) {
		console.log('this.setupAnswerArray HIT');
		var answerArray = [];
		for(var i = 0; i < word.length; i++) {
			answerArray[i] = " _";
		}
		console.log(answerArray);
		return answerArray;
	}; // end setupAnswerArray
	
	//GAME STATE CREATION AND GAME EXECUTION//
	
//	this.setupGame = function() {
//		console.log(this.word);
//		this.answerArray = this.setupAnswerArray(this.word);
//		this.remainingLetters = this.word.length;
//		this.playAgain = false;
//	};//end setupGame
	
	this.updateGameState = function(guess, word, answerArray) {
		console.log('this.uGS HIT');
		for(var i = 0; i < word.length; i++) {
			if(guess === word[i]) {
				answerArray[i] = guess;
				this.remainingLetters -= 1;
				console.log(this.remainingLetters);
				if(this.remainingLetters === 0) {
					this.answerArray = "You got it! The answer was " + this.word + "!!";
					this.playAgain = true;
				}// end You Win! section
			}// end correct guess section
		}// end for loop
	};// end updateGameState
	
});//end HangularService