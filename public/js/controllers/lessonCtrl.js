angular.module('classroomApp').controller('lessonCtrl', ($scope, mainSvc, $stateParams, $location) => {


  $scope.getThisLesson = () => {
    let id = parseInt($stateParams.id)
    mainSvc.getLesson().then((response) => {
      for (let i = 0; i < response.length; i++) {
        if (id === response[i].id) {
          $scope.lesson = response[i];
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


  $scope.updateObj = (editObj) => {
    // console.log(editObj);
    mainSvc.updateObj(editObj, $stateParams.id).then((response) => {
      alert(response)
      $scope.getThisLesson()
    })
  }
  $scope.updateVer = (editVer) => {
    mainSvc.updateVer(editVer, $stateParams.id).then((response) => {
      alert(response)
      $scope.getThisLesson()
    })
  }
  $scope.updateInfo = (editInfo) => {
    mainSvc.updateInfo(editInfo, $stateParams.id).then((response) => {
      alert(response)
      $scope.getThisLesson()
    })
  }
  $scope.updateAct = (editAct) => {
    mainSvc.updateAct(editAct, $stateParams.id).then((response) => {
      alert(response)
      $scope.getThisLesson()
    })
  }
  $scope.updateMat = (mat) => {
    let editMat = []
    if (mat.paper) {
      editMat.push('Paper')
    }
    if (mat.pencil) {
      editMat.push('Pencil')
    }
    if (mat.book) {
      editMat.push('Book')
    }
    if (mat.scissors) {
      editMat.push('Scissors')
    }
    if (mat.glue) {
      editMat.push('Glue')
    }
    if (mat.crayons) {
      editMat.push('Crayons')
    }
    mainSvc.updateMat(editMat, $stateParams.id).then((response) => {
      alert(response)
      $scope.getThisLesson();
    })
  }
  $scope.updateMisc = (editMisc) => {
    mainSvc.updateMisc(editMisc.split(','), $stateParams.id).then((response) => {
      alert(response)
      $scope.getThisLesson();
    })
  }
  $scope.removeLesson = (id) => {
    mainSvc.deleteLesson(id).then((response) => {
      alert(response)
      $location.path('/home')
      $scope.getLessons()
    })
  }
})
