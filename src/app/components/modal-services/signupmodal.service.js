(function () {
  'use strict';

  angular
    .module('javabrains')
    .factory('signUpModalService', signUpModalService);

  function signUpModalService($modal) {

    var api = {};

    api.openSignUpModal = function () {
      var modalInstance = $modal.open({

        templateUrl: '/app/components/navbar/signup.html',
        controller: SignUpController

      });
    };

    return api;

  };

  function SignUpController($scope, User, $modalInstance, loginModalService) {
    $scope.signup = function () {
      User.signup($scope.user)
        .then(function (success) {
          $modalInstance.dismiss();
        })
        .catch(function (err) {
          if (err.code === 'INVALID_EMAIL') {
            $scope.err = "Please enter a valid email ID";
          }
          if (err.code === 'EMAIL_TAKEN') {
            $scope.err = "There is already an account registered with this email!";
          }

        });
    }

    $scope.openLoginModal = function () {
      $modalInstance.dismiss();
      loginModalService.openLoginModal();
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