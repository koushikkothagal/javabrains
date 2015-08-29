(function() {
  'use strict';

  angular
    .module('javabrains')
    .filter('coursefilter', CourseFilter);

  function CourseFilter() {
    return function (courses, searchCriteria) {
        
        
        // Flatten searchCriteria.tags object to get an array of strings  
        var tags = _.values(searchCriteria.tags);
        
        var items = {
            searchCriteria: searchCriteria,
            out: []
        };
        angular.forEach(courses, function (value, key) {
            // Identify common tags between the searchCriteria and the current record
               var commonTags = _.intersection(value.tags, tags);
            // If there are either other common tags, or if the level matches, pick the record
               if ((searchCriteria.tags["All"] === "All" || commonTags.length) && searchCriteria.level[value.level]) {
                    items.out.push(value);
                    return;
                }
                  
            
            
            /*
                // If the topic filtered isn't 'All' or is something that the current record doesn't have tagged, move on. 
               if (searchCriteria.tags.topic !== 'All' && _.indexOf(value.tags, searchCriteria.tags.topic) === -1) {
                   return;
               }
               // Identify common tags between the searchCriteria and the current record
               var commonTags = _.intersection(value.tags, tags);
               // Remove the topic tag from this common tag list, if exists. We've already handled that
               _.pull(commonTags, searchCriteria.tags.topic);
               // If there are either other common tags, or if the level matches, pick the record
               if (commonTags.length && searchCriteria.level[value.level]) {
                    items.out.push(value);
                    return;
                }
                
                
                */
        }, items);
        return items.out;
    };
  }

})();
