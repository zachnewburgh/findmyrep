angular
  .module('app', ['ui.router', 'ngResource', 'templates'])
  .config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'home.html',
          controller: 'HomeController as ctrl'
        });
      $urlRouterProvider.otherwise('/');
    }
  ]);