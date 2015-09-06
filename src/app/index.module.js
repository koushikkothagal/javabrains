(function () {
  'use strict';

  angular
    .module('javabrains.data', []);
  angular
    .module('javabrains', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap',
      'javabrains.data', 'firebase']);

    
})();
