angular.module('classroomApp').controller('lessonCtrl', ($scope, mainSvc, $stateParams) => {
  $scope.getThisLesson = () => {
    let id = parseInt($stateParams.id)
    mainSvc.getLesson().then((response) => {
      console.log($stateParams.id);
      console.log(id);
      for (let i = 0; i < response.length; i++) {
        if (id = response[i].id) {
          return $scope.lesson = response[i];
          console.log($scope.lesson.id);
        }
      }
    })
  }
  $scope.getThisLesson();

})
