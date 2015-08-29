var BASE_PATH = '../data/';
var fs = require('fs');
var YAML = require('json2yaml');
var os = require('os');
var lessonApi = require(BASE_PATH + 'LessonApi.json');

var mkdirSync = function (path) {
  try {
    fs.mkdirSync(path);
  } catch (e) {
    if (e.code != 'EEXIST') throw e;
  }
}

var request = require('request');

lessonApi.results.forEach(function(lesson) {
  // var lesson = lessonApi.results[index];
  mkdirSync('../data/output');
  mkdirSync('../data/output/' + lesson.CourseName);
  lesson.Lesson.youtube = lesson.Lesson.youtube.trim()
  
  request('https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=' + lesson.Lesson.youtube.trim() + '&key=AIzaSyCDYtXtbmEm4IX8sv9VjjzZI5CVaiZoRlI', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      
      try {
      var timeString = JSON.parse(body).items[0].contentDetails.duration; // Show the HTML for the Google homepage.
      var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
      var hours = 0, minutes = 0, seconds = 0, totalseconds;

      if (reptms.test(timeString)) {
        var matches = reptms.exec(timeString);
        if (matches[1]) hours = Number(matches[1]);
        if (matches[2]) minutes = Number(matches[2]);
        if (matches[3]) seconds = Number(matches[3]);
        totalseconds = hours * 3600 + minutes * 60 + seconds;
        lesson.Lesson.duration = totalseconds;
      }
      }
      catch (e) {
        console.log('Error in ' + lesson.Lesson.permalinkName);
      }
      
      fs.writeFileSync('../data/output/' + lesson.CourseName + '/' + lesson.Lesson.unitSlNo + '.' + lesson.Lesson.permalinkName + '.md',
    YAML.stringify(lesson.Lesson)
    + '---'
    + os.EOL);
    }
  });
  
});







  
  
