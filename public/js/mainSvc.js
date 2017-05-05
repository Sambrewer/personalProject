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
      // console.log(response.data[0]);
      return response.data[0]
    })
  }
  this.getStudents = function() {
    return $http.get(baseUrl + 'api/students').then(function(response) {
      // console.log(response);
      return response.data;
    })
  }
  this.getAssignments = () => {
    return $http.get(baseUrl + 'api/assignments').then((response) => {
      return response.data;
    })
  }
  this.getScore = (id)=>{
    return $http.get(`${baseUrl}api/scores/${id}`).then((response) => {
      return response.data;
    })
  }
  this.getGrades = (id)=>{
    console.log('get grades');
    return $http.get(`${baseUrl}test/${id}`).then((response) => {
      console.log('Get Request', response.data);
      return response.data
    })
  }
  this.getBehaviour = () => {
    return $http.get(`${baseUrl}behaviour`).then((response) => {
      console.log('service', response.data);
      return response.data
    })
  }
  this.getLesson = () => {
    return $http.get(`${baseUrl}api/lesson`).then((response) => {
      return response.data[0]
    })
  }
  this.addScore = (score) => {
    return $http({
      method: 'POST',
      url: baseUrl + 'api/scores',
      data: score
    }).then((response) => {
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
  this.behaveUpdate = (behave) => {
    return $http({
      method: 'PUT',
      url: `${baseUrl}api/behave`,
      data: behave
    }).then((response) => {
      console.log(response);
      return response.data
    })
  }
})
