angular.module('classroomApp').controller('homeCtrl', ($scope, $window, mainSvc, $location) => {
  let screenWidth = $window.innerWidth;
  if (screenWidth <= 600) {
    $scope.show = false;
  } else {
    $scope.show = true;
  }
  $scope.getUser = function() {
    mainSvc.getUser().then(function(response) {
      $scope.currentUser = response;
      if ($scope.currentUser = undefined) {
        $location.path('/')
        alert('You have been logged out')
      }
      console.log($scope.currentUser);
    })
    // console.log($scope.currentUser);
  }
  $scope.getUser()
})
