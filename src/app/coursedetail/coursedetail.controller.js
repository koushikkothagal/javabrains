(function() {
  'use strict';

  angular
    .module('javabrains')
    .controller('CourseDetailController', CourseDetailController);

  /** @ngInject */
  function CourseDetailController(courseData, courseDataService, User, UserData, lessonsViewed) {
     this.info = courseData.data;
     console.log(lessonsViewed);
     var vm = this;
     vm.info.topic = courseDataService.topicMap[vm.info.topic];
     vm.info.imageUrl = '/assets/images/' + vm.info.code + '.jpg'
     vm.info.courseBaseUrl = '/courses/' + vm.info.code + '/lessons/';
     vm.info.startCourseUrl =  vm.info.units[1].firstLesson;
     angular.forEach(vm.info.units, function(unit) {
       unit.unitNumber = '0' + unit.unitNumber; // Not planning to *ever* have > 10 units per course. Change this if that isn't true.
       unit.topic = vm.info.topic.code;
     });
     
     vm.markCourseStarted = function() {
       UserData.markCourseStarted(vm.info.code);
     }
     
     
  }
})();