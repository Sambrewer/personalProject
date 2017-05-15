angular.module('classroomApp').service('mainSvc', function($http) {
  this.login = function(user) {
    // console.log(user);

     return $http({
       method: 'POST',
       url: '/api/users',
       data: user
     }).then((response) => {
      //  console.log(response);
       return response;
     })
  }
  this.getUser = function() {
    return $http.get( + '/api/users').then(function(response) {
      // console.log(response.data[0]);
      return response.data[0]
    })
  }
  this.getStudents = function() {
    return $http.get('/api/students').then(function(response) {
      // console.log(response);
      return response.data;
    })
  }
  this.getAssignments = () => {
    return $http.get('/api/assignments').then((response) => {
      return response.data;
    })
  }
  this.getScore = (id)=>{
    return $http.get(`/api/scores/${id}`).then((response) => {
      return response.data;
    })
  }
  this.getGrades = (id)=>{
    console.log('get grades');
    return $http.get(`/test/${id}`).then((response) => {
      // console.log('Get Request', response.data);
      return response.data
    })
  }
  this.getBehaviour = () => {
    return $http.get(`/behaviour`).then((response) => {
      // console.log('service', response.data);
      return response.data
    })
  }
  this.getLesson = () => {
    return $http.get(`/api/lesson`).then((response) => {
      // console.log(response.data);
      return response.data
    })
  }
  this.getDef = (word) => {
    return $http.get(`/api/definition/${word}`).then((response) => {
      console.log(response.data.entry_list.entry[0]);
      return response.data.entry_list.entry[0];
    })
  }
  this.addScore = (score) => {
    return $http({
      method: 'POST',
      url: '/api/scores',
      data: score
    }).then((response) => {
      return response.data;
    })
  }
  this.addAssignment = (assignment) => {
    return $http({
      method: 'POST',
      url: '/api/assignments',
      data: assignment
    }).then((response) => {
      // console.log(response);
      return response.data;
    })
  }
  this.addLesson = (lesson) => {
    return $http({
      method: 'POST',
      url: `/api/lesson`,
      data: lesson
    }).then((response) => {
      // console.log(response.data);
      return response.data;
    })
  }
  this.addStudent = (student) => {
    return $http({
      method: 'POST',
      url: `/api/students`,
      data: student
    }).then((response) => {
      return response.data;
    })
  }
  this.addTeacher = (teacher) => {
    return $http({
      method: `POST`,
      url: `/api/teachers`,
      data: teacher
    }).then((response) => {
      return response.data
    })
  }
  this.behaveUpdate = (behave) => {
    return $http({
      method: 'PUT',
      url: `/api/behave`,
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
      url: `/api/lesson/${id}/objective`,
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
      url: `/api/lesson/${id}/verification`,
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
      url: `/api/lesson/${id}/information`,
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
      url: `/api/lesson/${id}/activity`,
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
      url: `/api/lesson/${id}/materials`,
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
      url: `/api/lesson/${id}/other`,
      data: {
        other: upMisc
      }
    }).then((response) => {
      return response.data;
    })
  }
  this.deleteAssignment = (id) => {
    return $http.delete(`/api/assignment/${id}`)
    .then((response) => {
      return response.data
    })
  }
  this.deleteLesson = (id) => {
    return $http.delete(`/api/lesson/${id}`)
    .then((response) => {
      // console.log(response.data);
      return response.data
    })
  }
  this.deleteStudent = (id) => {
    return $http.delete(`/api/student/${id}`)
    .then((response) => {
      // console.log(response.data);
      return response.data;
    })
  }
})
