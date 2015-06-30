'use strict';

/* App Module */

var openpollApp = angular.module('openpollApp', [
  'ngRoute',
  'phonecatAnimations',
  'openpollControllers',
  'phonecatFilters',
  'openpollServices',
  'ngSanitize'
]);


openpollApp.config(['$locationProvider', function($locationProvider) {
     $locationProvider.hashPrefix('!');
}]);


openpollApp
.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/polls/', {
        templateUrl: 'partials/poll-list.html',
        controller: 'PollListCtrl'
      }).	
      when('/polls/:pageIndex', {
        templateUrl: 'partials/poll-list.html',
        controller: 'PollListCtrl'
      }).
      when('/poll/:pollId', {
        templateUrl: 'partials/poll-detail.html',
        controller: 'PollDetailCtrl'
      }).
      when('/prevote/:pollId', {
        templateUrl: 'partials/poll-prevote.html',
        controller: 'PollPrevoteCtrl'
      }).	
      when('/prevote/:pollId/:secretCode', {
        templateUrl: 'partials/poll-prevote.html',
        controller: 'PollPrevoteCtrl'
      }).		  
      when('/confirmpoll/:pollId/:secretCode', {
        templateUrl: 'partials/poll-confirm.html',
        controller: 'PollConfirmCtrl'
      }).
      when('/search/:searchString/:pageIndex', {
        templateUrl: 'partials/poll-search.html',
        controller: 'PollSearchCtrl'
      }).	  
      when('/create', {
        templateUrl: 'partials/poll-create.html',
        controller: 'PollCreateCtrl'
      }).	
	  when('/category/:idCategory/:pageIndex', {
        templateUrl: 'partials/poll-category.html',
        controller: 'PollCategoryCtrl'
      }).
	  when('/faq', {
        templateUrl: 'partials/poll-faq.html'
      }).
	  when('/chisiamo', {
        templateUrl: 'partials/poll-chisiamo.html'
      }).
	  when('/grazie', {
        templateUrl: 'partials/poll-grazie.html'
      }).	  
	  when('/api', {
        templateUrl: 'partials/poll-api.html'
      }).	  
	  when('/includesite', {
        templateUrl: 'partials/poll-includesite.html'
      }).	  	  
	  when('/termini', {
        templateUrl: 'partials/poll-termini.html'
      }).
      otherwise({
        redirectTo: '/polls'
      });
  }]);
