angular.module('appRoutes', [])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/hn', {
			templateUrl: 'views/source.html',
			controller: 'MainController'
		})

		.when('/lb', {
			templateUrl: 'views/source.html',
			controller: 'MainController'
		})

		.when('/r/:subreddit?', {
			templateUrl: 'views/source.html',
			controller: 'MainController'
		})

		.when('/404', {
			templateUrl: 'views/404.html'
		})

		.otherwise({
			redirectTo: '/404'
		});

	$locationProvider.html5Mode(true);

}]);