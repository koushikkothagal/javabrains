var BASE_PATH = 'data/courses/';
var OUTPUT_PATH = 'src/assets/data/';
var fs = require('fs');
var yamlhead = require('yamlhead');
var marked = require('marked');
// var prism = require('prismjs');
var highlight = require('highlight.js');
// var cheerio = require('cheerio');
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
  if (secs < 60) {
    return secs + ' seconds ';
  }
  var hours = Math.floor(secs / (60 * 60));

  var divisor_for_minutes = secs % (60 * 60);
  var minutes = Math.floor(divisor_for_minutes / 60);

  if (hours) {
    durationString = hours + ' hours ';
  }
  if (minutes && minutes !== 1) {
    durationString = minutes + ' minutes ';
  }
  if (minutes && minutes === 1) {
    durationString = minutes + ' minute ';
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

var prepareQuizContent = function(quiz, permalinkName) {
  for (var i = 0; i < quiz.length; i++) {
    var question = quiz[i];
    question.id = permalinkName + '-' + i;
    if (question.type === 'code') {
      var code = "```java" + "\n" + question.code + "\n ```";
      // var code = question.code;
      console.log(code);
      code = marked(code);
      var answerLength = question.correctAnswer.length;
      // var result = highlight.highlight('java', code, true);
      // code = result.value;
      // var $ = cheerio.load(code);
      
      // code = code.replace("\n", '\n\n');
      // var codeElement = prism.highlightElement($('pre')[0], prism.languages.clike);
      // code = codeElement.html();
      code = code.replace("######", '<input type="text" class="quiz-input-text" size="' + answerLength + '" ng-model="answer" ng-change="onChange({value: answer})"></input>');
      // code = code.replace("\n", '<br/>');
      console.log('Code is ');
      console.log(code);
      question.code = code;
    }
  }
  
}

var cleanLessonForCourseApi = function(lesson) {
  
    delete lesson.youtube;
    delete lesson.content;
    delete lesson.duration;
    delete lesson.content;
  
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
  lessonFileNames = _.sortBy(lessonFileNames, function(file) {
    var num = parseInt(file.split('.')[0]) * 100 + parseInt(file.split('.')[1]);
    console.log(file + ' ' + num);
    return num;
  });
  console.log(JSON.stringify(lessonFileNames));
  
  var prevPermalinkMap = generatePrevPermalinks(lessonFileNames);
  var nextPermalinkMap = generateNextPermalinks(lessonFileNames);

  var promiseArray = [];
  lessonFileNames.forEach(function (fileName) {
    console.log(fileName);
    // Split it based on dots (eg: 1.1.Introduction-To-Hibernate.md)
    var tokens = fileName.split('.');
    // The first token is unit number
    var unitNum = tokens[0];
    // The second token is lesson number
    var lessonNum = parseInt(tokens[1]);
    // The third token is title
    var permalinkName = tokens[2];
    // Get corresponding unit object
    var unit = courseInfo.units[unitNum];

    var path = BASE_PATH + courseName + '/' + fileName;
    
    var promise = openYamlFile(path)
      .then(function (response) {
        
        var yaml = response[0];
        console.log('processing ' + yaml.permalinkName);
        yaml.unitSlNo = unitNum + '.' + lessonNum;
        yaml = cleanYaml(yaml);
        yaml.slNo = lessonNum;
        if (!yaml.title) {
          yaml.title = permalinkName.replace(/-/gi, ' ');  
        }
        yaml.permalinkName = permalinkName;
        yaml.courseCode = courseName;
        yaml.courseName = courseInfo.name;
        var markup = response[1];
        if (yaml.prevLessonPermalinkName) {
          delete yaml.prevLessonPermalinkName;
        }
        var prevPermalink = prevPermalinkMap[fileName];
        if (prevPermalink) {
          yaml.prev = '/courses/' + courseInfo.code + '/lessons/' + prevPermalink;
        }

        if (yaml.nextLessonPermalinkName) {
          delete yaml.nextLessonPermalinkName;
        }
        var nextPermalink = nextPermalinkMap[fileName];
        if (nextPermalink) {
          yaml.next = '/courses/' + courseInfo.code + '/lessons/' + nextPermalink;
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
        if (yaml.type === 'quiz' && yaml.quizContent) {
          prepareQuizContent(yaml.quizContent, yaml.permalinkName);
        }
        
        // If this is the first time, init an empty lesson array
        if (!unit.lessons) {
          unit.lessons = [];
          unit.firstLesson = '/courses/' + courseInfo.code + '/lessons/' + yaml.permalinkName;
        }


        unit.lessons.push(yaml);
      })
      .catch(function(e) {
        console.log(e);
      });
      
    promiseArray.push(promise);
    console.log('promise array push');
  });
  console.log('q all pre');
  return Q.all(promiseArray)
    .then(function () {
      console.log('q all done');
      // Lessons in each unit may not necessarily be in order. Sort them
      _.forEach(courseInfo.units, function (unit) {
        unit.lessons = _.sortBy(unit.lessons, 'slNo');
      });
      return courseInfo;
    });
}


var buildCourseDataStructure = function (courseName) {

  var courseInfo = {};
  var files = fs.readdirSync(BASE_PATH + courseName);

  


  return generateCourseInfo(courseName)
    .then(function (result) {
      console.log('1');
      courseInfo = result;
    })
    .then(function () {
      console.log('2');
      return generateUnitMap(courseName, files);
    })
    .then(function (result) {
      console.log('3');
      courseInfo.units = result;
    })
    .then(function () {
      console.log('4');
      return fillLessonInfo(courseInfo, files);
    });
}
  ;

var writeCourseApi = function (courseInfo) {
  var path = OUTPUT_PATH + 'courses/' + courseInfo.code + '.json';
  mkdirSync(OUTPUT_PATH + 'courses');
  var totalDurationSeconds = 0;
  _.forEach(courseInfo.units, function (unit) {
    unit.lessons.forEach(function (lesson) {
      if (lesson.type === 'video') {
        totalDurationSeconds = totalDurationSeconds + lesson.duration;  
      }
      // cleanLessonForCourseApi(lesson); TODO: Not working
      
    });
  });
  courseInfo.durationText = secondsToTime(totalDurationSeconds);  // TODO: This isn't working
  fs.writeFileSync(path, JSON.stringify(courseInfo));
}

var getMiniLessonArray = function(unit) {
  var miniLessonArray = [];
  unit.lessons.forEach(function (lesson) {
      var miniLesson = {
        'title': lesson.title,
        'description': lesson.description,
        'permalinkName': lesson.permalinkName,
        'type': lesson.type,
        'slNo': lesson.slNo,
        'durationText': lesson.durationText
      };
      miniLessonArray.push(miniLesson);
  });
  return miniLessonArray;
}

var writeLessonApi = function (courseInfo) {
  mkdirSync(OUTPUT_PATH + 'courses');
  mkdirSync(OUTPUT_PATH + 'courses/' +  courseInfo.code);
  mkdirSync(OUTPUT_PATH + 'courses/' +  courseInfo.code + '/lessons');
  var BASE_PATH = OUTPUT_PATH + 'courses/' + courseInfo.code + '/lessons/';
  
  _.forEach(courseInfo.units, function (unit) {
    unit.lessons.forEach(function (lesson) {
      if (lesson.courseCode) {
        lesson.topic = lesson.courseCode.split('_')[0];  
      }
      
      lesson.unit = {
        lessons: getMiniLessonArray(unit)
      };
      var path = BASE_PATH + lesson.permalinkName + '.json';
      fs.writeFileSync(path, JSON.stringify(lesson));
    });
  });
}

/*
var courseNames =
  ['javaee_jaxrs',
    'javaee_jaxws',
    'spring_core',
    'spring_aop',
    'spring_data',
    'hibernate_intro',
    'hibernate_run',
    'maven_intro',
    'struts2_intro',
    'servlets_intro',
    'jsps_intro'
  ];

*/

// courseNames.forEach(function (courseName) {
//   console.log(courseName);

var courseName = 'buildsys_mavenintro';
buildCourseDataStructure(courseName)
  .then(function (courseInfo) {
    console.log('In then');
    var jsonString = JSON.stringify(courseInfo);
    var copy1 = JSON.parse(jsonString);
    var copy2 = JSON.parse(jsonString);
    writeCourseApi(copy1);
    writeLessonApi(copy2);


  })
  .catch(function(e, f) {
    console.log(e);
    console.log(f);
  });

// });


