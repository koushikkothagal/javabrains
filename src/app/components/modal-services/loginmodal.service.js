(function () {
  'use strict';

  angular
    .module('javabrains')
    .factory('loginModalService', loginModalService);
	
	function loginModalService($modal) {
    
    var api = {};
    
    api.openLoginModal = function() {
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
          .then(function() {
            $modalInstance.dismiss()
            $state.go('dashboard');
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
    };
    
})();