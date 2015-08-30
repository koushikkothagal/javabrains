var BASE_PATH = '../data/output/';
var fs = require('fs');
var yamlhead = require('yamlhead');
var marked = require('marked');
var _ = require('lodash');
var Q = require('q');

var openYamlFile = function (path) {
  return Q.nfcall(yamlhead, path)
  	.then(function (response) {
		console.log('function done');
		return response[0];	

	});
  
}

openYamlFile('../data/output/hibernate_intro/unit.1.md')
.then(function(response) {
	console.log('caller done');
	console.log(response);
})
