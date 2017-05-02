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
     })
   }
})
