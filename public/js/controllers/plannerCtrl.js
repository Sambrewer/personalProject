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
  $scope.addLesson = (newLesson) => {
    let addMats = [];
    let addedLesson = {};
    if (newLesson.reqMatsPen) {
      addMats.push('Pencil')
    }
    if (newLesson.reqMatsPap) {
      addMats.push('Paper')
    }
    if (newLesson.reqMatsBook) {
      addMats.push('Book')
    }
    if (newLesson.reqMatsSci) {
      addMats.push('Scissors')
    }
    if (newLesson.reqMatsGlue) {
      addMats.push('Glue')
    }
    if (newLesson.reqMatsCray) {
      addMats.push('Crayons')
    }
    addedLesson.name = newLesson.name
    addedLesson.activity = newLesson.activity
    addedLesson.info = newLesson.info
    addedLesson.objective = newLesson.objective
    addedLesson.requiredMats = addMats;
    addedLesson.verification = newLesson.verification;
    addedLesson.misc = newLesson.misc.split(',')
    mainSvc.addLesson(addedLesson).then((response) => {
      alert(response);
    })
  }
})
