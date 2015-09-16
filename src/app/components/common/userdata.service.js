'use strict';

angular.module('javabrains')
	.service('UserData', function (ENDPOINT_URI, User, ParseData, $q) {
		var service = this;

		service.getStartedCourses = function (userId) {
			return ParseData.getAll('UserLessons', [
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
			var lessons = {
				'totalPoints': 0
			};
			if (!User.getCurrentUser()) {
				return $q.when(lessons);
			}

			return ParseData.getFirst('UserLessons',
				[
					['EQ', 'courseId', courseId]
				])
				.then(function (result) {
					//var lessonsViewed = {
					//	'totalPoints': 0
					//};
					var totalPoints = 0;
					var saved = false;

					if (result) {
						var lessonsViewed = ParseData.unParseObject(result);
						lessons = lessonsViewed.lessons;
						console.log(lessonsViewed.lessons);

						totalPoints = _.reduce(lessons, function (total, n, key) {
							// Maybe a property doesn't have "points", like the totalPoints property for example
							if (lessonsViewed.lessons[key] && lessonsViewed.lessons[key].points) {
								total += lessonsViewed.lessons[key].points;
							}
							return total;

						}, 0);
						lessons.totalPoints = totalPoints;
						if (permalinkName && !lessons[permalinkName]) {
							lessons[permalinkName] = {
								'points': 10
							};
							lessons.latest = permalinkName;
							ParseData.saveObject(result,
								{
									'lessons': lessons
								});
							saved = true;
						}
						
						/*
						for (var i = 0; i < results.length; i++) {
							
							var lessonViewed = ParseData.unParseObject(results[i]);
							lessonsViewed[lessonViewed.permalinkName] = true;
							lessonsViewed.totalPoints += lessonViewed.points;
							if (permalinkName && lessonViewed.permalinkName === permalinkName) {
								
								saved = true;
							}
						}


						*/
					}
					if (permalinkName && !saved) {

						lessons[permalinkName] = {
							'points': 10 // Default points for lesson: 10
						};
						lessons.latest = permalinkName;
						ParseData.save('UserLessons',
							{
								'courseId': courseId,
								'user': User.getCurrentUser().email,
								'lessons': lessons
							});
					}
					// TODO (maybe not):  add the newly saved lessons object into the lessonsViewed object returned below. It'll be 10 points short (i.e., not including points for the lesson just viewed)
					return lessons;

				});


		}


		

		service.submitQuizData = function (lesson, quizData) {
			console.log(lesson);
			console.log(quizData);
		}



	});
