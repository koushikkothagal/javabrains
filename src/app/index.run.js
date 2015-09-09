(function () {
  'use strict';

  angular
    .module('javabrains')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, loginModalService) {
    Parse.initialize("xqKPoVKoqyVEm0epT3FB6AUTvLMjHVZxLldDFZs1", "qdzAPNcWxNW0q6rVrUUqVi3NCWd7UgojKO8EgNLg");
    
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