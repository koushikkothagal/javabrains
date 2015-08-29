var BASE_PATH = '../data/';
var fs = require('fs');
var YAML = require('json2yaml');
var os = require('os');
var units = require(BASE_PATH + 'units.json');

var mkdirSync = function (path) {
  try {
    fs.mkdirSync(path);
  } catch (e) {
    if (e.code != 'EEXIST') throw e;
  }
}



units.results.forEach(function(unit) {
  // var unit = units.results[index];
  // mkdirSync('../data/output');
  // mkdirSync('../data/output/' + unit.CourseName);
  // unit.Lesson.youtube = lesson.Lesson.youtube.trim()
  
  
  fs.writeFileSync('../data/output/' + unit.courseCode + '/unit.' + unit.unitNumber + '.md',
    YAML.stringify(unit)
    + '---'
    + os.EOL);
    }
});







  
  
