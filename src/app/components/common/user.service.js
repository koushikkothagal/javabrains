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
    
    service.setAuthData = function (authData) {
      currentAuthData = authData;
    };
    

    service.login = function (user) {
      if (user.rememberMe) {
        user.rememberMe = 'default';
      }
      else {
        user.rememberMe = 'sessionOnly';
      } 
      return Auth.$authWithPassword({
        email: user.email,
        password: user.password
      }, {'remember': user.rememberMe})
      .then(function(authData, err) {
          currentUser = authData.uid;
          currentAuthData = authData;
          console.log('Logged in as:', authData.uid);
        
      });
      
      
      
    };

    service.signup = function (user) {
      return Auth.$createUser({
        email: user.email,
        password: user.password,
        fullName: user.fullName
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
      Auth.$unauth();
      currentUser = null;
      currentAuthData = null;
    };
  });
