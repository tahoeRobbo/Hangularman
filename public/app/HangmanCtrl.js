var app = angular.module('Hangular');

app.controller('HangularCtrl', function($scope, HangularService, $q){

	
	$scope.test = "Hullo";
	$scope.wordErr = HangularService.wordErr;
	$scope.lastGuess = false;
	
	//Set up game -- select word, create answer array, toggle buttons
	//and put answerArray into the view
	$scope.setupGame = function() {
		var dfd = $q.defer();
		HangularService.setupGame()
		.then(function(res) {
			console.log(res +'from the HangCtrl');
			dfd.resolve(res);
			if(res){
				$scope.answerArray = HangularService.answerArray;
				$scope.word = HangularService.word;
				$scope.playAgain = HangularService.playAgain;
				$scope.remainingGuesses = HangularService.remainingGuesses;
				$scope.wordErr = false;
				console.log($scope.remainingGuesses, " from Ctrl");
			}
		});
		return dfd.promise;
	};// end setupGame
	
		
	//Make Guess - take guess from input in view, pass into 
	//updateGameState - updates answerArray, changes buttons when user 
	//wins
	$scope.makeGuess = function() {
		HangularService.updateGameState($scope.guess, $scope.word, $scope.answerArray, $scope.remainingGuesses);
		$scope.guess = '';
		$scope.answerArray = HangularService.answerArray;
		$scope.playAgain = HangularService.playAgain;
		$scope.remainingGuesses = HangularService.remainingGuesses;
		if($scope.remainingGuesses === 1){
			$scope.lastGuess = true;
		}
	};//end $scope.makeGuess
	
	$scope.addWord = function() {
		HangularService.addWord($scope.newWord);
		$scope.newWord = '';
	};
	
	
	
});//end HangularCtrl