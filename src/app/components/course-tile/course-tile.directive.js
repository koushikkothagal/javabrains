(function() {
  'use strict';

  angular
    .module('javabrains')
    .directive('courseTile', courseTile);

  /** @ngInject */
  function courseTile() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/course-tile/course-tile.html',
      scope: {
         'course': '=' 
      },
      controller: CourseTileController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function CourseTileController(courseDataService) {
      
      this.topics = courseDataService.topics;
      
      this.topic = courseDataService.topicMap[this.course.topic]; 
      // _.find(this.topics, {'code': this.course.topic});
      this.course.color = this.topic.color;
      if (this.course.incomplete) {
        this.course.link = "";
      }
      else {
        this.course.link = "course({'courseName': vm.course.code})";  
      }
      
    }
  }

})();
