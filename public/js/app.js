angular.module('classroomApp', ['ui.router', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache'])
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
      .state('assignments', {
        url: '/assignments',
        parent: 'planner',
        templateUrl: '../views/assignments.html',
        contoller: 'plannerCtrl'
      })
      .state('lessons', {
        url: '/lessons',
        parent: 'planner',
        templateUrl: '../views/lessons.html',
        contoller: 'plannerCtrl'
      })
      .state('students', {
        url: '/students',
        parent: 'planner',
        templateUrl: '../views/students.html',
        contoller: 'plannerCtrl'
      })
      .state('dayView', {
        url: '/:day',
        parent: 'home',
        templateUrl: '../views/dayView.html',
        controller: 'dayViewCtrl'
      })

    $urlRouterProvider
      .otherwise('/')
  })
