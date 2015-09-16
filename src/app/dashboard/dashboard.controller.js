(function () {
  'use strict';

  angular
    .module('javabrains')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController(User, currentUser, userCourses, courseDataService, $http) {
    var vm = this;
    vm.takenCourseDetails = [];
    vm.user = User.getCurrentUser();
    for (var i in userCourses) {
      vm.takenCourseDetails.push(courseDataService.courseMap[userCourses[i].courseId]);
    }

    vm.takenCourseDetails = _.uniq(vm.takenCourseDetails);

    if (userCourses.length > 0) {
      vm.mostRecent = {
        'courseDetails': vm.takenCourseDetails[0],
        'userCourse': userCourses[0],
        'resumeLesson': '',
        'lessons': []
      }
    }
    var lessonsViewed = userCourses[0].lessons;
    var latestLessonViewedPermalink = lessonsViewed.latest
    vm.courseBaseUrl = '/courses/' + vm.mostRecent.courseDetails.code + '/lessons/';
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
          }
          else {
            // Normal scenario
            break;
            
          }

        }
        vm.mostRecent.resumeLesson = unit.lessons[index];
        for (var j = index; j < unit.lessons.length; j++) {
          unit.lessons[j].viewed = !!lessonsViewed[unit.lessons[j].permalinkName];
          vm.mostRecent.lessons.push(unit.lessons[j]);
        }
        console.log(vm.mostRecent);
          
        
          
        /*
         angular.forEach(unit.lessons, function (lesson) {
           if (!lessonsViewed[lesson.permalinkName] && !vm.mostRecent.resumeCourseUrl) {
             vm.mostRecent.resumeCourseUrl = courseBaseUrl + lesson.permalinkName;
             
           }
         })
         */





      });



  }
})();
