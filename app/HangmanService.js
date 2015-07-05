var app = angular.module('Hangular');

app.service('HangularService', function() {
	this.makeGuess = function(guess) {
		return guess;
	};
	
	this.pickWord = function() {
		var words = ['entourage', 'wheat', 'three'];
		console.log('this.pickWord HIT')
		return words[Math.floor(Math.random() * words.length)];
	};//end pickWord
	
	this.setupAnswerArray = function(word) {
		console.log('this.setupAnswerArray HIT')
		var answerArray = [];
		for(var i = 0; i < word.length; i++) {
			answerArray[i] = " _";
		}
		console.log(answerArray);
		return answerArray;
	}; // end setupAnswerArray
	
	this.showPlayerProgress = function(answerArray) {
		return answerArray;
	};// end showPlayerProgress;
	
	this.updateGameState = function(guess, word, answerArray) {
		var count = 0;
		for(var i = 0; i < word.length; i++) {
			if(guess === word[i]) {
				answerArray[i] = guess;
				count +=1;
			}
		}
		return count;
	};// end updateGameState
	
	

	
	//**Game Loop**
	this.setupGame = function() {
		var word = this.pickWord();
		this.answerArray = this.setupAnswerArray(word);
		var remainingLetters = word.length;
	};
	
	/*this.playGame = function() {
		//Start Game Loop
		while(remainingLetters > 0) {
			this.showPlayerProgress(answerArray);
			this.makeGuess();
			if (!guess) {
				break;
			} else if (guess.length !== 1) {
				alert('Only one letter ya poofter');
			} else {
				var correctGuesses = this.updateGameState(guess, word, answerArray);
				remainingLetters -= correctGuesses;
			}//end if cases
		}//end while loop -- game loop
		
	};//end playGame game -- including game loop*/
});