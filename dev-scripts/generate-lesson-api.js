var BASE_PATH = '../data/output/';
var fs = require('fs');
var yamlhead = require('yamlhead');
var marked = require('marked');

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


var files = fs.readdirSync(BASE_PATH + 'hibernate_intro');
files.sort();
var prevPermalinkMap = generatePrevPermalinks(files);
var nextPermalinkMap = generateNextPermalinks(files);
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

function convertToHtml(markup) {
  return marked(markup);
}



