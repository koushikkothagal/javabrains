var BASE_PATH = '../data/';
var fs = require('fs');
var YAML = require('json2yaml');
var os = require('os');
var courses = require(BASE_PATH + 'courses.json');

var mkdirSync = function (path) {
  try {
    fs.mkdirSync(path);
  } catch (e) {
    if (e.code != 'EEXIST') throw e;
  }
}



courses.results.forEach(function (course) {
  // var course = courses.results[index];
  // mkdirSync('../data/output');
  // mkdirSync('../data/output/' + course.CourseName);
  // course.Lesson.youtube = lesson.Lesson.youtube.trim()
  
  
  fs.writeFileSync('../data/output/' + course.code + '/course.md',
    YAML.stringify(course)
    + '---'
    + os.EOL);
}
  );







  
  
