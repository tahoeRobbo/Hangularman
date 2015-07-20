var app = angular.module('Hangular');

app.controller('HangularCtrl', function($scope, HangularService, $q){

	
	$scope.test = "Hullo";
	$scope.wordErr = HangularService.wordErr;
	$scope.lastGuess = false;
	$scope.showInput = true;
	
	
	//Set up game -- select word, create answer array, toggle buttons
	//and put answerArray into the view
	$scope.setupGame = function() {
		var dfd = $q.defer();
		
			console.log('XXX ' + $scope.selectedCategoryObject.category);
		//$scope.styleState = $scope.selectedCategoryObject.category;
		if($scope.selectedCategoryObject.category) { 
			$scope.styleState = $scope.selectedCategoryObject.category;
		}
		console.log($scope.styleState, ' styleState');
		
		HangularService.setupGame($scope.selectedCategoryObject.category)
		.then(function(res) {
			console.log(res +'from the HangCtrl');
			dfd.resolve(res);
			if(res){
				$scope.answerArray = HangularService.answerArray;
				$scope.word = HangularService.word;
				$scope.playAgain = HangularService.playAgain;
				$scope.remainingGuesses = HangularService.remainingGuesses;
				$scope.wordErr = false;
				$scope.lastGuess = false;
				console.log($scope.remainingGuesses, " from Ctrl");
				$scope.showInupt = true;
				$scope.playAgainAddCategory = false;
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
		console.log($scope.remainingGuesses);
		if($scope.remainingGuesses === 1){
			$scope.lastGuess = true;
		}
		if($scope.remainingGuesses < 1){
			$scope.lastGuess = false;
			$scope.showInput = false;
			$scope.playAgain = true;
		}
	};//end $scope.makeGuess
	
	$scope.toggleAddCategory = function() {
		$scope.playAgainAddCategory = true;
	}
	
	$scope.getCategories = function() {
		HangularService.getCategories()
		.then(function(res){
			$scope.allCategories = res;
		});
		

	};
	
	//**ADD TO GAME**
	
	$scope.addWord = function() {
		HangularService.addWord($scope.selectedCategoryObject);
		$scope.selectedCategoryObject.newWord = '';
	};// end $scope.addWord
	
	$scope.addCategory = function() {
		console.log('addCategory in ctrl HIT');
		HangularService.addCategory($scope.newCategory);
		$scope.newCategory = '';
		setTimeout($scope.getCategories, 150);
	};// end $scope.addWord
	
	
});//end HangularCtrl