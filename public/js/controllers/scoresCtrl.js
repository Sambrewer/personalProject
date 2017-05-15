angular.module('classroomApp').controller('scoresCtrl', ($scope, $stateParams, mainSvc, $location) => {
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
     let id = parseInt($stateParams.id)
     mainSvc.getScore(id).then((response) => {
      //  console.log(response);
       $scope.scores = response
      if (response.length < 1) {
        $mdToast.show(
          $mdToast.simple()
          .textContent('No scores for this student')
          .hideDelay(3000)
        )
        $location.path('/home/class')
      } else {
        let rawData = response;
        let literacyScore = []
          , mathScore = []
          , writingScore = []
          , readingScore = []
          , scienceScore = []
        for (let i = 0; i < rawData.length; i++) {
          if (rawData[i].subject === "Math") {
            mathScore.push([rawData[i].name, rawData[i].score])
          }
          if (rawData[i].subject === "Literacy") {
            literacyScore.push([rawData[i].name, rawData[i].score])
          }
          if (rawData[i].subject === "Writing") {
            writingScore.push([rawData[i].name, rawData[i].score])
          }
          if (rawData[i].subject === "Reading") {
            readingScore.push([rawData[i].name, rawData[i].score])
          }
          if (rawData[i].subject === "Science") {
            scienceScore.push([rawData[i].name, rawData[i].score])
          }
        }
          if (mathScore.length > 0) {
            console.log(mathScore);
            var mthChart = new JSChart('mathChart', 'bar');
            mthChart.setDataArray(mathScore);
            mthChart.setTitle('Math')
            mthChart.setAxisNameX('Assignment');
            mthChart.setAxisNameY('')
            mthChart.draw()
          }
          if (literacyScore.length > 0) {
            var litChart = new JSChart('literacyChart', 'bar');
            litChart.setDataArray(literacyScore);
            litChart.setTitle('Literacy')
            litChart.setAxisNameX('Assignment');
            litChart.setAxisNameY('')
            litChart.draw()
          }
          if (writingScore.length > 0) {
            var writChart = new JSChart('writingChart', 'bar');
            writChart.setDataArray(writingScore);
            writChart.setTitle('Writing')
            writChart.setAxisNameX('Assignment');
            writChart.setAxisNameY('')
            writChart.draw()
          }
          if (readingScore.length > 0) {
            var readChart = new JSChart('readingChart', 'bar');
            readChart.setDataArray(readingScore);
            readChart.setTitle('Reading')
            readChart.setAxisNameX('Assignment');
            readChart.setAxisNameY('')
            readChart.draw()
          }
          if (scienceScore.length > 0) {
            var sciChart = new JSChart('scienceChart', 'bar');
            sciChart.setDataArray(scienceScore);
            sciChart.setTitle('Science')
            sciChart.setAxisNameX('Assignment');
            sciChart.setAxisNameY('')
            sciChart.draw()
          }
        }
     })
   }
   $scope.getScores()

   $scope.getGrades = () => {
     let id = parseInt($stateParams.id)
    //  console.log('getting grades', $stateParams.id);
     mainSvc.getGrades(id).then((response) => {
       let grades = [];
      //  console.log(response);
       for (let i = 0; i < response.length; i++) {
          grades.push([response[i].subject, parseInt(response[i].score)])
       }
       let gradesChart = new JSChart('gradeChart', 'bar');
       gradesChart.setDataArray(grades)
       gradesChart.setTitle('Grades')
       gradesChart.setAxisNameX('');
       gradesChart.setAxisNameY('')
       gradesChart.draw()

       console.log(grades);
     })
   }
   $scope.getGrades();
})
