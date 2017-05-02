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
     mainSvc.getScore().then((response) => {
      //  console.log($scope.student, response);
       for (var i = 0; i < response.length; i++) {
         if (response[i].studentid === parseInt($scope.student.id)) {
           scores.push(response[i]);
         }
       }
       console.log(scores);
       $scope.scores = scores
     })
   }
   $scope.getScores()

   let svg = d3.select("svg")
      , margin = {top: 20, right: 20, bottom: 30, left: 40}
      , width = +svg.attr("width") - margin.left - margin.right
      , height = +svg.attr("height") - margin.top - margin.bottom;

   let x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
     , y = d3.scaleLinear().rangeRound([height, 0]);
   let g= svg.append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
})
