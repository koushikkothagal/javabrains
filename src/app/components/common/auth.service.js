/*
'use strict';

angular.module('javabrains')
  .factory('Auth', function ($firebaseAuth, ENDPOINT_URI) {
    var ref = new Firebase(ENDPOINT_URI);
    return $firebaseAuth(ref);
  })
;
*/