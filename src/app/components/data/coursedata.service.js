(function() {
  'use strict';

  angular
    .module('javabrains.data')
    .service('courseDataService', CourseDataService);

  
  function CourseDataService() {

    this.topics = [
		{
			'code': 'spring',
			'color': '#4CAE50',
			'name': 'Spring Framework',
			'desc': 'Learn about one of the most popular application frameworks in Java today.',
			'tech': 'java',
			'level': 'Beginner', 
			'tags': ['Java', 'Spring'],
			'courses': 3
			
		},
		{
			'code': 'javaee',
			'name': 'Java EE',
			'color': '#DD3C43',
			'desc': 'Enterprise Java programming courses.', 
			'tech': 'java',
			'level': 'Beginner',
			'tags': ['Java', 'Java EE'],
			'courses': 2
		},
		{
			'code': 'maven',
			'name': 'Maven',
			'color': '#e74c3c',
			'desc': 'Understand and use Maven to simplify your application\'s build and dependency management.', 
			'tech': 'java',
			'level': 'Intermediate',
			'tags': ['Java', 'Maven'],
			'courses': 1
		},
		{
			'code': 'struts2',
			'name': 'Struts 2',
			'color': '#2980b9',
			'desc': 'Learn MVC concepts and write MVC web applications with the Struts 2 framework.', 
			'tech': 'java',
			'level': 'Advanced',
			'tags': ['Java', 'Struts2'],
			'courses': 1
			
		},
		{ 
			'code': 'hibernate', 
			'name': 'Hibernate',
			'color': '#f1c40f',
			'desc': 'Understand Object Relational Mapping and write robust data applications using this ORM framework.',
			'tech': 'java',
			'level': 'Advanced',
			'tags': ['Java', 'Hibernate'],
			'courses': 2
		},
		{ 
			'code': 'servlets', 
			'name': 'Servlets and JSPs',
			'color': '#34495e',
			'desc': 'Learn server side web programming in Java.',
			'tech': 'java',
			'level': 'Advanced',
			'tags': ['Java', 'Servlets', 'JSP'],
			'courses': 2
		},
		{ 
			'code': 'angularjs', 
			'name': 'AngularJS (Coming soon)',
			'color': '#8e44ad',
			'desc': 'Learn about this client side application framework and build rich single page applications.',
			'tech': 'js',
			'level': 'Advanced',
			'tags': ['Javascript', 'AngularJS'],
			'courses': 0
		}
	];
	
	this.topicMap = {};
	for (var i=0; i< this.topics.length; i++) {
		this.topicMap[this.topics[i].code] = this.topics[i];
	}
	
	
	
	this.courses = [
				{ slNo: 1, code: 'javaee_jaxrs', topic: 'javaee', name: 'Developing REST APIs with JAX-RS',
						'desc': 'This course introduces you to RESTful Web Services using the JAX-RS standard specification. You will learn what RESTful web services are and how to write them. You will write a sample RESTful web service from scratch, design the APIs, implement it using Jersey and run it on Tomcat. ',
						'shortdesc': 'Learn how to build RESTful services using the JAX-RS specification. You\'ll build a REST API application using Jersey.',
						'level': 'Beginner', 
						'img': 'https://i.ytimg.com/vi/xkKcdK1u95s/mqdefault.jpg',
						'tags': ['Java', 'Java EE']
				},
				{ slNo: 2, code: 'javaee_jaxws', topic: 'javaee', name: 'Developing SOAP Web Services with JAX-WS',
						'desc': 'This course introduces you to SOAP Web Services using the JAX-WS standard specification. You will learn what SOAP web services are and how to write them. You will be writing a web service application, deploying, running and testing it on Glassfish. You will also learn to consume SOAP web services.',
						'level': 'Beginner', 
						'img': 'https://i.ytimg.com/vi/Zx6NuO6niFI/mqdefault.jpg',
						'tags': ['Java', 'Java EE']
				},
				{ slNo: 3, code: 'spring_core', topic: 'spring', name: 'Learning Spring Core',
						'desc': 'This course provides an introduction to the Spring framework. You will understand the concepts of dependency injection, understand how the core Spring framework works and how to write an application using it.',
						'level': 'Beginner', 
						'img': 'https://i.ytimg.com/vi/WUqyoH_G4Ko/mqdefault.jpg',
						'tags': ['Java', 'Spring']
						
				},
				{ slNo: 4, code: 'spring_aop', topic: 'spring', name: 'Understanding Spring AOP',
						'desc': 'This course introduces the concepts of Aspect Oriented Programming and Spring AOP. You will learn to write Aspects in Java using Spring AOP and also understand the terminologies used in AOP along the way.',
						'level': 'Advanced', 
						'img': 'https://i.ytimg.com/vi/4P0TME-AbSw/mqdefault.jpg',
						'tags': ['Java', 'Spring']
				},

				{ slNo: 5, code: 'spring_data', topic: 'spring', name: 'Data access in Spring',
						'desc': 'Almost every application needs to access data. In this course, you will learn about Spring support for data access from relational databases.',
						'level': 'Intermediate', 
						'tags': ['Java', 'Spring' , 'Hibernate'],
						'img': 'https://i.ytimg.com/vi/eR_JFtqyNL4/mqdefault.jpg'
				},

				{ slNo: 6, code: 'hibernate_intro', topic: 'hibernate', name: 'Introduction To Hibernate',
						'desc': 'This course provides an introduction to the Hibernate ORM framework. You will understand the concept of Object Relational Mapping (ORM). You will learn to use Hibernate to write Java applications that connect to a relational database. You will also learn various JPA annotations that let you map classes to relational models.',
						'level': 'Beginner',
						'img': 'https://i.ytimg.com/vi/Yv2xctJxE-w/mqdefault.jpg',
						'tags': ['Java', 'Hibernate']
				},
				{ slNo: 7, code: 'hibernate_run', topic: 'hibernate', name: 'Hibernate - APIs and Runtime',
						'desc': 'This course explores the runtime aspects of Hibernate. You\'ll understand how to perform Create, Read, Update and Delete operations, implement Hibernate APIs, understand the life cycle of entities, write queries in HQL, the Hibernate Query Language and implement caching.',
						'level': 'Intermediate', 
						'img': 'https://i.ytimg.com/vi/sjZGFHEdD4M/mqdefault.jpg',
						'tags': ['Java', 'Hibernate']
				},
				{ slNo: 8, code: 'maven_intro', topic: 'maven', name: 'Introduction to Maven',
						'desc': 'This course is an introduction to the basic features of Apache Maven. You will learn what Maven is and how it helps managing dependencies in your Java project. You will understand POM configuration, build phases and use plugins.',
						'level': 'Beginner', 
						'img': 'https://i.ytimg.com/vi/al7bRZzz4oU/mqdefault.jpg',
						'tags': ['Java', 'Maven']
				},
				{ slNo: 9, code: 'struts2_intro', topic: 'struts2', name: 'Beginning Struts 2',
						'desc': 'This course provides an introduction to the Struts 2 framework. You will understand the concepts of MVC, and learn to write a web application from scratch using Struts 2.',
						'level': 'Beginner', 
						'img': 'https://i.ytimg.com/vi/9BvQpf7JcOI/mqdefault.jpg',
						'tags': ['Java', 'Struts 2']
				},
				{ slNo: 10, code: 'servlets_intro', topic: 'servlets', name: 'Introduction to Servlets',
						'desc': 'This course provides an introduction to Java Servlet technology. You will learn how to develop Java web applications using Servlets. you will also understand the life cycle of Servlets, how they work and how to configure them.',
						'level': 'Beginner', 
						'img': 'https://i.ytimg.com/vi/b42CJ0r-1to/mqdefault.jpg',
						'tags': ['Java', 'Servlets and JSPs']
				},
				{ slNo: 11, code: 'jsps_intro', topic: 'servlets', name: 'Java Server Pages',
						'desc': 'This course covers writing and implementing Java Server Pages (JSPs) on a servlet container. You will understand what JSPs are, how they are related to servlets and how to write view logic using them.',
						'level': 'Beginner', 
						'img': 'https://i.ytimg.com/vi/zk_zEp-mtvQ/mqdefault.jpg',
						'tags': ['Java', 'Servlets and JSPs']
				}
				/*
				,
				{ slNo: 12, code: 'javaee_advjaxrs', topic: 'javaee', name: 'Advanced JAX-RS',
						'desc': 'This course covers more advanced concepts of JAX-RS. You will learn some important concepts related to resource life cycle, authentication and client APIs. You will also implement framework extensions like converters, message readers and writers. ',
						'level': 'Advanced', 
						'img': 'https://i.ytimg.com/vi/EOdvmGVdndA/mqdefault.jpg',
						'tags': ['Java', 'Java EE'],
						objectives: [
								'Bootstrapping JAX-RS applications with Application class',
								'Understanding resource life cycles',
								'Implementing ParamConverters, MessageBodyReaders and MessageBodyWriters',
								'Building a REST API client in Java using JAX-RS',
								'Implementing REST API Authentication',
								'Testing your REST API project'
									]
				},
				*/

			];
	this.courseMap = {};
	for (var i=0; i< this.courses.length; i++) {
		this.courseMap[this.courses[i].code] = this.courses[i];
	}
	
	
  }

})();