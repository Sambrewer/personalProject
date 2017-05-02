angular.module('classroomApp').controller('classCtrl', ($scope, mainSvc) => {
  $scope.getStudents = () => {
    mainSvc.getStudents().then((response) => {
      $scope.class = response;
      // console.log(response, 'students');
    })
  }
  $scope.getStudents()
  $scope.getAssignments = () => {
    mainSvc.getAssignments().then((response) => {
      $scope.assignments = response;
      // console.log(response, 'assignments');
    })
  }
  $scope.getAssignments()
  $scope.submitScore = (student, assignmentid, score, subj) => {
    let scoreObj = {};
    scoreObj.studentid = student;
    scoreObj.assignmentid = assignmentid;
    scoreObj.score = score;
    scoreObj.subj = subj;
    // console.log(scoreObj, student);
    mainSvc.addScore(scoreObj).then((response) => {
      alert(response)
    })
  }
})
