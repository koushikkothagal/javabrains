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

/*
var data = {"content":[{"answers":[{"content":"<code>/getCategories</code>"},{"content":"<code>/fetchCategories?categoryId={categoryId}</code>"},{"content":"<code>/categories</code>"},{"content":"<code>/categories/{categoryId}</code>"}],"correctAnswer":3,"correctAnswerDescription":"The RESTful way to design a URL is to have the entity be a \"resource\" that's evident in the path.","correctAnswerMainTitle":"Great, you got it right!","description":"Let's say you need to build RESTful URIs for various resources in an online shopping site. Say you have <code>Category</code> as an entity that represents all the product categories on the site. What would be a RESTful URI to lookup a category with ID <code>categoryId</code>?","id":"DesigningResourceURIs-1","incorrectAnswerDescription":"Think of every entity as a \"resource\" in the path.","incorrectAnswerMainTitle":"Not quite."},{"answers":[{"content":"<code>/products</code>"},{"content":"<code>/products?id=25</code>"},{"content":"<code>/products/25</code>"},{"content":"<code>/products/id/25</code>"}],"correctAnswer":2,"correctAnswerDescription":"The resource ID is almost always a part of the URI.","correctAnswerMainTitle":"Great, you got it right!","description":"The site also has a <code>Product</code> entity. This has been designed to be a first level entity like <code>Category</code>. What would be a good RESTful URI for a product with ID 25?","id":"DesigningResourceURIs-2","incorrectAnswerDescription":"Think \"resources\". ","incorrectAnswerMainTitle":"Hmm, no."},{"answers":[{"content":"<code>/categories/products</code>"},{"content":"<code>/categories/products/{productId}</code>"},{"content":"<code>/categories/products/{categoryId}/{productId}</code>"},{"content":"<code>/categories/{categoryid}/products/{productid}</code>"}],"correctAnswer":3,"correctAnswerDescription":"Nested resource URIs follow the ID of the parent resource.","correctAnswerMainTitle":"Great, you got it right!","description":"If the <code>Product</code> entity were to have been designed as a sub-resource under the <code>Category</code> entity, what would the URI for <code>Product</code> be?","id":"DesigningResourceURIs-3","incorrectAnswerDescription":"Think of a sub resource URI as something that follows the unique parent resource.","incorrectAnswerMainTitle":"Hmm, no."}]}

// console.log(YAML.stringify(data));

fs.writeFileSync('../data/test.md',
    YAML.stringify(data)
    + '---'
    );
*/


openYamlFile('../data/courses/javaee_jaxrs/1.05.Resource-URIs.Quiz.md')
  .then(function(yaml) {
    // console.log(JSON.stringify(yaml));
    var code = yaml.quizContent[3].code;
    
    code = "```java" + "\n" + code + "\n ```";
    code = marked(code);
    code = code.replace("______", '</code><input type="text"></input><code>');
    console.log(code);
    
  })
  .catch(function(e) {
    console.log(e);
  });

