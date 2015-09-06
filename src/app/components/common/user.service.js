'use strict';

angular.module('javabrains')
  .service('User', function (Auth) {
    var service = this,
      currentUser = null,
      currentAuthData = null;

    service.getCurrentUser = function () {
      return currentUser;
    };

    service.setCurrentUser = function (user) {
      currentUser = user;
    };
    
    service.getAuthData = function () {
      return currentAuthData;
    };
    

    service.login = function (user) {
      return Auth.$authWithPassword({
        email: user.email,
        password: user.password
      }, function(error, authData) {
        if (error) {
          currentUser = null;
          console.error('Authentication failed:', error);
        } else {
          currentUser = authData.uid;
          currentAuthData = authData;
          console.log('Logged in as:', authData.uid);
        }
      });
    };

    service.signup = function (user) {
      return Auth.$createUser({
        email: user.email,
        password: user.password
      }, function(error, authData) {
        if(error){
          console.error('Error: ', error);
          return error;
        } else {
          console.log('User ' + authData.uid + ' created successfully!');
          return service.login(user.email, user.password);
        }
      });
    };

    service.logout = function () {
      console.log('LOGOUT FIRED!');
      Auth.$unauth();
      currentUser = null;
    };
  });
