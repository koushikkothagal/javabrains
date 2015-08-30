var BASE_PATH = '../data/courses/';
var OUTPUT_PATH = '../src/assets/data/';
var fs = require('fs');
var yamlhead = require('yamlhead');
var marked = require('marked');
var _ = require('lodash');
var Q = require('q');

// String startsWith polyfill
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}

/**
 * Convert number of seconds into time object
 *
 * @param integer secs Number of seconds to convert
 * @return object
 */
function secondsToTime(secs) {
  var durationString;
  var hours = Math.floor(secs / (60 * 60));

  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  var divisor_for_seconds = divisor_for_minutes % 60;

  if (hours) {
    durationString = hours + ' hours ';
  }
  if (minutes) {
    durationString = minutes + ' minutes ';
  }

  return durationString.trim();
}


var mkdirSync = function (path) {
  try {
    fs.mkdirSync(path);
  } catch (e) {
    if (e.code != 'EEXIST') throw e;
  }
}



// Generate a map of file name (eg: 1.2.Setting-Up.md) to it's prev permalink (eg: Introduction-To-Hibernate)
var generatePrevPermalinks = function (files) {
  var prevPermalinkMap = {};
  // From the second file onwards
  for (var i = 1; i < files.length; i++) {
    // Get the previous file name from the list
    var fileName = files[i - 1];
    // Split it based on dots
    var tokens = fileName.split('.');
    // The 3rd token is the permalink name (eg: 1.1.Introduction-To-Hibernate.md)
    var permalinkName = tokens[2];
    // Map it to the current file in the loop
    prevPermalinkMap[files[i]] = permalinkName;

  }
  return prevPermalinkMap;
}
// Generate a map of file name (eg: 1.2.Setting-Up.md) to it's next permalink (eg: Understanding-Things)
var generateNextPermalinks = function (files) {
  var nextPermalinkMap = {};
  // From the first file until the last-but-one file
  for (var i = 0; i < files.length - 1; i++) {
    // Get the next file name from the list
    var fileName = files[i + 1];
    // Split it based on dots
    var tokens = fileName.split('.');
    // The 3rd token is the permalink name (eg: 1.1.Introduction-To-Hibernate.md)
    var permalinkName = tokens[2];
    // Map it to the current file in the loop
    nextPermalinkMap[files[i]] = permalinkName;
  }
  return nextPermalinkMap;
}

var getLessonFileNames = function (fileNames) {
  return _.partition(fileNames, function (fileName) {
    return !fileName.startsWith('unit') && !fileName.startsWith('course');
  })[0];
}

var getUnitFileNames = function (fileNames) {
  return _.partition(fileNames, function (fileName) {
    return fileName.startsWith('unit');
  })[0];
}

var openYamlFile = function (path) {
  return Q.nfcall(yamlhead, path);
}

function convertToHtml(markup) {
  return marked(markup);
}

var cleanYaml = function (yaml) {
  if (yaml.createdAt) {
    delete yaml.createdAt;
  }
  if (yaml.updatedAt) {
    delete yaml.updatedAt;
  }
  if (yaml.objectId) {
    delete yaml.objectId;
  }
  return yaml;
}

var generateCourseInfo = function (courseName) {
  var courseFileName = BASE_PATH + courseName + '/course.md';
  return openYamlFile(courseFileName)
    .then(function (response) {
      var yaml = response[0];
      yaml = cleanYaml(yaml);
      return yaml;
    })
}

var generateUnitMap = function (courseName, fileNames) {
  var unitFileNames = getUnitFileNames(fileNames);
  var unitMap = {};
  var promiseArray = [];
  unitFileNames.forEach(function (unitFileName) {

    var unitNum = unitFileName.split('.')[1];
    var path = BASE_PATH + courseName + '/' + unitFileName;
    var promise = openYamlFile(path)
      .then(function (response) {

        var yaml = response[0];
        if (yaml.createdAt) {
          delete yaml.createdAt;
        }
        if (yaml.updatedAt) {
          delete yaml.updatedAt;
        }
        if (yaml.objectId) {
          delete yaml.objectId;
        }
        unitMap[unitNum] = yaml;

      });
    promiseArray.push(promise);


  });

  return Q.all(promiseArray)
    .then(function () {

      return unitMap;
    });

}

var fillLessonInfo = function (courseInfo, fileNames) {
  var lessonFileNames = getLessonFileNames(fileNames);
  var prevPermalinkMap = generatePrevPermalinks(lessonFileNames);
  var nextPermalinkMap = generateNextPermalinks(lessonFileNames);

  var promiseArray = [];
  lessonFileNames.forEach(function (fileName) {
    // Split it based on dots (eg: 1.1.Introduction-To-Hibernate.md)
    var tokens = fileName.split('.');
    // The first token is unit number
    var unitNum = tokens[0];
    // Get corresponding unit object
    var unit = courseInfo.units[unitNum];

    var path = BASE_PATH + courseName + '/' + fileName;
    var promise = openYamlFile(path)
      .then(function (response) {
        var yaml = response[0];
        yaml = cleanYaml(yaml);
        var markup = response[1];
        if (yaml.prevLessonPermalinkName) {
          delete yaml.prevLessonPermalinkName;
        }
        var prevPermalink = prevPermalinkMap[fileName];
        if (prevPermalink) {
          yaml.prev = '/courses/' + courseInfo.code + '/' + prevPermalink;
        }

        if (yaml.nextLessonPermalinkName) {
          delete yaml.nextLessonPermalinkName;
        }
        var nextPermalink = nextPermalinkMap[fileName];
        if (nextPermalink) {
          yaml.next = '/courses/' + courseInfo.code + '/' + nextPermalink;
        }

        var html = convertToHtml(markup);
        if (html) {
          yaml.content = html;
        }

        if (!yaml.type) {
          yaml.type = 'video';
        }
        if (yaml.type === 'video') {
          yaml.durationText = secondsToTime(yaml.duration);
        }
        // If this is the first time, init an empty lesson array
        if (!unit.lessons) {
          unit.lessons = [];
          unit.firstLesson = '/courses/' + courseInfo.code + '/' + yaml.permalinkName;
        }
        

        unit.lessons.push(yaml);
      });
    promiseArray.push(promise);
  });
  return Q.all(promiseArray)
    .then(function () {
      return courseInfo;
    });
}


var buildCourseDataStructure = function (courseName) {

  var courseInfo = {};
  var files = fs.readdirSync(BASE_PATH + courseName);
  files.sort();


  return generateCourseInfo(courseName)
    .then(function (result) {
      courseInfo = result;
    })
    .then(function () {
      return generateUnitMap(courseName, files);
    })
    .then(function (result) {
      courseInfo.units = result;
    })
    .then(function () {
      return fillLessonInfo(courseInfo, files);
    });
}
;

var writeCourseApi = function(courseInfo) {
  var path = OUTPUT_PATH + 'courses/' + courseInfo.code + '.json';
  mkdirSync(OUTPUT_PATH + 'courses');
  var totalDurationSeconds = 0;
  _.forEach(courseInfo.units, function(unit) {
    unit.lessons.forEach(function(lesson) {
      totalDurationSeconds = totalDurationSeconds + lesson.duration;
    });
  });
  courseInfo.durationText = secondsToTime(totalDurationSeconds);
  fs.writeFileSync(path, JSON.stringify(courseInfo));
}


var courseName = 'hibernate_intro';
buildCourseDataStructure(courseName)
  .then(function (courseInfo) {
    var jsonString = JSON.stringify(courseInfo);
    var copy1 = JSON.parse(jsonString);
    // var copy2 = JSON.parse(jsonString);
    writeCourseApi(copy1);
    // writeLessonApi(copy2);


  });


/*

var result = {};
// For each file in the directory
for (var index in files) {
  // Get the file name
  var fileName = files[index];
  // Split it based on dots (eg: 1.1.Introduction-To-Hibernate.md)
  var tokens = fileName.split('.');
  // The first token is unit number
  var unitNum = tokens[0];
  if (!result[unitNum]) {
    // First lesson of the unit in the loop. Initialize a unit object in the final results object
    result[unitNum] = {
      lessons: []
    };
  }



  yamlhead(BASE_PATH + 'hibernate_intro/' + files[index], function (err, yaml, markup) {
    if (!err) {
      // Add a content property and convert the markdown to JSON
      var html = convertToHtml(markup);
      if (html) {
        yaml.content = html;
      } 
      // The prev and next permalinks are all available with the key being the file name
      // So, recreate the file name from the unitSlNo, permalinkName and the .md extension
      var key = yaml.unitSlNo + '.' + yaml.permalinkName + '.md';
      // Look up perv and next permalinks from the corresponding maps and add them to the JSON
      yaml.prevPermalinkName = prevPermalinkMap[key];
      yaml.nextPermalinkName = nextPermalinkMap[key];
      // Get the unit number
      var tokens2 = yaml.unitSlNo.toString().split('.');
      var unitNum2 = tokens2[0];
      // Add the JSONified object to the lesson array of the right unit in the final results object
      result[unitNum2].lessons.push(yaml);
    }
  });

}

// Wait for the callbacks to complete. Yeah, I know. There's surely a better way!
setTimeout(function () {
  fs.writeFileSync(BASE_PATH + 'hibernate_intro/out.js', JSON.stringify(result));
}, 2000)

*/



