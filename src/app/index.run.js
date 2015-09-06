(function() {
  'use strict';

  angular
    .module('javabrains')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, loginModalService) {

    // $log.debug('runBlock end');
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      event.preventDefault();
      if (error === 'AUTH_REQUIRED') {
        $state.go('home');
        loginModalService.openLoginModal();
      }
    });
    
    
  }

})();