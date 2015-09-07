(function() {
  'use strict';

  angular
    .module('javabrains')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope) {
    var vm = this;
    $rootScope.page = {
      'title': 'Java Brains',
      'desc': 'Learn and advance your Java and JavaScript skills online'
    };
    
  }
})();
