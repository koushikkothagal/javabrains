(function() {
  'use strict';

  angular
    .module('javabrains')
    .directive('navbar', navbar);

  /** @ngInject */
  function navbar() {
    var directive = {
      restrict: 'E',
      templateUrl: '/app/components/navbar/navbar.html',
      transclude: true,
      scope: {
         'homeUrl': '=' 
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController() {
      console.log(this.homeUrl);

    }
  }

})();
