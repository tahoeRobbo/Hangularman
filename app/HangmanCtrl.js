var app = angular.module('Hangular');

app.controller('HangularCtrl', function($scope, HangularService){
	$scope.test = "Hullo";
	
	$scope.makeGuess = function() {
		HangularService.updateGameState($scope.guess, $scope.word, $scope.answerArray);
	};//end $scope.makeGuess
	
	
	
	$scope.setupGame = function() {
		HangularService.setupGame();
		$scope.answerArray = HangularService.answerArray;
		$scope.word = HangularService.word;
		$scope.remainingLetters = HangularService.remainingLetters;
	};
});//end HangularCtrl