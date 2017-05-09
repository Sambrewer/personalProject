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
  $scope.date = `${todayMonth}/${todayDate}/${todayYear}`  
  console.log(today.getDate());
  $scope.getLesson = () => {
    mainSvc.getLesson().then((response) => {
      $scope.lessons = [];
      for (let i = 0; i < response.length; i++) {
        if (response[i].date === today.getDate()) {
          $scope.lessons.push(response[i])
          console.log(response[i]);
        }
      }
      for (let i = 0; i < $scope.lessons.length; i++) {
        switch ($scope.lessons[i].timeid) {
          case 1:
            $scope.lessons[i].startTime = '8:00'
            break;
          case 2:
            $scope.lessons[i].startTime = '9:00'
            break;
          case 3:
            $scope.lessons[i].startTime = '10:00'
            break;
          case 4:
            $scope.lessons[i].startTime = '11:00'
            break;
          case 5:
            $scope.lessons[i].startTime = '12:00'
            break;
          case 6:
            $scope.lessons[i].startTime = '1:00'
            break;
          case 7:
            $scope.lessons[i].startTime = '2:00'
            break;
          case 8:
            $scope.lessons[i].startTime = '3:00'
        }
        switch ($scope.lessons[i].timeendid) {
          case 1:
            $scope.lessons[i].endTime = '8:00'
            break;
          case 2:
            $scope.lessons[i].endTime = '9:00'
            break;
          case 3:
            $scope.lessons[i].endTime = '10:00'
            break;
          case 4:
            $scope.lessons[i].endTime = '11:00'
            break;
          case 5:
            $scope.lessons[i].endTime = '12:00'
            break;
          case 6:
            $scope.lessons[i].endTime = '1:00'
            break;
          case 7:
            $scope.lessons[i].endTime = '2:00'
            break;
          case 8:
            $scope.lessons[i].endTime = '3:00'
        }
      }
    })
  }

  $scope.getLesson();
})
