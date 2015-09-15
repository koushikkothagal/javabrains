'use strict';

angular.module('javabrains')
	.service('UserData', function (ENDPOINT_URI, User, ParseData, $q) {
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
		}

		service.getAndMarkLessonsViewed = function (courseId, permalinkName) {
			if (!User.getCurrentUser()) {
				return $q.when(null);
			}
			return ParseData.getAll('UserLessons',
				[
					['EQ', 'courseId', courseId]
				])
				.then(function (results) {
					var lessonsViewed = {
						'totalPoints': 0
					};
					var saved = false;
					if (results) {
						for (var i = 0; i < results.length; i++) {
							
							var lessonViewed = ParseData.unParseObject(results[i]);
							lessonsViewed[lessonViewed.permalinkName] = true;
							lessonsViewed.totalPoints += lessonViewed.points;
							if (permalinkName && lessonViewed.permalinkName === permalinkName) {
								ParseData.saveObject(results[i],
									{
										'courseId': courseId,
										'user': User.getCurrentUser().email
									});
								saved = true;
							}
						}



					}
					if (permalinkName && !saved) {
						ParseData.save('UserLessons',
							{
								'courseId': courseId,
								'user': User.getCurrentUser().email,
								'permalinkName': permalinkName,
								'points': 10 // Default points for lesson: 10
							});
					}
					// TODO: (maybe not) add the newly saved 10 points into the lessonsViewed object returned below. I'll be 10 points short (i.e., not including points for the lesson just viewed)
					return lessonsViewed;

				});


		}


		service.markLessonViewed = function (courseId, permalinkName) {
			if (!User.getCurrentUser()) {
				return;
			}
			ParseData.getFirst('UserLessons',
				[
					['EQ', 'courseId', courseId],
					['EQ', 'permalinkName', permalinkName]
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
						// Default points for lesson: 10
						ParseData.save('UserLessons',
							{
								'courseId': courseId,
								'user': User.getCurrentUser().email,
								'permalinkName': permalinkName,
								
							});
					}

				})
				.catch(function () {
					// TODO: Some Analytics call to log error
				});
		};
		
		service.submitQuizData = function(lesson, quizData) {
			console.log(lesson);
			console.log(quizData);
		}



	});
