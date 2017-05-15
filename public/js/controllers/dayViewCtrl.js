angular.module('classroomApp').controller('dayViewCtrl', ($scope, $stateParams, mainSvc, $state) => {
  $scope.dayLessons = [];
  console.log($stateParams.date);
  $scope.date = new Date($stateParams.date)
  $scope.getLessons = () => {
    mainSvc.getLesson().then((response) => {
      for (let i = 0; i < response.length; i++) {
        switch (response[i].timeid) {
          case 1:
            response[i].startTime = '8:00'
            break;
          case 2:
            response[i].startTime = '9:00'
            break;
          case 3:
            response[i].startTime = '10:00'
            break;
          case 4:
            response[i].startTime = '11:00'
            break;
          case 5:
            response[i].startTime = '12:00'
            break;
          case 6:
            response[i].startTime = '1:00'
            break;
          case 7:
            response[i].startTime = '2:00'
            break;
          case 8:
            response[i].startTime = '3:00'
        }
        switch (response[i].timeendid) {
          case 1:
            response[i].endTime = '8:00'
            break;
          case 2:
            response[i].endTime = '9:00'
            break;
          case 3:
            response[i].endTime = '10:00'
            break;
          case 4:
            response[i].endTime = '11:00'
            break;
          case 5:
            response[i].endTime = '12:00'
            break;
          case 6:
            response[i].endTime = '1:00'
            break;
          case 7:
            response[i].endTime = '2:00'
            break;
          case 8:
            response[i].endTime = '3:00'
        }
      }
      for (let i = 0; i < response.length; i++) {
        response[i].date = new Date(response[i].date)
        response[i].date.setHours(0)
        if (response[i].date.getTime() === $scope.date.getTime) {
          $scope.dayLessons.push(response[i]);

        }
      }
    })
  }

  $scope.getLessons();
})
