(function () {
  'use strict';

  angular
    .module('javabrains')
    .directive('jbFooter', footer);

  /** @ngInject */
  function footer() {
    var directive = {
      restrict: 'E',
      templateUrl: '/app/components/footer/footer.html',
      controller: FooterController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    

    

    /** @ngInject */
    function FooterController(loginModalService, signUpModalService, UserData) {
      var vm = this;
      
      vm.openLoginModal = function () {
       loginModalService.openLoginModal();
      };

      vm.openSignUpModal = function () {
        signUpModalService.openSignUpModal();
      };
      
      vm.submitContact = function() {
        if (!vm.message || !vm.message.email || !vm.message.body) {
          return;
        }
        UserData.submitContact(vm.message);
        vm.submitted = true;
      }

    }
  }

})();
