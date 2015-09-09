(function() {
  'use strict';

  angular
    .module('javabrains')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController(User, currentUser, userCourses, courseDataService) {
    var vm = this;
    vm.takenCourseDetails = [];
    
    for (var i in userCourses) {
      vm.takenCourseDetails.push(courseDataService.courseMap[userCourses[i].courseId]);
    }
    
  }
})();
