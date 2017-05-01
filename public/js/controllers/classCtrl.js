angular.module('classroomApp').controller('classCtrl', ($scope, mainSvc) => {
  $scope.getStudents = () => {
    mainSvc.getStudents().then((response) => {
      $scope.class = response;
    })
  }
  $scope.getStudents()

})
