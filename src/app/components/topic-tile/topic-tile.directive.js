(function() {
  'use strict';

  angular
    .module('javabrains')
    .directive('topicTile', topicTile);

  /** @ngInject */
  function topicTile() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/topic-tile/topic-tile.html',
      scope: {
         'topic': '=' 
      },
      controller: TopicTileController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function TopicTileController() {
    }
  }

})();
