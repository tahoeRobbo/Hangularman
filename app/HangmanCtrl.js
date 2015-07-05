var app = angular.module('Hangular');

app.controller('HangularCtrl', function($scope, HangularService){
	$scope.test = "Hullo";
	
	$scope.makeGuess = function() {
		HangularService.makeGuess($scope.guess);
	};//end $scope.makeGuess
	
	
	
	$scope.setupGame = function() {
		HangularService.setupGame();
		$scope.answerArray = HangularService.answerArray;
	}
});//end HangularCtrl