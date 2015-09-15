(function () {
  'use strict';

  angular
    .module('javabrains')
    .controller('LessonController', LessonController);

  /** @ngInject */
  function LessonController(lessonData, $sce, $http, $stateParams, User, $rootScope, lessonsViewed, courseDataService) {
    this.info = lessonData.data;
    var vm = this;
    vm.user = User;
    
    vm.lessonsViewed = lessonsViewed;
    
    
    $rootScope.page = {
      'title': vm.info.title + ' - Java Brains',
      'desc': vm.info.description
    };
    
    var tokens = vm.info.unitSlNo.split('.');
    var lessonIndex = tokens[1] - 1;
    vm.unit = vm.info.unit;
    vm.unit.lessons[lessonIndex].current = true;
    vm.getLessonTrailClasses = function (lesson) {
      var isCompleted = false;
      if (vm.lessonsViewed) {
        isCompleted = vm.lessonsViewed[lesson.permalinkName]; 
      }
      var lessonType = lesson.type;
      var isCurrent = lesson.current;
      var style = 'fa fa-stack-1x clickable';
      if (isCompleted && !isCurrent) {
        style = style + ' fa-check-circle';
      }
      else if (lessonType === 'video') {
        style = style + ' fa-play-circle';
      }
      else if (lessonType === 'quiz') {
        style = style + ' fa-question-circle';
      }

      if (!isCurrent) {
        style = style + ' fa-2x faded';
      }
      return style;
    }


    
    this.info.youtube = $sce.trustAsResourceUrl('//www.youtube.com/embed/' + this.info.youtube + '?rel=0&showinfo=0&fs=1&theme=light&modestbranding=1');
    this.info.content = $sce.trustAsHtml(this.info.content);
    
    this.info.topicColor = courseDataService.topicMap[this.info.topic].color;
    
  }
})();