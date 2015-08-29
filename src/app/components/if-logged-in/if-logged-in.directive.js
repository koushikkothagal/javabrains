(function () {
  'use strict';

  angular
    .module('javabrains')
    .directive('ifLoggedIn', ifLoggedIn)
    .directive('ifNotLoggedIn', ifNotLoggedIn);

  /** @ngInject */
  function IfLoggedInController() {
    var vm = this;

    vm.isLoggedIn = false;

  }

  /** @ngInject */
  function ifLoggedIn() {
    var directive = {
      restrict: 'A',
      template: '<div ng-if="vm.isLoggedIn" ng-transclude></div>',
      transclude: true,
      scope: {
      },
      controller: IfLoggedInController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;


  }

  /** @ngInject */
  function ifNotLoggedIn() {
    var directive = {
      restrict: 'A',
      template: '<div ng-if="!vm.isLoggedIn" ng-transclude></div>',
      transclude: true,
      scope: {
      },
      controller: IfLoggedInController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;


  }



})();
