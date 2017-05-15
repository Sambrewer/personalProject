angular.module('classroomApp').controller('loginCtrl', function($scope, mainSvc, $location) {
  $scope.login = function(user) {
    mainSvc.login(user).then(function(response) {
      if (response.data) {
        $location.path('/home');
        $scope.currentUser = response.data[0]
      } else {
        $mdToast.show(
          $mdToast.simple()
          .textContent('Incorrect Username/Password')
          .hideDelay(3000)
        )
      }
    })
  }
  $scope.addTeacher = (teacher) => {
    mainSvc.addTeacher(teacher).then((response) => {
      $mdToast.show(
        $mdToast.simple()
        .textContent(response)
        .hideDelay(3000)
      )
    })
  }
})
