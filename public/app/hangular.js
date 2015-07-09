var app = angular.module('Hangular', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl : 'app/mainTmpl.html',
		controller : 'HangularCtrl'
	})
	.otherwise('/');
});//end router
