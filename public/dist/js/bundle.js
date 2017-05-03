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
  }).state('classroom', {
    url: '/classroom',
    parent: 'home',
    templateUrl: '../views/classroom.html',
    controller: 'classroomCtrl'
  }).state('scores', {
    url: '/scores/:id',
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
      // console.log(response.data[0]);
      return response.data[0];
    });
  };
  this.getStudents = function () {
    return $http.get(baseUrl + 'api/students').then(function (response) {
      // console.log(response);
      return response.data;
    });
  };
  this.getAssignments = function () {
    return $http.get(baseUrl + 'api/assignments').then(function (response) {
      return response.data;
    });
  };
  this.getScore = function (id) {
    return $http.get(baseUrl + 'api/scores/' + id).then(function (response) {
      return response.data;
    });
  };
  this.getGrades = function (id) {
    console.log('get grades');
    return $http.get(baseUrl + 'test/' + id).then(function (response) {
      console.log('Get Request', response.data);
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
    mainSvc.addScore(scoreObj).then(function (response) {
      alert(response);
    });
  };
});
'use strict';

angular.module('classroomApp').controller('classroomCtrl', function ($scope) {
  $scope.test = "connected";
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
      if ($scope.currentUser === undefined) {
        $location.path('/');
      }
      // console.log(response);
    });
    // console.log($scope.currentUser);
  };
  $scope.getUser();
  // console.log($scope.currentUser);
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

angular.module('classroomApp').controller('scoresCtrl', function ($scope, $stateParams, mainSvc, $location) {
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
    var id = parseInt($stateParams.id);
    mainSvc.getScore(id).then(function (response) {
      //  console.log(response);
      $scope.scores = response;
      if (response.length < 1) {
        alert('No scores for this student');
        $location.path('/home/class');
      } else {
        var rawData = response;
        var literacyScore = [],
            mathScore = [],
            writingScore = [],
            readingScore = [],
            scienceScore = [];
        for (var i = 0; i < rawData.length; i++) {
          if (rawData[i].subject === "Math") {
            mathScore.push([rawData[i].name, rawData[i].score]);
          }
          if (rawData[i].subject === "Literacy") {
            literacyScore.push([rawData[i].name, rawData[i].score]);
          }
          if (rawData[i].subject === "Writing") {
            writingScore.push([rawData[i].name, rawData[i].score]);
          }
          if (rawData[i].subject === "Reading") {
            readingScore.push([rawData[i].name, rawData[i].score]);
          }
          if (rawData[i].subject === "Science") {
            scienceScore.push([rawData[i].name, rawData[i].score]);
          }
        }
        if (mathScore.length > 0) {
          console.log(mathScore);
          var mthChart = new JSChart('mathChart', 'bar');
          mthChart.setDataArray(mathScore);
          mthChart.setTitle('Math');
          mthChart.draw();
        }
        if (literacyScore.length > 0) {
          var litChart = new JSChart('literacyChart', 'bar');
          litChart.setDataArray(literacyScore);
          litChart.setTitle('Literacy');
          litChart.draw();
        }
        if (writingScore.length > 0) {
          var writChart = new JSChart('writingChart', 'bar');
          writChart.setDataArray(writingScore);
          writChart.setTitle('Writing');
          writChart.draw();
        }
        if (readingScore.length > 0) {
          var readChart = new JSChart('readingChart', 'bar');
          readChart.setDataArray(readingScore);
          readChart.setTitle('Reading');
          readChart.draw();
        }
        if (scienceScore.length > 0) {
          var sciChart = new JSChart('scienceChart', 'bar');
          sciChart.setDataArray(scienceScore);
          sciChart.setTitle('Science');
          sciChart.draw();
        }
      }
    });
  };
  $scope.getScores();

  $scope.getGrades = function () {
    var id = parseInt($stateParams.id);
    //  console.log('getting grades', $stateParams.id);
    mainSvc.getGrades(id).then(function (response) {
      var grades = [];
      //  console.log(response);
      for (var i = 0; i < response.length; i++) {
        grades.push([response[i].subject, parseInt(response[i].score)]);
      }
      var gradesChart = new JSChart('gradeChart', 'bar');
      gradesChart.setDataArray(grades);
      gradesChart.setTitle('Grades');
      gradesChart.draw();

      console.log(grades);
    });
  };
  $scope.getGrades();
});
//# sourceMappingURL=bundle.js.map
