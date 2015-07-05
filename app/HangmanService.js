var app = angular.module('Hangular');

app.service('HangularService', function() {
	this.makeGuess = function(guess) {
		console.log('this.makeGuess HIT');
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
		console.log('this.uGS HIT');
		var count = 0;
		for(var i = 0; i < word.length; i++) {
			if(guess === word[i]) {
				answerArray[i] = guess;
				count +=1;
			}
		}
		this.remainingLetters - count;
	};// end updateGameState
	
	

	
	//**Game Loop**
	this.setupGame = function() {
		this.word = this.pickWord();
		this.answerArray = this.setupAnswerArray(this.word);
		this.remainingLetters = this.word.length;
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