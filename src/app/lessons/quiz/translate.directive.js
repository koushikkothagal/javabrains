(function() {
  'use strict';

  angular
    .module('javabrains')
    .directive('translateX', TranslateDirective);

  /** @ngInject */
    function TranslateDirective() {
        return {
            restrict: "A",
            link: function(scope, elem, attrs) {
                scope.$watch(attrs.translateX, function(newVal, oldVal) {
                    if (newVal && newVal !== oldVal) {
                      newVal = parseFloat(newVal) + "%";
                      elem.css("transform", "translateX(" + newVal + ")"); 
                    } 
                });
            }
        };
    }
  
})();
  






