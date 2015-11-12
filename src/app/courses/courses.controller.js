(function() {
  'use strict';

  angular
    .module('javabrains')
    .controller('CoursesController', CoursesController);

  /** @ngInject */
  function CoursesController(courseDataService, $stateParams, $location, $rootScope) {
    this.filterValue = '';
    var vm = this;
    $rootScope.page = {
      'title': 'Browse Courses - Java Brains',
      'desc': 'Browse available courses based on topic'
    };
    
    
    vm.filter = $stateParams.topic;
    if (!vm.filter) {
      vm.filter = ' ';
    }
    
    
    this.topics = courseDataService.topics;
    this.courses = courseDataService.courses;
    vm.goToTopic = function(topic) {
      console.log(topic);
     $location.url('/courses?topic=' + topic); 
    }
     
     
     // this.topicChanged();
     
     
  }
})();