(function() {
  'use strict';

  angular
    .module('javabrains')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, courseDataService) {
    var vm = this;
    $rootScope.page = {
      'title': 'Java Brains',
      'desc': 'Learn and advance your Java and JavaScript skills online'
    };
    vm.topics = courseDataService.topics;
    vm.courses = courseDataService.courses;
  }
})();
