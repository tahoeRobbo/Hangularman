var app = angular.module('Hangular');

app.controller('HangularCtrl', function($scope, HangularService){
	$scope.test = "Hullo";
	
	$scope.makeGuess = function() {
		HangularService.makeGuess($scope.guess);
	};//end $scope.makeGuess
});//end HangularCtrl