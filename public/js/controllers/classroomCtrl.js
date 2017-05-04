angular.module('classroomApp').controller('classroomCtrl', ($scope, mainSvc) => {
  $scope.test = "connected"
  $scope.out = []
  $scope.grj = []
  $scope.gdd = []
  $scope.rtl = []
  $scope.sat = []
  $scope.tch = []
  $scope.pct = [];
  $scope.moveUp = (id, behaveid) => {
    let behaveUp = {}
    behaveUp.id = id
    behaveUp.behaveid = behaveid + 1
    console.log(behaveUp);
    mainSvc.behaveUpdate(behaveUp).then((response) => {
      $scope.getStuds().then((response) => {
        $scope.sortStuds(response)
      })
    })
  }
  $scope.moveDown = (id, behaveid) => {
    let behaveUp = {}
    behaveUp.id = id
    behaveUp.behaveid = behaveid - 1
    console.log(behaveUp);
    mainSvc.behaveUpdate(behaveUp).then((response) => {
      $scope.getStuds().then((response) => {
        $scope.sortStuds(response)
      })
    })
  }
  $scope.sortStuds = (arr) => {
    $scope.out = []
    $scope.grj = []
    $scope.gdd = []
    $scope.rtl = []
    $scope.sat = []
    $scope.tch = []
    $scope.pct = [];
    for (var i = 0; i < arr.length; i++) {
      switch(arr[i].behaveid) {
        case 1:
          $scope.pct.push(arr[i])
          break;
        case 2:
          $scope.tch.push(arr[i])
          break;
        case 3:
          $scope.sat.push(arr[i])
          break;
        case 4:
          $scope.rtl.push(arr[i])
          break;
        case 5:
          $scope.gdd.push(arr[i])
          break;
        case 6:
          $scope.grj.push(arr[i])
          break;
        case 7:
          $scope.out.push(arr[i])
          break;
        default:
          $scope.rtl.push(arr[i])
      }
    }
  }
  $scope.getStuds = () => {
    mainSvc.getBehaviour().then((response) => {
      console.log('controller', response);
      $scope.studArr = response
      $scope.sortStuds($scope.studArr)
    })
  }
  $scope.getStuds()

})
