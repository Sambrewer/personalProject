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
        controller: 'loginCtrl'
      })
      .state('class', {
        url: '/class',
        parent: 'home',
        templateUrl: '../views/class.html',
        controller: 'classCtrl'
      })

    $urlRouterProvider
      .otherwise('/')
  })
