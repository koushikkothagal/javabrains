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
    function NavbarController($modal, loginModalService, signUpModalService, User) {
      var vm = this;
      
      /*
      var ref = new Firebase("https://javabrains.firebaseio.com/");
      vm.authObj = $firebaseAuth(ref);
      vm.authObj.$onAuth(function(authData) {
        vm.authData = authData;
        console.log('listened');
        console.log(authData.password.email);
      });
      */
      
      vm.user = User;
      vm.currentUser = User.getCurrentUser();
      // vm.auth = Auth;
      vm.openLoginModal = function () {
       loginModalService.openLoginModal();
      }

      vm.openSignUpModal = function () {
        signUpModalService.openSignUpModal();
      }

      vm.logout = function () {
        User.logout();
        vm.currentUser = null;
      }

     /*
      vm.auth.$onAuth(function (authData) {
      if (authData) {
        User.setCurrentUser(authData.uid);
        User.setAuthData(authData);
        vm.currentUser = authData.uid;
      } else {
        vm.currentUser = null;
      }
    });
    */

    }
  }

})();
