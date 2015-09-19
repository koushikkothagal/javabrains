'use strict';

angular.module('javabrains')
  .service('ParseAuth', function ($q) {

    var service = this;

    // var user = new Parse.User();
    
    service.getCurrentUser = function () {
      if (Parse.User.current()) {
        return Parse.User.current().attributes;
      }
    }

    service.createUser = function (userObj) {

      var user = new Parse.User();
      user.set("username", userObj.email);
      user.set("password", userObj.password);
      user.set("email", userObj.email);
      user.set("fullName", userObj.fullName);

      var deferred = $q.defer();

      user.signUp(null)
        .then(
          function (user) {
            return deferred.resolve(user.attributes);
          },
          function (error) {
            if (error.code === 202) {
              error.code = 'EMAIL_TAKEN';
            }
            if (error.code === 125) {
              error.code = 'INVALID_EMAIL';
            }
            return deferred.reject(error);
          }
          );
      return deferred.promise;
    }


    service.resetPassword = function (userObj) {
      var deferred = $q.defer();
      Parse.User.requestPasswordReset(userObj.email)
        .then(
          function (user) {
            return deferred.resolve(user.attributes);
          },
          function (error) {
            if (error.code === 125) {
              error.code = 'INVALID_EMAIL';
            }
            if (error.code === 205) {
              error.code = 'NOT_FOUND';
            }
            return deferred.reject(error);
          }
          );
      return deferred.promise;


    }

    service.loginUser = function (userObj) {
      var deferred = $q.defer();
      Parse.User.logIn(userObj.email, userObj.password)
        .then(
          function (user) {
            return deferred.resolve(user.attributes);
          },
          function (error) {
            if (error.code === 101) {
              error.code = 'INVALID_LOGIN';
            }
            return deferred.reject(error);
          }
          );
      return deferred.promise;
    };

    service.logout = function () {
      Parse.User.logOut();
    };

    service.requireAuth = function () {
      var currentUser = Parse.User.current();
      if (currentUser) {
        return $q.when(currentUser);
      } else {
        return $q.reject('AUTH_REQUIRED');
      }
    };




  })
;