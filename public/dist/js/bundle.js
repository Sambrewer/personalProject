'use strict';

angular.module('classroomApp', ['ui.router', 'ngMaterial', 'ngMessages', 'material.svgAssetsCache']).config(function ($stateProvider, $urlRouterProvider) {

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
    reload: true,
    templateUrl: '../views/planner.html',
    controller: 'plannerCtrl'
  }).state('classroom', {
    url: '/classroom',
    parent: 'home',
    reload: true,
    templateUrl: '../views/classroom.html',
    controller: 'classroomCtrl'
  }).state('scores', {
    url: '/scores/:id',
    parent: 'home',
    templateUrl: '../views/scores.html',
    controller: 'scoresCtrl'
  }).state('lesson', {
    url: '/lesson/:id',
    parent: 'home',
    templateUrl: '../views/lesson.html',
    controller: 'lessonCtrl'
  }).state('assignments', {
    url: '/assignments',
    parent: 'planner',
    templateUrl: '../views/assignments.html',
    contoller: 'plannerCtrl'
  }).state('lessons', {
    url: '/lessons',
    parent: 'planner',
    reload: true,
    templateUrl: '../views/lessons.html',
    contoller: 'plannerCtrl'
  }).state('students', {
    url: '/students',
    parent: 'planner',
    templateUrl: '../views/students.html',
    contoller: 'plannerCtrl'
  }).state('dayView', {
    url: '/:day',
    parent: 'home',
    templateUrl: '../views/dayView.html',
    controller: 'dayViewCtrl'
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
      // console.log('Get Request', response.data);
      return response.data;
    });
  };
  this.getBehaviour = function () {
    return $http.get(baseUrl + 'behaviour').then(function (response) {
      // console.log('service', response.data);
      return response.data;
    });
  };
  this.getLesson = function () {
    return $http.get(baseUrl + 'api/lesson').then(function (response) {
      // console.log(response.data);
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
      // console.log(response);
      return response.data;
    });
  };
  this.addLesson = function (lesson) {
    return $http({
      method: 'POST',
      url: baseUrl + 'api/lesson',
      data: lesson
    }).then(function (response) {
      // console.log(response.data);
      return response.data;
    });
  };
  this.addStudent = function (student) {
    return $http({
      method: 'POST',
      url: baseUrl + 'api/students',
      data: student
    }).then(function (response) {
      return response.data;
    });
  };
  this.addTeacher = function (teacher) {
    return $http({
      method: 'POST',
      url: baseUrl + 'api/teachers',
      data: teacher
    }).then(function (response) {
      return response.data;
    });
  };
  this.behaveUpdate = function (behave) {
    return $http({
      method: 'PUT',
      url: baseUrl + 'api/behave',
      data: behave
    }).then(function (response) {
      // console.log(response);
      return response.data;
    });
  };
  this.updateObj = function (upObj, id) {
    console.log(upObj);
    return $http({
      method: 'PUT',
      url: baseUrl + 'api/lesson/' + id + '/objective',
      data: {
        objective: upObj
      }
    }).then(function (response) {
      return response.data;
    });
  };
  this.updateVer = function (upVer, id) {
    return $http({
      method: 'PUT',
      url: baseUrl + 'api/lesson/' + id + '/verification',
      data: {
        verification: upVer
      }
    }).then(function (response) {
      return response.data;
    });
  };
  this.updateInfo = function (upInfo, id) {
    return $http({
      method: 'PUT',
      url: baseUrl + 'api/lesson/' + id + '/information',
      data: {
        information: upInfo
      }
    }).then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };
  this.updateAct = function (upAct, id) {
    return $http({
      method: 'PUT',
      url: baseUrl + 'api/lesson/' + id + '/activity',
      data: {
        activity: upAct
      }
    }).then(function (response) {
      return response.data;
    });
  };
  this.updateMat = function (upMat, id) {
    return $http({
      method: 'PUT',
      url: baseUrl + 'api/lesson/' + id + '/materials',
      data: {
        materials: upMat
      }
    }).then(function (response) {
      return response.data;
    });
  };
  this.updateMisc = function (upMisc, id) {
    return $http({
      method: 'PUT',
      url: baseUrl + 'api/lesson/' + id + '/other',
      data: {
        other: upMisc
      }
    }).then(function (response) {
      return response.data;
    });
  };
  this.deleteAssignment = function (id) {
    return $http.delete(baseUrl + 'api/assignment/' + id).then(function (response) {
      return response.data;
    });
  };
  this.deleteLesson = function (id) {
    return $http.delete(baseUrl + 'api/lesson/' + id).then(function (response) {
      // console.log(response.data);
      return response.data;
    });
  };
  this.deleteStudent = function (id) {
    return $http.delete(baseUrl + 'api/student/' + id).then(function (response) {
      // console.log(response.data);
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

angular.module('classroomApp').controller('classroomCtrl', function ($scope, mainSvc) {
  $scope.test = "connected";
  $scope.out = [];
  $scope.grj = [];
  $scope.gdd = [];
  $scope.rtl = [];
  $scope.sat = [];
  $scope.tch = [];
  $scope.pct = [];
  $scope.moveUp = function (id, behaveid) {
    var behaveUp = {};
    behaveUp.id = id;
    behaveUp.behaveid = behaveid + 1;
    console.log(behaveUp);
    mainSvc.behaveUpdate(behaveUp).then(function (response) {
      $scope.getStuds().then(function (response) {
        $scope.sortStuds(response);
      });
    });
  };
  $scope.moveDown = function (id, behaveid) {
    var behaveUp = {};
    behaveUp.id = id;
    behaveUp.behaveid = behaveid - 1;
    console.log(behaveUp);
    mainSvc.behaveUpdate(behaveUp).then(function (response) {
      $scope.getStuds().then(function (response) {
        $scope.sortStuds(response);
      });
    });
  };
  $scope.sortStuds = function (arr) {
    $scope.out = [];
    $scope.grj = [];
    $scope.gdd = [];
    $scope.rtl = [];
    $scope.sat = [];
    $scope.tch = [];
    $scope.pct = [];
    for (var i = 0; i < arr.length; i++) {
      switch (arr[i].behaveid) {
        case 1:
          $scope.pct.push(arr[i]);
          break;
        case 2:
          $scope.tch.push(arr[i]);
          break;
        case 3:
          $scope.sat.push(arr[i]);
          break;
        case 4:
          $scope.rtl.push(arr[i]);
          break;
        case 5:
          $scope.gdd.push(arr[i]);
          break;
        case 6:
          $scope.grj.push(arr[i]);
          break;
        case 7:
          $scope.out.push(arr[i]);
          break;
        default:
          $scope.rtl.push(arr[i]);
      }
    }
  };
  $scope.getStuds = function () {
    mainSvc.getBehaviour().then(function (response) {
      console.log('controller', response);
      $scope.studArr = response;
      $scope.sortStuds($scope.studArr);
    });
  };
  $scope.getStuds();
});
'use strict';

angular.module('classroomApp').controller('dayViewCtrl', function ($scope, $stateParams, mainSvc, $state) {
  $scope.dayLessons = [];
  console.log($stateParams.day);
  $scope.getLessons = function () {
    mainSvc.getLesson().then(function (response) {
      for (var i = 0; i < response.length; i++) {
        switch (response[i].timeid) {
          case 1:
            response[i].startTime = '8:00';
            break;
          case 2:
            response[i].startTime = '9:00';
            break;
          case 3:
            response[i].startTime = '10:00';
            break;
          case 4:
            response[i].startTime = '11:00';
            break;
          case 5:
            response[i].startTime = '12:00';
            break;
          case 6:
            response[i].startTime = '1:00';
            break;
          case 7:
            response[i].startTime = '2:00';
            break;
          case 8:
            response[i].startTime = '3:00';
        }
        switch (response[i].timeendid) {
          case 1:
            response[i].endTime = '8:00';
            break;
          case 2:
            response[i].endTime = '9:00';
            break;
          case 3:
            response[i].endTime = '10:00';
            break;
          case 4:
            response[i].endTime = '11:00';
            break;
          case 5:
            response[i].endTime = '12:00';
            break;
          case 6:
            response[i].endTime = '1:00';
            break;
          case 7:
            response[i].endTime = '2:00';
            break;
          case 8:
            response[i].endTime = '3:00';
        }
      }
      for (var _i = 0; _i < response.length; _i++) {
        console.log($scope.lessons);
        if (response[_i].day === parseInt($stateParams.day)) {
          $scope.dayLessons.push(response[_i]);
        }
      }
    });
  };
  $scope.getLessons();
});
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

  $scope.mon = {
    lessons: []
  };
  $scope.tue = {
    lessons: []
  };
  $scope.wed = {
    lessons: []
  };
  $scope.thu = {
    lesson: []
  };
  $scope.fri = {
    lesson: []
  };
  // $scope.yesterDate = new Date(`${todayMonth}/${yesterDate}/${todayYear}`)
  // console.log(today.getDate());
  console.log($scope.yesterDate);

  $scope.getLesson = function () {
    mainSvc.getLesson().then(function (response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        response[i].date = new Date(response[i].date);
      }
      var today = new Date();
      var todayMonth = today.getMonth() + 1;
      var todayDate = today.getDate();
      var todayYear = today.getFullYear();
      // console.log($scope.wed);
      switch (today.getDay()) {
        case 1:
          {
            $scope.mon.date = today;
            $scope.tue.date = new date(todayMonth + '/' + (todayDate + 1) + '/' + todayYear);
            $scope.wed.date = new date(todayMonth + '/' + (todayDate + 2) + '/' + todayYear);
            $scope.thu.date = new date(todayMonth + '/' + (todayDate + 3) + '/' + todayYear);
            $scope.wed.date = new date(todayMonth + '/' + (todayDate + 4) + '/' + todayYear);
            // for (let i = 0; i < response.length; i++) {
            //   if (response[i].date === )
            // }
          }
          break;
        case 2:
          {
            $scope.mon.date = new Date(todayMonth + '/' + (todayDate - 1) + '/' + todayYear);
            $scope.tue.date = today;
            $scope.wed.date = new Date(todayMonth + '/' + (todayDate + 1) + '/' + todayYear);
            $scope.thu.date = new Date(todayMonth + '/' + (todayDate + 2) + '/' + todayYear);
            $scope.fri.date = new Date(todayMonth + '/' + (todayDate + 3) + '/' + todayYear);
          }
          break;
        case 3:
          {
            $scope.mon.date = new Date(todayMonth + '/' + (todayDate - 2) + '/' + todayYear);
            $scope.tue.date = new Date(todayMonth + '/' + (todayDate - 1) + '/' + todayYear);
            $scope.wed.date = today;
            $scope.thu.date = new Date(todayMonth + '/' + (todayDate + 1) + '/' + todayYear);
            $scope.fri.date = new Date(todayMonth + '/' + (todayDate + 2) + '/' + todayYear);
          }
          break;
        case 4:
          {
            $scope.mon.date = new Date(todayMonth + '/' + (todayDate - 3) + '/' + todayYear);
            $scope.tue.date = new Date(todayMonth + '/' + (todayDate - 2) + '/' + todayYear);
            $scope.wed.date = new Date(todayMonth + '/' + (todayDate - 1) + '/' + todayYear);
            $scope.thu.date = today;
            $scope.fri.date = new Date(todayMonth + '/' + (todayDate + 1) + '/' + todayYear);
            console.log(_typeof(response[0].date), $scope.mon.date.toString());
            for (var _i = 0; _i < response.length; _i++) {
              var monDate = $scope.mon.date.getDate() + '/' + ($scope.mon.date.getMonth() + 1);

              console.log(monDate);
              if (response[_i].date.getDate() + '/' + (response[_i].date.getMonth() + 1) == $scope.mon.date.getDate() + '/' + ($scope.mon.date.getMonth + 1)) {
                console.log('i fired');

                $scope.mon.lessons.push(response[_i]);
              }
              if (new Date(response[_i].date) === $scope.tue.date) {
                $scope.tue.lessons.push(response[_i]);
              }
              if (new Date(response[_i].date) === $scope.wed.date) {
                $scope.wed.lessons.push(response[_i]);
              }
              if (new Date(response[_i].date) === $scope.thu.date) {
                $scope.thu.lessons.push(response[_i]);
              }
              if (new Date(response[_i].date) === $scope.fri.date) {
                $scope.fri.lessons.push(response[_i]);
              }
            }
            console.log($scope.mon, $scope.tue, $scope.wed, $scope.thu, $scope.fri);
          }
          break;
        case 5:
          {
            $scope.mon.date = new Date(todayMonth + '/' + (todayDate - 4) + '/' + todayYear);
            $scope.tue.date = new Date(todayMonth + '/' + (todayDate - 3) + '/' + todayYear);
            $scope.wed.date = new Date(todayMonth + '/' + (todayDate - 2) + '/' + todayYear);
            $scope.thu.date = new Date(todayMonth + '/' + (todayDate - 1) + '/' + todayYear);
            $scope.fri.date = today;
          }
          break;
      }
      for (var i = 0; i < response.length; i++) {
        response[i].date = new Date(response[i].date);
        response[i].day = response[i].date.getDay();
        // console.log(response[i]);
      }
      for (var _i2 = 0; _i2 < response.length; _i2++) {
        switch (response[_i2].timeid) {
          case 1:
            response[_i2].startTime = '8:00';
            break;
          case 2:
            response[_i2].startTime = '9:00';
            break;
          case 3:
            response[_i2].startTime = '10:00';
            break;
          case 4:
            response[_i2].startTime = '11:00';
            break;
          case 5:
            response[_i2].startTime = '12:00';
            break;
          case 6:
            response[_i2].startTime = '1:00';
            break;
          case 7:
            response[_i2].startTime = '2:00';
            break;
          case 8:
            response[_i2].startTime = '3:00';
        }
        switch (response[_i2].timeendid) {
          case 1:
            response[_i2].endTime = '8:00';
            break;
          case 2:
            response[_i2].endTime = '9:00';
            break;
          case 3:
            response[_i2].endTime = '10:00';
            break;
          case 4:
            response[_i2].endTime = '11:00';
            break;
          case 5:
            response[_i2].endTime = '12:00';
            break;
          case 6:
            response[_i2].endTime = '1:00';
            break;
          case 7:
            response[_i2].endTime = '2:00';
            break;
          case 8:
            response[_i2].endTime = '3:00';
        }
      }
      for (var _i3 = 0; _i3 < response.length; _i3++) {
        console.log(response[_i3].day);
      }
    });
  };

  $scope.getLesson();
});
'use strict';

angular.module('classroomApp').controller('lessonCtrl', function ($scope, mainSvc, $stateParams) {

  $scope.getThisLesson = function () {
    var id = parseInt($stateParams.id);
    mainSvc.getLesson().then(function (response) {
      for (var i = 0; i < response.length; i++) {
        if (id === response[i].id) {
          $scope.lesson = response[i];
        }
      }
    });
  };
  $scope.getThisLesson();

  $scope.getAssignments = function () {
    mainSvc.getAssignments().then(function (response) {
      $scope.assignments = response;
    });
  };
  $scope.getAssignments();

  $scope.updateObj = function (editObj) {
    console.log(editObj);
    mainSvc.updateObj(editObj, $stateParams.id).then(function (response) {
      alert(response);
      $scope.getThisLesson();
    });
  };
  $scope.updateVer = function (editVer) {
    mainSvc.updateVer(editVer, $stateParams.id).then(function (response) {
      alert(response);
      $scope.getThisLesson();
    });
  };
  $scope.updateInfo = function (editInfo) {
    mainSvc.updateInfo(editInfo, $stateParams.id).then(function (response) {
      alert(response);
      $scope.getThisLesson();
    });
  };
  $scope.updateAct = function (editAct) {
    mainSvc.updateAct(editAct, $stateParams.id).then(function (response) {
      alert(response);
      $scope.getThisLesson();
    });
  };
  $scope.updateMat = function (mat) {
    var editMat = [];
    if (mat.paper) {
      editMat.push('Paper');
    }
    if (mat.pencil) {
      editMat.push('Pencil');
    }
    if (mat.book) {
      editMat.push('Book');
    }
    if (mat.scissors) {
      editMat.push('Scissors');
    }
    if (mat.glue) {
      editMat.push('Glue');
    }
    if (mat.crayons) {
      editMat.push('Crayons');
    }
    mainSvc.updateMat(editMat, $stateParams.id).then(function (response) {
      alert(response);
      $scope.getThisLesson();
    });
  };
  $scope.updateMisc = function (editMisc) {
    mainSvc.updateMisc(editMisc.split(','), $stateParams.id).then(function (response) {
      alert(response);
      $scope.getThisLesson();
    });
  };
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
  $scope.addTeacher = function (teacher) {
    mainSvc.addTeacher(teacher).then(function (response) {
      alert(response);
    });
  };
});
'use strict';

angular.module('classroomApp').controller('plannerCtrl', function ($scope, mainSvc) {

  $scope.getAssignments = function () {
    mainSvc.getAssignments().then(function (response) {
      $scope.assignments = response;
    });
  };
  $scope.getAssignments();
  $scope.addAssignment = function (assignment) {
    mainSvc.addAssignment(assignment).then(function (response) {
      alert(response);
      $scope.getAssignments();
    });
  };
  $scope.getLessons = function () {
    mainSvc.getLesson().then(function (response) {
      $scope.lessons = response;
      // console.log($scope.lessons);
    });
  };
  $scope.addLesson = function (newLesson) {
    var addMats = [];
    var addedLesson = {};
    if (newLesson.reqMatsPen) {
      addMats.push('Pencil');
    }
    if (newLesson.reqMatsPap) {
      addMats.push('Paper');
    }
    if (newLesson.reqMatsBook) {
      addMats.push('Book');
    }
    if (newLesson.reqMatsSci) {
      addMats.push('Scissors');
    }
    if (newLesson.reqMatsGlue) {
      addMats.push('Glue');
    }
    if (newLesson.reqMatsCray) {
      addMats.push('Crayons');
    }
    if (newLesson.misc !== []) {
      newLesson.misc = newLesson.misc.split(',');
    }

    console.log(addedLesson);
    mainSvc.addLesson(newLesson).then(function (response) {
      alert(response);
      $scope.getLessons();
    });
  };
  $scope.getLessons();
  $scope.getStudents = function () {
    mainSvc.getStudents().then(function (response) {
      $scope.students = response;
    });
  };
  $scope.getStudents();
  $scope.removeAssignment = function (id) {
    mainSvc.deleteAssignment(id).then(function (response) {
      alert(response);
      $scope.getAssignments();
    });
  };
  $scope.addStudent = function (stud) {
    mainSvc.addStudent(stud).then(function (response) {
      alert(response);
      $scope.getStudents();
    });
  };
  $scope.removeLesson = function (id) {
    mainSvc.deleteLesson(id).then(function (response) {
      alert(response);
      $scope.getLessons();
    });
  };
  $scope.removeStudent = function (id) {
    mainSvc.deleteStudent(id).then(function (response) {
      alert(response);
      $scope.getStudents();
    });
  };
  function AppCtrl($scope) {
    $scope.currentNavItem = 'page1';
  }
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
          mthChart.setAxisNameX('Assignment');
          mthChart.setAxisNameY('');
          mthChart.draw();
        }
        if (literacyScore.length > 0) {
          var litChart = new JSChart('literacyChart', 'bar');
          litChart.setDataArray(literacyScore);
          litChart.setTitle('Literacy');
          litChart.setAxisNameX('Assignment');
          litChart.setAxisNameY('');
          litChart.draw();
        }
        if (writingScore.length > 0) {
          var writChart = new JSChart('writingChart', 'bar');
          writChart.setDataArray(writingScore);
          writChart.setTitle('Writing');
          writChart.setAxisNameX('Assignment');
          writChart.setAxisNameY('');
          writChart.draw();
        }
        if (readingScore.length > 0) {
          var readChart = new JSChart('readingChart', 'bar');
          readChart.setDataArray(readingScore);
          readChart.setTitle('Reading');
          readChart.setAxisNameX('Assignment');
          readChart.setAxisNameY('');
          readChart.draw();
        }
        if (scienceScore.length > 0) {
          var sciChart = new JSChart('scienceChart', 'bar');
          sciChart.setDataArray(scienceScore);
          sciChart.setTitle('Science');
          sciChart.setAxisNameX('Assignment');
          sciChart.setAxisNameY('');
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
      gradesChart.setAxisNameX('');
      gradesChart.setAxisNameY('');
      gradesChart.draw();

      console.log(grades);
    });
  };
  $scope.getGrades();
});
//# sourceMappingURL=bundle.js.map
