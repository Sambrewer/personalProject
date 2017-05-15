angular.module('classroomApp').controller('plannerCtrl', function($scope, mainSvc, $mdToast) {

  $scope.getAssignments = () => {
    mainSvc.getAssignments().then((response) => {
      $scope.assignments = response;
    })
  }
  $scope.getAssignments()
  $scope.addAssignment = (assignment) => {
    mainSvc.addAssignment(assignment).then(function(response) {
      $mdToast.show(
        $mdToast.simple()
        .textContent('Incorrect Username/Password')
        .hideDelay(3000)
      )
      $scope.getAssignments();
    })
  }
  $scope.getLessons = () => {
    mainSvc.getLesson().then((response) => {
      $scope.lessons = response
      // console.log($scope.lessons);
    })
  }
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
    if (newLesson.misc !== []) {
      newLesson.misc = newLesson.misc.split(',')
    }
    let date = `${newLesson.date.getMonth()}/${newLesson.date.getDate() + 1}/${newLesson.date.getYear()}`
    newLesson.date = new Date (date)
    newLesson.vocabulary = newLesson.vocabulary.split(',')
    console.log(addedLesson);
    mainSvc.addLesson(newLesson).then((response) => {
      $mdToast.show(
        $mdToast.simple()
        .textContent(response)
        .hideDelay(3000)
      )
      $scope.getLessons();
    })
  }
  $scope.getLessons()
  $scope.getStudents = () => {
    mainSvc.getStudents().then((response) => {
      $scope.students = response
    })
  }
  $scope.getStudents()
  $scope.removeAssignment = (id) => {
    mainSvc.deleteAssignment(id).then((response) => {
      $mdToast.show(
        $mdToast.simple()
        .textContent(response)
        .hideDelay(3000)
      )
      $scope.getAssignments();
    })
  }
  $scope.addStudent = (stud) => {
    mainSvc.addStudent(stud).then((response) => {
      $mdToast.show(
        $mdToast.simple()
        .textContent(response)
        .hideDelay(3000)
      )
      $scope.getStudents();
    })
  }
  $scope.removeLesson = (id) => {
    mainSvc.deleteLesson(id).then((response) => {
      $mdToast.show(
        $mdToast.simple()
        .textContent(response)
        .hideDelay(3000)
      )
      $scope.getLessons()
    })
  }
  $scope.removeStudent = (id) => {
    mainSvc.deleteStudent(id).then((response) => {
      $mdToast.show(
        $mdToast.simple()
        .textContent(response)
        .hideDelay(3000)
      )
      $scope.getStudents()
    })
  }
  function AppCtrl($scope) {
    $scope.currentNavItem = 'page1';
  }
})
