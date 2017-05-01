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
    });
  };
  $scope.getStudents();
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
//# sourceMappingURL=bundle.js.map
