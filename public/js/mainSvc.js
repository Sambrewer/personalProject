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
      // console.log('Get Request', response.data);
      return response.data
    })
  }
  this.getBehaviour = () => {
    return $http.get(`${baseUrl}behaviour`).then((response) => {
      // console.log('service', response.data);
      return response.data
    })
  }
  this.getLesson = () => {
    return $http.get(`${baseUrl}api/lesson`).then((response) => {
      // console.log(response.data);
      return response.data
    })
  }
  this.getDef = (word) => {
    return $http.get(`${baseUrl}api/definition/${word}`).then((response) => {
      console.log(response.data.entry_list.entry[0]);
      return response.data.entry_list.entry[0];
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
      // console.log(response);
      return response.data;
    })
  }
  this.addLesson = (lesson) => {
    return $http({
      method: 'POST',
      url: `${baseUrl}api/lesson`,
      data: lesson
    }).then((response) => {
      // console.log(response.data);
      return response.data;
    })
  }
  this.addStudent = (student) => {
    return $http({
      method: 'POST',
      url: `${baseUrl}api/students`,
      data: student
    }).then((response) => {
      return response.data;
    })
  }
  this.addTeacher = (teacher) => {
    return $http({
      method: `POST`,
      url: `${baseUrl}api/teachers`,
      data: teacher
    }).then((response) => {
      return response.data
    })
  }
  this.behaveUpdate = (behave) => {
    return $http({
      method: 'PUT',
      url: `${baseUrl}api/behave`,
      data: behave
    }).then((response) => {
      // console.log(response);
      return response.data
    })
  }
  this.updateObj = (upObj, id) => {
    console.log(upObj);
    return $http({
      method: 'PUT',
      url: `${baseUrl}api/lesson/${id}/objective`,
      data: {
        objective: upObj
      }
    }).then((response) => {
      return response.data;
    })
  }
  this.updateVer = (upVer, id) => {
    return $http({
      method: 'PUT',
      url: `${baseUrl}api/lesson/${id}/verification`,
      data: {
        verification: upVer
      }
    }).then((response) => {
      return response.data;
    })
  }
  this.updateInfo = (upInfo, id) => {
    return $http({
      method: `PUT`,
      url: `${baseUrl}api/lesson/${id}/information`,
      data: {
        information: upInfo
      }
    }).then((response) => {
      console.log(response.data);
      return response.data;
    })
  }
  this.updateAct = (upAct, id) => {
    return $http({
      method: `PUT`,
      url: `${baseUrl}api/lesson/${id}/activity`,
      data: {
        activity: upAct
      }
    }).then((response) => {
      return response.data;
    })
  }
  this.updateMat = (upMat, id) => {
    return $http({
      method: `PUT`,
      url: `${baseUrl}api/lesson/${id}/materials`,
      data: {
        materials: upMat
      }
    }).then((response) => {
      return response.data;
    })
  }
  this.updateMisc = (upMisc, id) => {
    return $http({
      method: `PUT`,
      url: `${baseUrl}api/lesson/${id}/other`,
      data: {
        other: upMisc
      }
    }).then((response) => {
      return response.data;
    })
  }
  this.deleteAssignment = (id) => {
    return $http.delete(`${baseUrl}api/assignment/${id}`)
    .then((response) => {
      return response.data
    })
  }
  this.deleteLesson = (id) => {
    return $http.delete(`${baseUrl}api/lesson/${id}`)
    .then((response) => {
      // console.log(response.data);
      return response.data
    })
  }
  this.deleteStudent = (id) => {
    return $http.delete(`${baseUrl}api/student/${id}`)
    .then((response) => {
      // console.log(response.data);
      return response.data;
    })
  }
})
