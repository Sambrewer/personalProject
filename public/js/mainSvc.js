angular.module('classroomApp').service('mainSvc', function($http) {
  const baseUrl = 'http://localhost:3000/';
  this.login = function(user) {
    // console.log(user);

     return $http({
       method: 'POST',
       url: baseUrl + 'api/users',
       data: user
     }).then((response) => {
      //  console.log(response);
       return response;
     })
  }
  this.getUser = function() {
    return $http.get(baseUrl + 'api/users').then(function(response) {
      console.log(response.data[0]);
      return response.data[0]
    })
  }
  this.getStudents = function() {
    return $http.get(baseUrl + 'api/students').then(function(response) {
      console.log(response);
      return response.data;
    })
  }
  this.addAssignment = (assignment) => {
    return $http({
      method: 'POST',
      url: baseUrl + 'api/assignments',
      data: assignment
    }).then((response) => {
      console.log(response);
      return response.data;
    })
  }
})
