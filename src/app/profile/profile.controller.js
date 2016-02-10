(function () {
  'use strict';

  angular
    .module('javabrains')
    .controller('ProfileController', ProfileController);

  /** @ngInject */
  function ProfileController(User, currentUser, $rootScope) {
    var vm = this;
    vm.user = angular.copy(User.getCurrentUser());
    
    $rootScope.page = {
      'title': 'Your Profile - Java Brains',
      'desc': 'View and edit your profile'
    };
    
    vm.clearError = function() {
      vm.err = '';
    }  
    
    vm.resendEmail = function() {
      vm.err = '';
      User.resendEmail()
        .then(function(success) {
          vm.err = "Email resent. Click on the link in the email to verify your account."
        })
    }  
    
    
    
    vm.updateProfile = function () {
      if (!vm.user || !vm.user.email || !vm.user.fullName) {
        vm.err = "Please fill in your details";
        return;
      }
      User.updateUser(vm.user)
        .then(function (success) {
          vm.err = "Profile updated";
          vm.user = angular.copy(User.getCurrentUser());
        })
        .catch(function (err) {
          if (err.code === 'INVALID_EMAIL') {
            vm.err = "Please enter a valid email ID";
          }
          if (err.code === 'EMAIL_TAKEN') {
            vm.err = "There is already an account registered with this email!";
          }

        });
    }
    
    
  }
})();
