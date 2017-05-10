angular.module('classroomApp').controller('plannerCtrl', function($scope, mainSvc) {

  $scope.getAssignments = () => {
    mainSvc.getAssignments().then((response) => {
      $scope.assignments = response;
    })
  }
  $scope.getAssignments()
  $scope.addAssignment = (assignment) => {
    mainSvc.addAssignment(assignment).then(function(response) {
      alert(response)
      $scope.getAssignments();
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
      addedLesson.misc = newLesson.misc.split(',')
    }
    let date =
    addedLesson.name = newLesson.name
    addedLesson.activity = newLesson.activity
    addedLesson.info = newLesson.info
    addedLesson.objective = newLesson.objective
    addedLesson.requiredMats = addMats
    addedLesson.verification = newLesson.verification

    addedLesson.timeStart = newLesson.timeStart
    addedLesson.timeEnd = newLesson.timeEnd
    addedLesson.year = newLesson.date.getFullYear()
    addedLesson.date = newLesson.date.getDate()
    addedLesson.month = newLesson.date.getMonth()
    console.log(addedLesson);
    mainSvc.addLesson(addedLesson).then((response) => {
      alert(response);
    })
  }
  $scope.getLessons = () => {
    mainSvc.getLesson().then((response) => {
      $scope.lessons = response
      console.log($scope.lessons);
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
      alert(response)
      $scope.getAssignments();
    })
  }
  $scope.addStudent = (stud) => {
    mainSvc.addStudent(stud).then((response) => {
      alert(response);
      $scope.getStudents();
    })
  }
  $scope.removeLesson = (id) => {
    mainSvc.deleteLesson(id).then((response) => {
      alert(response)
      $scope.getLessons()
    })
  }
  $scope.removeStudent = (id) => {
    mainSvc.deleteStudent(id).then((response) => {
      alert(response)
      $scope.getStudents()
    })
  }
  function AppCtrl($scope) {
    $scope.currentNavItem = 'page1';
  }
})
