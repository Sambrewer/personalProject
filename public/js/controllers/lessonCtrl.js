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
  $scope.getAssignments = () => {
    mainSvc.getAssignments().then((response) => {
      $scope.assignments = response;
    })
  }
  $scope.getAssignments();

  $scope.updateLesson = (upLess, id) => {
    // console.log(id);
    let addMats = [];
    let addedLesson = {};
    if (upLess.reqMatsPen) {
      addMats.push('Pencil')
    }
    if (upLess.reqMatsPap) {
      addMats.push('Paper')
    }
    if (upLess.reqMatsBook) {
      addMats.push('Book')
    }
    if (upLess.reqMatsSci) {
      addMats.push('Scissors')
    }
    if (upLess.reqMatsGlue) {
      addMats.push('Glue')
    }
    if (upLess.reqMatsCray) {
      addMats.push('Crayons')
    }
    upLess.misc = upLess.misc.split(',')
    upLess.date = upLess.date.getDate();
    upLess.requiredMats = addMats;
    mainSvc.updateLesson(upLess, id).then((response) => {
      alert(response)
      $scope.getThisLesson();
    })
  }
})
