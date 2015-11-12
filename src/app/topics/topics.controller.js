(function() {
  'use strict';

  angular
    .module('javabrains')
    .controller('TopicsController', TopicsController);

  /** @ngInject */
  function TopicsController(courseDataService, $rootScope) {
    var vm = this;
    $rootScope.page = {
      'title': 'Browse Topics - Java Brains',
      'desc': 'Browse available topics'
    };

    vm.topics = courseDataService.topics;
    console.log(vm.topics);

  }
})();
