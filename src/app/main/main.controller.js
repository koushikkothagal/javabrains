(function() {
  'use strict';

  angular
    .module('javabrains')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, courseDataService, User, $state, loginModalService) {
    if (User.getCurrentUser()) {
      $state.go('dashboard');
    }
    var vm = this;
    $rootScope.page = {
      'title': 'Java Brains',
      'desc': 'Learn and advance your Java and JavaScript skills online'
    };
    vm.topics = courseDataService.topics;
    vm.courses = courseDataService.courses;
    
    vm.clearError = function() {
      vm.err = '';
    }  
    
    vm.openLoginModal = function() {
      loginModalService.openLoginModal();
    }
    
    vm.signup = function () {
      if (!vm.user || !vm.user.email || !vm.user.password || !vm.user.fullName) {
        vm.err = "Please fill in your details";
        return;
      }
      if (!vm.user.agreeToTerms) {
        vm.err = "You need to agree to the terms of use";
        return;
      }
      User.signup(vm.user)
        .then(function (success) {
          $state.go('dashboard');
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
