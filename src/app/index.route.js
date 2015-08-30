(function() {
  'use strict';

  angular
    .module('javabrains')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('topics', {
        url: '/topics',
        templateUrl: 'app/topics/topics.html',
        controller: 'TopicsController',
        controllerAs: 'topics'
      })
      .state('courses', {
        url: '/courses?topic',
        templateUrl: '/app/courses/courses.html',
        controller: 'CoursesController',
        controllerAs: 'courses'
      })
      .state('course', {
        url: '/courses/:courseName',
        resolve: {
          courseData:  function(REST_ROOT_URL, $http, $stateParams, $q){
            // return $http.get(REST_ROOT_URL + 'courses/' + $stateParams.courseName);
            return $http.get('/assets/data/courses/' + $stateParams.courseName + '.json');
            // return $http.get('https://api.parse.com/1/classes/CourseApi?where={"CourseName":"spring_data"}');
         },
        },
        templateUrl: '/app/coursedetail/coursedetail.html',
        controller: 'CourseDetailController',
        controllerAs: 'course'
      })
      .state('lesson', {
        url: '/courses/:courseName/lessons/:lessonName',
        resolve: {
          lessonData:  function(REST_ROOT_URL, $http, $stateParams, $q){
            return $http.get('/assets/data/courses/' + $stateParams.courseName + '/lessons/' + $stateParams.lessonName + '.json');
            
            /*
            return $http.get('https://javabrains-data.parseapp.com/courses/' + $stateParams.courseName + '/lessons/' + $stateParams.lessonName, 
              {
                cache: true
              }
            );
            */
            
         },
        },
        templateUrl: '/app/lessons/lessons.html',
        controller: 'LessonController',
        controllerAs: 'lesson'
      })    
      ;

    $urlRouterProvider.otherwise('/');
  }

})();
