angular.module('classroomApp').controller('homeCtrl', ($scope, $window) => {
  let screenWidth = $window.innerWidth;
  if (screenWidth <= 600) {
    $scope.show = false;
  } else {
    $scope.show = true;
  }
})
