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
     vm.info.mainButtonText = "Start Course";
     angular.forEach(vm.info.units, function(unit) {
       unit.unitNumber = '0' + unit.unitNumber; // Not planning to *ever* have > 10 units per course. Change this if that isn't true.
       unit.topic = vm.info.topic.code;
       angular.forEach(unit.lessons, function(lesson) {
         if (lessonsViewed[lesson.permalinkName]) {
           lesson.viewed = true;
           vm.info.mainButtonText = "Resume Course";
         }
         if (!lessonsViewed[lesson.permalinkName] && !vm.info.startCourseUrl) {
           vm.info.startCourseUrl = vm.info.courseBaseUrl + lesson.permalinkName;
           
         }
       })
     });
     
     
  }
})();