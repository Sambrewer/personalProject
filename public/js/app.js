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
      .state('classroom', {
        url: '/classroom',
        parent: 'home',
        templateUrl: '../views/classroom.html',
        controller: 'classroomCtrl'
      })
      .state('scores', {
        url: '/scores/:id',
        parent: 'home',
        templateUrl: '../views/scores.html',
        controller: 'scoresCtrl'
      })
      .state('lesson', {
        url: '/lesson/:id',
        parent: 'home',
        templateUrl: '../views/lesson.html',
        controller: 'lessonCtrl'
      })

    $urlRouterProvider
      .otherwise('/')
  })
