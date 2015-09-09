'use strict';

angular.module('javabrains')
	.service('ParseData', function ($q) {

		var service = this;

		var getQuery = function (tableName, queryParams) {
			var DataClass = Parse.Object.extend(tableName);
			var query = new Parse.Query(DataClass);
			for (var i = 0; i < queryParams.length; i++) {
				var queryParam = queryParams[i];

				if (queryParam[0] === "EQ") {
					query.equalTo(queryParam[1], queryParam[2]);
				}
				else if (queryParam[0] === "NE") {
					query.notEqualTo(queryParam[1], queryParam[2]);
				}
				else if (queryParam[0] === "GT") {
					query.greaterThan(queryParam[1], queryParam[2]);
				}
				else if (queryParam[0] === "GE") {
					query.greaterThanOrEqualTo(queryParam[1], queryParam[2]);
				}
				else if (queryParam[0] === "LT") {
					query.lessThan(queryParam[1], queryParam[2]);
				}
				else if (queryParam[0] === "LE") {
					query.lessThanOrEqualTo(queryParam[1], queryParam[2]);
				}
				else if (queryParam[0] === "ASC") {
					query.ascending(queryParam[1]);
				}
				else if (queryParam[0] === "DESC") {
					query.descending(queryParam[1]);
				}


			}
			return query;

		};


		service.getAll = function (tableName, queryParams) {
			var query = getQuery(tableName, queryParams);
			var deferred = $q.defer();
			query.find()
				.then(function (results) {
					return deferred.resolve(results);
				},
					function (error) {
						deferred.reject(error);
					});
			return deferred.promise;
		};

		service.getFirst = function (tableName, queryParams) {
			var query = getQuery(tableName, queryParams);
			var deferred = $q.defer();
			query.first()
				.then(function (results) {
					return deferred.resolve(results);
				},
					function (error) {
						deferred.reject(error);
					});
			return deferred.promise;
		};


		service.save = function (tableName, obj) {
			var DataClass = Parse.Object.extend(tableName);
			var parseObj = new DataClass();
			for (var prop in obj) {
				if( obj.hasOwnProperty( prop ) ) {
					parseObj.set(prop, obj[prop]);
				}
			}
			parseObj.setACL(new Parse.ACL(Parse.User.current()));
			
			var deferred = $q.defer();
			
			parseObj.save(null)
				.then(
					function (success) {
						return deferred.resolve(success);
					},
					function (error) {
						deferred.reject(error);
					}
					);
			return deferred.promise;
		}
		
		
		service.saveObject = function (parseObj, newObj) {
			for (var prop in newObj) {
				if( newObj.hasOwnProperty( prop ) ) {
					parseObj.set(prop, newObj[prop]);
				}
			}
			parseObj.setACL(new Parse.ACL(Parse.User.current()));
			
			var deferred = $q.defer();
			
			parseObj.save(null)
				.then(
					function (success) {
						return deferred.resolve(success);
					},
					function (error) {
						deferred.reject(error);
					}
					);
			return deferred.promise;
		}
		
		service.unParseArray = function(array) {
			return _.map(array, function(item) {
				return item.attributes;
			});
		}
		

	});
	