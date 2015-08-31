var BASE_PATH = '../data/output/';
var fs = require('fs');
var yamlhead = require('yamlhead');
var marked = require('marked');
var YAML = require('json2yaml');
var _ = require('lodash');
var Q = require('q');

var openYamlFile = function (path) {
  return Q.nfcall(yamlhead, path)
  	.then(function (response) {
		console.log('function done');
		return response[0];	

	});
  
}
var data = {"content":[{"answers":[{"content":"Representational State Transfer"},{"content":"Real-time Embedded Systems Testbed"},{"content":"ReStructuredText"},{"content":"None of the above"}],"correctAnswer":0,"correctAnswerDescription":"REST is short for REpresentational State Transfer","correctAnswerMainTitle":"Great, you got it right!","description":"What does REST stand for?","id":"REST-And-HTTP-1","incorrectAnswerDescription":"Rewatch the video if you are not sure!","incorrectAnswerMainTitle":"Not quite."},{"answers":[{"content":"GET"},{"content":"PUT"},{"content":"POST"},{"content":"DELETE"}],"correctAnswer":0,"correctAnswerDescription":"GET is the method used to request data from the server","correctAnswerMainTitle":"Great, you got it right!","description":"Which one of these HTTP methods would you use to make the client request data from the server?","id":"REST-And-HTTP-2","incorrectAnswerDescription":"The key is in the method name!","incorrectAnswerMainTitle":"Hmm, no."},{"answers":[{"content":"GET"},{"content":"HEAD"},{"content":"POST"},{"content":"OPTIONS"}],"correctAnswer":2,"correctAnswerDescription":"POST is the only option among the above choices that you can use to submit data.","correctAnswerMainTitle":"Great, you got it right!","description":"Which one of these HTTP methods would you use to make the client submit data to the server?","id":"REST-And-HTTP-3","incorrectAnswerDescription":"The key is in the method name!","incorrectAnswerMainTitle":"Hmm, no."},{"answers":[{"content":"200"},{"content":"300"},{"content":"400"},{"content":"500"}],"correctAnswer":3,"correctAnswerDescription":"Server errors usually return status 500.","correctAnswerMainTitle":"Great, you got it right!","description":"Let's say you handle a request in your web service and there is an error while you process it on the server. Which status code would you return?","id":"REST-And-HTTP-4","incorrectAnswerDescription":"What is the common error code for an internal server error. ","incorrectAnswerMainTitle":"Hmm, no."},{"answers":[{"content":"202"},{"content":"303"},{"content":"404"},{"content":"500"}],"correctAnswer":2,"correctAnswerDescription":"When something requested to the API isn't available, APIs usually return status 404.","correctAnswerMainTitle":"Great, you got it right!","description":"Let's say you get a request for an item that's not available in the database. Which status code would you return?","id":"REST-And-HTTP-5","incorrectAnswerDescription":"What's the status code for 'Not found'?","incorrectAnswerMainTitle":"Hmm, no."},{"answers":[{"content":"text/xml"},{"content":"xml/html"},{"content":"xml/xhtml"},{"content":"None of the above"}],"correctAnswer":0,"correctAnswerDescription":"The content type header for XML content is usually text/xml.","correctAnswerMainTitle":"Great, you got it right!","description":"When returning response in XML format, what would be the content type header value you'd need to set in the response?","id":"REST-And-HTTP-6","incorrectAnswerDescription":"","incorrectAnswerMainTitle":"Try again."},{"answers":[{"content":"text/json"},{"content":"xml/json"},{"content":"application/json"},{"content":"None of the above"}],"correctAnswer":2,"correctAnswerDescription":"The content type header for JSON content is usually application/json.","correctAnswerMainTitle":"Great, you got it right!","description":"When returning response in JSON format, what would be the content type header value you'd need to set in the response?","id":"REST-And-HTTP-7","incorrectAnswerDescription":"","incorrectAnswerMainTitle":"Try again."}]};

// console.log(YAML.stringify(data));
/*
fs.writeFileSync('../data/test.md',
    YAML.stringify(data)
    + '---'
    );
*/
/*
openYamlFile('../data/courses/javaee_jaxrs/1.03.HTTP-Concepts.Quiz.md')
  .then(function(yaml) {
    console.log(JSON.stringify(yaml));
  })
  .catch(function(e) {
    console.log(e);
  });
*/  
yamlhead('../data/courses/javaee_jaxrs/1.03.HTTP-Concepts.md', function (err, yaml, data) {
  
    console.log(err);
    console.log(yaml);
    console.log(data);
  }  );