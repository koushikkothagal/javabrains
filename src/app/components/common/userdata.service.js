'use strict';

angular.module('javabrains')
	.service('UserData', function (ENDPOINT_URI, $firebaseArray, User) {
		var service = this;

		service.getStartedCourses = function (userId) {
			var ref = new Firebase(ENDPOINT_URI + 'users/' + userId + 'courses/')
		}

		service.markCourseStarted = function (courseId) {
			var courseUri = ENDPOINT_URI + 'users/' + User.getCurrentUser() + '/courses/';
			var ref = new Firebase(courseUri)
				.orderByChild('courseId')
				.equalTo(courseId);
			var courses = $firebaseArray(ref);
			courses.$loaded()
				.then(function () {
					console.log(courses);
					if (!courses.length) {
						courses.$add(
							{
								'courseId': courseId,
								'startDate': Firebase.ServerValue.TIMESTAMP,
								'lastViewed': Firebase.ServerValue.TIMESTAMP
							}
							);
					}
					else {
						courses[0].lastViewed = Firebase.ServerValue.TIMESTAMP;
						courses.$save(0);

					}
				});
		}
	});
