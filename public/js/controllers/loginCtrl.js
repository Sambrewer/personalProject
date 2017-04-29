angular.module('classroomApp').controller('loginCtrl', function($scope, mainSvc, $location) {
  $scope.login = function(user) {
    console.log(user);
    mainSvc.login(user).then(function(response) {
      if (response.data) {
        $location.path('/home');
        $scope.currentUser = response.data[0]
      } else {
        alert('Incorrect Username/Password')
      }
    })
  }
  console.log($scope.currentUser.name);
  $scope.test = 'working'
})
