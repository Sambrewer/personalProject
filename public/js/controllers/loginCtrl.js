angular.module('classroomApp').controller('loginCtrl', function($scope, mainSvc, $location) {
  $scope.login = function(user) {
    mainSvc.login(user).then(function(response) {
      if (response.data) {
        $location.path('/home');
        $scope.currentUser = response.data[0]
      } else {
        alert('Incorrect Username/Password')
      }
    })
  }
  $scope.addTeacher = (teacher) => {
    mainSvc.addTeacher(teacher).then((response) => {
      alert(response)
    })
  }
})
