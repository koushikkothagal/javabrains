(function () {
  'use strict';

  angular
    .module('javabrains')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController(User, currentUser, userCourses, courseDataService, $http, $rootScope) {
    var vm = this;
    vm.courseList = [];
    vm.user = User.getCurrentUser();
    
    $rootScope.page = {
      'title': 'Dashboard - Java Brains',
      'desc': 'Welcome to your dashboard page. Check out your courses!'
    };
    
    

    if (userCourses.length === 0) {
      // User hasn't taken any courses yet. Show them the popular courses
      vm.mostRecent = undefined;
      var popularCourses = ['javaee_jaxrs', 'spring_core', 'buildsys_mavenintro'];
      
      for (var i in popularCourses) {
        
        vm.courseList.push(courseDataService.courseMap[popularCourses[i]]);
      }
      return;
    }

    for (var i in userCourses) {
      vm.courseList.push(courseDataService.courseMap[userCourses[i].courseId]);
    }

    vm.courseList = _.uniq(vm.courseList);

    if (userCourses.length > 0) {
      vm.mostRecent = {
        'courseDetails': vm.courseList[0],
        'userCourse': userCourses[0],
        'unit': {},
        'resumeLesson': '',
        'lessons': []
      }
    }
    var lessonsViewed = userCourses[0].lessons;
    var latestLessonViewedPermalink = lessonsViewed.latest
    vm.courseBaseUrl = '/courses/' + vm.mostRecent.courseDetails.code;
    vm.lessonBaseUrl = vm.courseBaseUrl + '/lessons/';
    $http.get('/assets/data/courses/' + vm.mostRecent.courseDetails.code + '.json',
      {
        cache: true
      })
      .then(function (response) {
        var unitArray = [];
        _.forEach(response.data.units, function (unit) {
          unitArray.push(unit);
        });
        var unit = unitArray[0];
        var index = 0;
        // For each unit in the course
        for (var i = 0; i < unitArray.length; i++) {
          unit = unitArray[i];

          index = _.findIndex(unit.lessons, function (lesson) {
            return lesson.permalinkName === latestLessonViewedPermalink;
          });
          if (index === -1 && i === unitArray.length - 1) {
            // Not found and we are all the way into the last unit? Just pick the first element of the first unit
            index = 0;
            unit = unitArray[0];
          }
          else if (index === -1 && i !== unitArray.length - 1) {
            // Not found in this unit, but more units to go. Continue to the next unit
            continue;
          }
          else if (index === unit.lessons.length - 1 && i === unitArray.length - 1) {
            // What was last viewed is the last lesson in the last unit! TODO: Do something here.
              
          }
          else if (index === unit.lessons.length - 1 && i < unitArray.length) {
            // What was last viewed is the last lesson in a unit! Go to the next unit
            index = 0;
            unit = unitArray[i + 1];
            break;
          }
          else {
            // Normal scenario
            break;

          }

        }
        vm.mostRecent.unit = unit;
        vm.mostRecent.resumeLesson = unit.lessons[index];
        // unit.lessons[index] is viewed. Resume course url should take one to the next lesson
        // Unless, of course, if index = 0. In which case, the first lesson in the unit hasn't been viewed.
        if (index === 0) {
          vm.resumeCourseUrl = vm.courseBaseUrl + '/lessons/' + unit.lessons[0].permalinkName;
        }
        else {
          vm.resumeCourseUrl = vm.courseBaseUrl + '/lessons/' + unit.lessons[index + 1].permalinkName;
        }

        for (var j = index; j < unit.lessons.length; j++) {
          unit.lessons[j].viewed = !!lessonsViewed[unit.lessons[j].permalinkName];
          vm.mostRecent.lessons.push(unit.lessons[j]);
        }

      });



  }
})();
