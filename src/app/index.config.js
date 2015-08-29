(function() {
  'use strict';

  angular
    .module('javabrains')
    .config(config);

  /** @ngInject */
  function config($logProvider, $locationProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
    
    // HTML5 model URLs
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    // Set options third-party lib
   
  }

})();
