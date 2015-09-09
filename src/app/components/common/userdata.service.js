'use strict';

angular.module('javabrains')
	.service('UserData', function (ENDPOINT_URI, $firebaseArray, User, ParseData) {
		var service = this;

		service.getStartedCourses = function (userId) {
			return ParseData.getAll('UserCourses', [
				['DESC', 'updatedAt']
			])
				.then(function (result) {
					return ParseData.unParseArray(result);
				})
		}

		service.markCourseStarted = function (courseId) {
			if (!User.getCurrentUser()) {
				return;
			}
			ParseData.getFirst('UserCourses',
				[
					['EQ', 'courseId', courseId]
				])
				.then(function (result) {
					if (result) {
						ParseData.saveObject(result,
						{
							'courseId': courseId,
							'user': User.getCurrentUser().email
						});	
					}
					else {
						ParseData.save('UserCourses',
						{
							'courseId': courseId,
							'user': User.getCurrentUser().email
						});	
					}
					
				})
				.catch(function () {
					// TODO: Some Analytics call to log error
				});
			
			
			
			
			
			/*
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
				*/
		}
	});
