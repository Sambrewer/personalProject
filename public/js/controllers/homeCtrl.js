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


  $scope.mon = {
    lessons: []
  };
  $scope.tue = {
    lessons: []
  };
  $scope.wed = {
    lessons: []
  };
  $scope.thu = {
    lessons: []
  };
  $scope.fri = {
    lessons: []
  };
  // $scope.yesterDate = new Date(`${todayMonth}/${yesterDate}/${todayYear}`)
  // console.log(today.getDate());
  // console.log($scope.yesterDate);

  $scope.getLesson = () => {
    mainSvc.getLesson().then((response) => {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        response[i].date = new Date(response[i].date)
      }
      let today = new Date();
      let todayMonth = today.getMonth() + 1;
      let todayDate = today.getDate()
      let todayYear = today.getFullYear()
      // console.log($scope.wed);
      switch (today.getDay()) {
        case 1: {
          $scope.mon.date = today;
          $scope.tue.date = new Date(`${todayMonth}/${todayDate + 1}/${todayYear}`)
          $scope.wed.date = new Date(`${todayMonth}/${todayDate + 2}/${todayYear}`)
          $scope.thu.date = new Date(`${todayMonth}/${todayDate + 3}/${todayYear}`)
          $scope.wed.date = new Date(`${todayMonth}/${todayDate + 4}/${todayYear}`)

          for (let i = 0; i < response.length; i++) {
            if (response[i].date.getTime() == $scope.mon.date.getTime()) {
              $scope.mon.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.tue.date.getTime()) {
              $scope.tue.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.wed.date.getTime()) {
              $scope.wed.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.thu.date.getTime()) {
              $scope.thu.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.fri.date.getTime()) {
              $scope.fri.lessons.push(response[i])
            }
          }
        }
          break;
        case 2:{
          $scope.mon.date = new Date(`${todayMonth}/${todayDate - 1}/${todayYear}`)
          $scope.tue.date = today
          $scope.wed.date = new Date(`${todayMonth}/${todayDate + 1}/${todayYear}`);
          $scope.thu.date = new Date(`${todayMonth}/${todayDate + 2}/${todayYear}`)
          $scope.fri.date = new Date(`${todayMonth}/${todayDate + 3}/${todayYear}`)

          for (let i = 0; i < response.length; i++) {
            if (response[i].date.getTime() == $scope.mon.date.getTime()) {
              $scope.mon.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.tue.date.getTime()) {
              $scope.tue.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.wed.date.getTime()) {
              $scope.wed.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.thu.date.getTime()) {
              $scope.thu.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.fri.date.getTime()) {
              $scope.fri.lessons.push(response[i])
            }
          }
        }
          break;
        case 3: {
          $scope.mon.date = new Date(`${todayMonth}/${todayDate - 2}/${todayYear}`)
          $scope.tue.date = new Date(`${todayMonth}/${todayDate - 1}/${todayYear}`)
          $scope.wed.date = today;
          $scope.thu.date = new Date(`${todayMonth}/${todayDate + 1}/${todayYear}`)
          $scope.fri.date = new Date(`${todayMonth}/${todayDate + 2}/${todayYear}`)

          for (let i = 0; i < response.length; i++) {
            if (response[i].date.getTime() == $scope.mon.date.getTime()) {
              $scope.mon.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.tue.date.getTime()) {
              $scope.tue.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.wed.date.getTime()) {
              $scope.wed.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.thu.date.getTime()) {
              $scope.thu.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.fri.date.getTime()) {
              $scope.fri.lessons.push(response[i])
            }
          }
        }
          break;
        case 4: {
          $scope.mon.date = new Date(`${todayMonth}/${todayDate - 3}/${todayYear}`)
          $scope.tue.date = new Date(`${todayMonth}/${todayDate - 2}/${todayYear}`)
          $scope.wed.date = new Date(`${todayMonth}/${todayDate - 1}/${todayYear}`)
          $scope.thu.date = today
          $scope.fri.date = new Date(`${todayMonth}/${todayDate +  1}/${todayYear}`)

          for (let i = 0; i < response.length; i++) {
            if (response[i].date.getTime() == $scope.mon.date.getTime()) {
              $scope.mon.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.tue.date.getTime()) {
              $scope.tue.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.wed.date.getTime()) {
              $scope.wed.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.thu.date.getTime()) {
              $scope.thu.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.fri.date.getTime()) {
              $scope.fri.lessons.push(response[i])
            }
          }
        }
          break;
        case 5: {
          $scope.mon.date = new Date(`${todayMonth}/${todayDate - 4}/${todayYear}`)
          $scope.tue.date = new Date(`${todayMonth}/${todayDate - 3}/${todayYear}`)
          $scope.wed.date = new Date(`${todayMonth}/${todayDate - 2}/${todayYear}`)
          $scope.thu.date = new Date(`${todayMonth}/${todayDate - 1}/${todayYear}`)
          $scope.fri.date = today;
          for (let i = 0; i < response.length; i++) {
            if (response[i].date.getTime() == $scope.mon.date.getTime()) {
              $scope.mon.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.tue.date.getTime()) {
              $scope.tue.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.wed.date.getTime()) {
              $scope.wed.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.thu.date.getTime()) {
              $scope.thu.lessons.push(response[i])
            }
            if (response[i].date.getTime() === $scope.fri.date.getTime()) {
              $scope.fri.lessons.push(response[i])
            }
          }
        }
          break;
      }
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
    })
  }

  $scope.getLesson();
})
