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


    service.updateUser = function (userObj) {

      var currentUser = Parse.User.current();
      if (userObj.email && userObj.email !== currentUser.attributes.email) {
        currentUser.set("username", userObj.email);
        currentUser.set("email", userObj.email);  
      }
      if (userObj.password) {
        currentUser.set("password", userObj.password);
      }
      if (userObj.fullName && userObj.fullName !== currentUser.attributes.fullName) {
        currentUser.set("fullName", userObj.fullName);  
      }

      var deferred = $q.defer();

      currentUser.save(null)
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

    
    service.resendEmail = function () {
/* TODO
      var currentUser = Parse.User.current();
      var actualEmail = currentUser.attributes.email;
      currentUser.set("email", 'foo@bar.com');
      
      
      var deferred = $q.defer();

      currentUser.save(null)
        .then(
          function (user) {
            user.set("email", actualEmail);
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
      
*/
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