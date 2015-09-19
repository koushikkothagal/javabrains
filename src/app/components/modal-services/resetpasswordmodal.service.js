(function () {
  'use strict';

  angular
    .module('javabrains')
    .factory('resetPasswordModalService', resetPasswordModalService);

  function resetPasswordModalService($modal) {

    var api = {};

    api.openResetPasswordModal = function () {
      var modalInstance = $modal.open({

        templateUrl: '/app/components/navbar/reset-password.html',
        controller: ResetPasswordController

      });
    };

    return api;

  };

  function ResetPasswordController($scope, User, $modalInstance, signUpModalService) {
    $scope.resetPassword = function () {
      User.resetPassword($scope.user)
        .then(function (success) {
          $modalInstance.dismiss();
        })
        .catch(function (err) {
          if (err.code === 'INVALID_EMAIL') {
            $scope.err = "Please enter a valid email ID";
          }
          if (err.code === 'NOT_FOUND') {
            $scope.err = "There isn't an account registered with that email ID. Why don't you click Sign Up and create one?";
          }

        });
    }
    
    $scope.clearError = function() {
      $scope.err = '';
    }  
    
    $scope.openSignUpModal = function () {
      $modalInstance.dismiss();
      signUpModalService.openSignUpModal();
    }

    /*
          var ref = new Firebase("https://javabrains.firebaseio.com/");
          var authObj = $firebaseAuth(ref);
    
          $scope.signup = function () {
            $scope.authData = null;
            $scope.error = null;
    
            authObj.$createUser({
              email: $scope.email,
              password: $scope.password,
              fullName: $scope.fullName
            }).then(function (userData) {
              console.log("User " + userData.uid + " created successfully!");
    
              return authObj.$authWithPassword({
                email: $scope.email,
                password: $scope.password
              });
            }).then(function (authData) {
              console.log("Logged in as:", authData.uid);
            }).catch(function (error) {
              console.error("Error: ", error);
            });
    
          };
        }
    */
  }

})();