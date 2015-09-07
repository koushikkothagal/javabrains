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

  function LoginController($scope, User, $modalInstance, $state) {

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
          if (err.code === 'INVALID_PASSWORD') {
            $scope.err = "Looks like your email or password is incorrect. Please try again!";
          }
          console.log(JSON.stringify(err));
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
    
    $scope.openSignUpModal = function() {
        $modalInstance.dismiss();
        loginModalService.openLoginModal();
      }
    
    
  };

})();