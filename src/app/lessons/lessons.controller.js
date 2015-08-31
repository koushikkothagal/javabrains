(function () {
  'use strict';

  angular
    .module('javabrains')
    .controller('LessonController', LessonController);

  /** @ngInject */
  function LessonController(lessonData, $sce, $http, $stateParams) {
    this.info = lessonData.data;
    var vm = this;
    
    // this.info = {"courseCode":"javaee_jaxws","courseName":"Developing SOAP Web Services with JAX-WS","description":"Welcome to this tutorial course on SOAP web services in Java. We'll start with an introduction to web services. We'll understand what they are and how they are useful.","nextLessonPermalinkName":"Web-Service-Jargon","permalinkName":"Introduction-to-Web-Services","title":"Introduction to Web Services","unitSlNo":"2.1","youtube":"mKjvKPlb1rA", "topic": "javaee"};
    var tokens = vm.info.unitSlNo.split('.');
    var lessonIndex = tokens[1] - 1;
    vm.unit = vm.info.unit;
    vm.unit.lessons[lessonIndex].current = true;
    vm.getLessonTrailClasses = function (lesson) {
      var lessonType = lesson.type;
      var isCurrent = lesson.current;
      var style = 'fa fa-stack-1x clickable';
      if (lessonType === 'video') {
        style = style + ' fa-play-circle';
      }
      if (lessonType === 'quiz') {
        style = style + ' fa-question-circle';
      }

      if (!isCurrent) {
        style = style + ' fa-2x faded';
      }
      console.log('Returned style ' + style);
      return style;
    }


    vm.lessonTrailStyle =
    {
      'video': {
        'current': 'fa fa-play-circle clickable faded',

      }
    }
    'fa fa-play-circle clickable faded';
    /*
    $http.get('https://javabrains-data.parseapp.com/courses/' + $stateParams.courseName, {cache: true})
      .then(function (response) {
        vm.course = response.data;
        vm.unit = vm.course.units[unitIndex];
        vm.unit.lessons[lessonIndex].current = true;
        console.log(vm.course.units);
        }
      );
     */
      
    // console.log(this.info);
    // this.info.youtube = $sce.trustAsResourceUrl('//www.youtube.com/embed/' + this.info.youtube + '?rel=0&showinfo=0&fs=1&autoplay=1');
    this.info.youtube = $sce.trustAsResourceUrl('//www.youtube.com/embed/' + this.info.youtube + '?rel=0&showinfo=0&fs=1&theme=light&modestbranding=1');
    this.info.content = $sce.trustAsHtml(this.info.content);
  }
})();