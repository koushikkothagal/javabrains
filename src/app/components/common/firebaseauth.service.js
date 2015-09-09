'use strict';

angular.module('javabrains')
  .factory('FirebaseAuth', function ($firebaseAuth, ENDPOINT_URI) {
    var ref = new Firebase(ENDPOINT_URI);
    return $firebaseAuth(ref);
  })
;