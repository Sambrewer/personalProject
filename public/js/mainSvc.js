angular.module('classroomApp').service('mainSvc', function($http) {
  const baseUrl = 'http://localhost:3000/';
  this.login = function(user) {
    console.log(user);

     return $http({
       method: 'POST',
       url: baseUrl + 'api/users',
       data: user
     }).then((response) => {
       console.log(response);
       return response;
     })
  }
})
