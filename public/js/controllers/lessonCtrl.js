angular.module('classroomApp').controller('lessonCtrl', ($scope, mainSvc, $stateParams, $location, $mdToast) => {

  let last = {
    bottom: false,
    top: true,
    left: false,
    right: false
  }
  $scope.toastPosition = angular.extend({},last);
  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  function sanitizePosition() {
  var current = $scope.toastPosition;

  if ( current.bottom && last.top ) current.top = false;
  if ( current.top && last.bottom ) current.bottom = false;
  if ( current.right && last.left ) current.left = false;
  if ( current.left && last.right ) current.right = false;

  last = angular.extend({},current);
}

  $scope.test = false
  $scope.toastPosition = angular.extend({},last)
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

  $scope.getDef = (word) => {
    mainSvc.getDef(word).then((response) => {
      if (!response.def) {
        $mdToast.show(
          $mdToast.simple()
          .textContent('No definition')
          .hideDelay(3000)
        )
      } else {
        $scope.word = word
        if (response.def[0].dt[0]._) {
          $scope.defintion = response.def[0].dt[0]._
        } else {
          $scope.definition = response.def[0].dt[0]
        }
        $scope.type = response.fl[0]
        $scope.test = true
      }
    })
  }
  $scope.hide = () => {
    $scope.test = false;
  }
  $scope.getAssignments = () => {
    mainSvc.getAssignments().then((response) => {
      $scope.assignments = response;
    })
  }
  $scope.getAssignments();


  $scope.updateObj = (editObj) => {
    // console.log(editObj);
    mainSvc.updateObj(editObj, $stateParams.id).then((response) => {
      $mdToast.show(
        $mdToast.simple()
        .textContent(response)
        .hideDelay(3000)
      )
      $scope.getThisLesson()
    })
  }
  $scope.updateVer = (editVer) => {
    mainSvc.updateVer(editVer, $stateParams.id).then((response) => {
      $mdToast.show(
        $mdToast.simple()
        .textContent(response)
        .hideDelay(3000)
      )
      $scope.getThisLesson()
    })
  }
  $scope.updateInfo = (editInfo) => {
    mainSvc.updateInfo(editInfo, $stateParams.id).then((response) => {
      $mdToast.show(
        $mdToast.simple()
        .textContent(response)
        .hideDelay(3000)
      )
      $scope.getThisLesson()
    })
  }
  $scope.updateAct = (editAct) => {
    mainSvc.updateAct(editAct, $stateParams.id).then((response) => {
      $mdToast.show(
        $mdToast.simple()
        .textContent(response)
        .hideDelay(3000)
      )
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
      $mdToast.show(
        $mdToast.simple()
        .textContent(response)
        .hideDelay(3000)
      )
      $scope.getThisLesson();
    })
  }
  $scope.updateMisc = (editMisc) => {
    mainSvc.updateMisc(editMisc.split(','), $stateParams.id).then((response) => {
      $mdToast.show(
        $mdToast.simple()
        .textContent(response)
        .hideDelay(3000)
      )
      $scope.getThisLesson();
    })
  }
  $scope.removeLesson = (id) => {
    mainSvc.deleteLesson(id).then((response) => {
      $mdToast.show(
        $mdToast.simple()
        .textContent(response)
        .hideDelay(3000)
      )
      $location.path('/home')
      $scope.getLessons()
    })
  }
})
