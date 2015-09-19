(function () {
  'use strict';

  angular
    .module('javabrains')
    .factory('loginModalService', loginModalService);

  function loginModalService($modal) {

    var api = {};

    api.openLoginModal = function () {
      var modalInstance = $modal.open({

        templateUrl: '/app/components/navbar/login.html',
        controller: LoginController

      });
    };

    return api;

  };

  function LoginController($scope, User, $modalInstance, $state, signUpModalService, resetPasswordModalService) {

    $scope.login = function () {
      User.login($scope.user)
        .then(function () {
          $modalInstance.dismiss()
          $state.go('dashboard');
        })
        .catch(function (err) {
          if (err.code === 'INVALID_EMAIL') {
            $scope.err = "Please enter a valid email ID";
          }
          if (err.code === 'INVALID_LOGIN') {
            $scope.err = "Incorrect login. Please try again!";
          }
          
        });
        
        
        
      /*
      authObj.$authWithPassword({
        email: $scope.email,
        password: $scope.password
      }).then(function (authData) {
        console.log("Logged in as:", authData.uid);
        $modalInstance.dismiss();
      }).catch(function (error) {
        console.error("Authentication failed:", error);
      });
      */
    };
    
    $scope.clearError = function() {
      $scope.err = '';
    }  
    
    $scope.openSignUpModal = function () {
      $modalInstance.dismiss();
      signUpModalService.openSignUpModal();
    }
    
    $scope.openResetPasswordModal = function () {
      $modalInstance.dismiss();
      resetPasswordModalService.openResetPasswordModal();
    }
    
    
  };

})();