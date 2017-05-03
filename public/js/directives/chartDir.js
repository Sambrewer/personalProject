angular.module('classroomApp').directive('chartDir', function() {
  return {
    restrict: 'A',
    scope: {

    },
    link: function(scope, element, attributes) {
      var myData = new Array(['unit', 20], ['unit two', 10], ['unit three', 30], ['other unit', 10], ['last unit', 30]);
      var myChart = new JSChart('bloobleeblah', 'bar');
      myChart.setDataArray(myData);
      myChart.draw();
    }
  }
})
