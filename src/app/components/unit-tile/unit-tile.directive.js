(function() {
  'use strict';

  angular
    .module('javabrains')
    .directive('unitTile', unitTile);

  /** @ngInject */
  function unitTile() {
    var directive = {
      restrict: 'E',
      templateUrl: '/app/components/unit-tile/unit-tile.html',
      scope: {
         'unit': '=' 
      },
      controller: UnitTileController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function UnitTileController() {
      this.lessonBaseUrl = '/courses/' + this.unit.courseCode + '/lessons/';
      
       
      
    }
  }

})();
