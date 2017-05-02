'use strict';

angular.module('classroomApp', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider.state('login', {
    url: '/',
    templateUrl: '../views/login.html',
    controller: 'loginCtrl'
  }).state('home', {
    url: '/home',
    templateUrl: '../views/home.html',
    controller: 'homeCtrl'
  }).state('class', {
    url: '/class',
    parent: 'home',
    templateUrl: '../views/class.html',
    controller: 'classCtrl'
  }).state('planner', {
    url: '/planner',
    parent: 'home',
    templateUrl: '../views/planner.html',
    controller: 'plannerCtrl'
  }).state('scores', {
    url: 'scores/:id',
    parent: 'home',
    templateUrl: '../views/scores.html',
    controller: 'scoresCtrl'
  });

  $urlRouterProvider.otherwise('/');
});
'use strict';

angular.module('classroomApp').service('mainSvc', function ($http) {
  var baseUrl = 'http://localhost:3000/';
  this.login = function (user) {
    // console.log(user);

    return $http({
      method: 'POST',
      url: baseUrl + 'api/users',
      data: user
    }).then(function (response) {
      //  console.log(response);
      return response;
    });
  };
  this.getUser = function () {
    return $http.get(baseUrl + 'api/users').then(function (response) {
      console.log(response.data[0]);
      return response.data[0];
    });
  };
  this.getStudents = function () {
    return $http.get(baseUrl + 'api/students').then(function (response) {
      console.log(response);
      return response.data;
    });
  };
  this.getAssignments = function () {
    return $http.get(baseUrl + 'api/assignments').then(function (response) {
      return response.data;
    });
  };
  this.getScore = function () {
    return $http.get(baseUrl + 'api/scores').then(function (response) {
      return response.data;
    });
  };
  this.addScore = function (score) {
    return $http({
      method: 'POST',
      url: baseUrl + 'api/scores',
      data: score
    }).then(function (response) {
      return response.data;
    });
  };
  this.addAssignment = function (assignment) {
    return $http({
      method: 'POST',
      url: baseUrl + 'api/assignments',
      data: assignment
    }).then(function (response) {
      console.log(response);
      return response.data;
    });
  };
});
'use strict';

angular.module('classroomApp').controller('classCtrl', function ($scope, mainSvc) {
  $scope.getStudents = function () {
    mainSvc.getStudents().then(function (response) {
      $scope.class = response;
      // console.log(response, 'students');
    });
  };
  $scope.getStudents();
  $scope.getAssignments = function () {
    mainSvc.getAssignments().then(function (response) {
      $scope.assignments = response;
      // console.log(response, 'assignments');
    });
  };
  $scope.getAssignments();
  $scope.submitScore = function (student, assignmentid, score, subj) {
    var scoreObj = {};
    scoreObj.studentid = student;
    scoreObj.assignmentid = assignmentid;
    scoreObj.score = score;
    scoreObj.subj = subj;
    // console.log(scoreObj, student);
    mainSvc.addScore(scoreObj).then(function (response) {
      alert(response);
    });
  };
});
'use strict';

angular.module('classroomApp').controller('homeCtrl', function ($scope, $window, mainSvc, $location) {
  var screenWidth = $window.innerWidth;
  if (screenWidth <= 600) {
    $scope.show = false;
  } else {
    $scope.show = true;
  }
  $scope.getUser = function () {
    mainSvc.getUser().then(function (response) {
      $scope.currentUser = response;
      console.log(response);
    });
    // console.log($scope.currentUser);
  };
  $scope.getUser();
  console.log($scope.currentUser);
});
'use strict';

angular.module('classroomApp').controller('loginCtrl', function ($scope, mainSvc, $location) {
  $scope.login = function (user) {
    mainSvc.login(user).then(function (response) {
      if (response.data) {
        $location.path('/home');
        $scope.currentUser = response.data[0];
      } else {
        alert('Incorrect Username/Password');
      }
    });
  };
});
'use strict';

angular.module('classroomApp').controller('plannerCtrl', function ($scope, mainSvc) {
  $scope.addAssignment = function (assignment) {
    mainSvc.addAssignment(assignment).then(function (response) {
      alert(response);
    });
  };
});
'use strict';

angular.module('classroomApp').controller('scoresCtrl', function ($scope, $stateParams, mainSvc) {
  $scope.getStudent = function () {
    mainSvc.getStudents().then(function (response) {
      var students = response;
      var student = {};
      for (var i = 0; i < students.length; i++) {
        if (students[i].id === parseInt($stateParams.id)) {
          student = students[i];
        }
      }
      $scope.student = student;
      //  console.log($scope.student);
    });
  };
  $scope.getStudent();
  $scope.getScores = function () {
    var scores = [];
    mainSvc.getScore().then(function (response) {
      //  console.log($scope.student, response);
      for (var i = 0; i < response.length; i++) {
        if (response[i].studentid === parseInt($scope.student.id)) {
          scores.push(response[i]);
        }
      }
      console.log(scores);
      $scope.scores = scores;
    });
  };
  $scope.getScores();

  var svg = d3.select("svg"),
      margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom;

  var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0]);
  var g = svg.append("g").attr("transform", 'translate(' + margin.left + ', ' + margin.top + ')');
});
//# sourceMappingURL=bundle.js.map
