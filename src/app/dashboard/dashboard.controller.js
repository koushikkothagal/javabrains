(function() {
  'use strict';

  angular
    .module('javabrains')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController(User, currentUser) {
    var vm = this;
    console.log(currentUser);

    
  }
})();
