var app = angular.module('Hangular');

app.controller('HangularCtrl', function($scope, HangularService){

	
	$scope.test = "Hullo";
	
	//Set up game -- select word, create answer array, toggle buttons
	//and put answerArray into the view
	$scope.setupGame = function() {
		HangularService.setupGame();
		$scope.answerArray = HangularService.answerArray;
		$scope.word = HangularService.word;
		$scope.playAgain = HangularService.playAgain;
	};// end setupGame
	
		
	//Make Guess - take guess from input in view, pass into 
	//updateGameState - updates answerArray, changes buttons when user 
	//wins
	$scope.makeGuess = function() {
		HangularService.updateGameState($scope.guess, $scope.word, $scope.answerArray);
		$scope.guess = '';
		$scope.answerArray = HangularService.answerArray;
		$scope.playAgain = HangularService.playAgain;
	};//end $scope.makeGuess
	
});//end HangularCtrl