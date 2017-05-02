angular.module('classroomApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: '../views/login.html',
        controller: 'loginCtrl'
      })
      .state('home', {
        url: '/home',
        templateUrl: '../views/home.html',
        controller: 'homeCtrl'
      })
      .state('class', {
        url: '/class',
        parent: 'home',
        templateUrl: '../views/class.html',
        controller: 'classCtrl'
      })
      .state('planner', {
        url: '/planner',
        parent: 'home',
        templateUrl: '../views/planner.html',
        controller: 'plannerCtrl'
      })
      .state('scores', {
        url: '/class/:id',
        templateUrl: '../views/scores.html',
        controller: 'scoresCtrl'
      })

    $urlRouterProvider
      .otherwise('/')
  })
