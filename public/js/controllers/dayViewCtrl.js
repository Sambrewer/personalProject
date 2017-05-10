angular.module('classroomApp').controller('dayViewCtrl', ($scope, $stateParams, mainSvc, $state) => {
  $scope.dayLessons = [];
  console.log($stateParams.day);
  $scope.getLessons = () => {
    mainSvc.getLesson().then((response) => {
      for (let i = 0; i < response.length; i++) {
        console.log($scope.lessons);
        if (response[i].day === parseInt($stateParams.day)) {
          $scope.dayLessons.push(response[i]);

        }
      }
    })
  }
  $scope.getLessons();
})
