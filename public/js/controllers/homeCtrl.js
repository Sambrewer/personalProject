angular.module('classroomApp').controller('homeCtrl', ($scope, $window, mainSvc, $location) => {
  let screenWidth = $window.innerWidth;
  if (screenWidth <= 600) {
    $scope.show = false;
  } else {
    $scope.show = true;
  }
  $scope.getUser = function() {
    mainSvc.getUser().then(function(response) {
      $scope.currentUser = response;
      if ($scope.currentUser === undefined) {
        $location.path('/')
      }
      // console.log(response);
    })
    // console.log($scope.currentUser);
  }
  $scope.getUser()
  let today = new Date();
  let todayMonth = today.getMonth() + 1;
  let todayDate = today.getDate()
  let todayYear = today.getFullYear()
  $scope.mon = [];
  $scope.tue = [];
  $scope.wed = [];
  $scope.thu = [];
  $scope.fri = [];
  $scope.date = `${todayMonth}/${todayDate}/${todayYear}`
  // console.log(today.getDate());
  $scope.getLesson = () => {
    mainSvc.getLesson().then((response) => {
      console.log(response);
      // console.log($scope.wed);
      for (var i = 0; i < response.length; i++) {
        response[i].date = new Date(response[i].date);
        response[i].day = response[i].date.getDay()
        // console.log(response[i]);
      }
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
        console.log(response[i].day);
        switch (response[i].day) {
          case 1:
            $scope.mon.push(response[i])
            break;
          case 2:
            $scope.tue.push(response[i])
            break;
          case 3:
            $scope.wed.push(response[i])
            break;
          case 4:
            $scope.thu.push(response[i])
            break;
          case 5:
            $scope.fri.push(response[i])
            break;
        }
      }
    })
  }

  $scope.getLesson();
})
