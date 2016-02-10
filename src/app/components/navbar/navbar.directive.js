(function () {
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
    function NavbarController($modal, loginModalService, signUpModalService, User, $rootScope, $state) {
      var vm = this;
      $rootScope.$on('$stateChangeSuccess', 
        function(){
          window.scrollTo(0, 0);
        });

      vm.user = User;
      vm.currentUser = User.getCurrentUser();

      vm.openLoginModal = function () {
       loginModalService.openLoginModal();
      };

      vm.openSignUpModal = function () {
        signUpModalService.openSignUpModal();
      };

      vm.logout = function () {
        User.logout();
        vm.currentUser = null;
        $state.go('home');
      };
      
      vm.getHomeLink = function() {
        if (User.getCurrentUser()) {
          return '/dashboard';
        }
        else {
          return '/';
        }
      };
    }
  }

})();
