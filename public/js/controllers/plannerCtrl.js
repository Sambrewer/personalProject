angular.module('classroomApp').controller('plannerCtrl', function($scope, mainSvc) {
  $scope.addAssignment = (assignment) => {
    mainSvc.addAssignment(assignment).then(function(response) {
      alert(response)
    })
  }
  $scope.getAssignments = () => {
    mainSvc.getAssignments().then((response) => {
      $scope.assignments = response;
    })
  }
  $scope.getAssignments()
})
