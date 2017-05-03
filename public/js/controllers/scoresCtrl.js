angular.module('classroomApp').controller('scoresCtrl', ($scope, $stateParams, mainSvc) => {
   $scope.getStudent = () => {
     mainSvc.getStudents().then((response) => {
       let students = response;
       let student = {};
       for (let i = 0; i < students.length; i++) {
         if (students[i].id === parseInt($stateParams.id)) {
           student = students[i];
         }
       }
       $scope.student = student
      //  console.log($scope.student);
     })
   }
   $scope.getStudent();
   $scope.getScores = () => {
     let scores = [];
    //  console.log('I fired');
     mainSvc.getScore().then((response) => {
      //  console.log(response);
       $scope.scores = response
      //  console.log($scope.scoresArray);
      //  console.log(scores);
     })
   }
   $scope.getScores()

   $scope.graphScoreTotals = () => {
     mainSvc.getScoreTotals().then((response) => {
       $scope.scoreTotals = response;
     })
   }
   $scope.graphScoreTotals();
})
