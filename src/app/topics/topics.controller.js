(function() {
  'use strict';

  angular
    .module('javabrains')
    .controller('TopicsController', TopicsController);

  /** @ngInject */
  function TopicsController(courseDataService) {
    var vm = this;
    vm.topics = courseDataService.topics;
    console.log(vm.topics);

  }
})();
