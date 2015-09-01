---
  content: 
    - 
      answers: 
        - 
          content: "<code>/products</code>"
        - 
          content: "<code>/products?action=GET</code>"
        - 
          content: "<code>/getAllProducts</code>"
        - 
          content: "<code>/products/all</code>"
      correctAnswer: 0
      correctAnswerDescription: "At the root resource level, getting a \"collection\" is just the plural resource name!"
      correctAnswerMainTitle: "Great, you got it right!"
      description: "The site also has a <code>Product</code> entity. This has been designed to be a first level entity like <code>Category</code>. What would be a good RESTful URI for all products?"
      id: "HTTPMethods-1"
      incorrectAnswerDescription: ""
      incorrectAnswerMainTitle: "Try again!"
    - 
      answers: 
        - 
          content: "<code>DELETE -> /products</code>"
        - 
          content: "<code>DELETE -> /products/id</code>"
        - 
          content: "<code>/products/id/delete</code>"
        - 
          content: "<code>None of the above</code>"
      correctAnswer: 1
      correctAnswerDescription: ""
      correctAnswerMainTitle: "Great, you got it right!"
      description: "Which of these is a good choice for deleting a Product instance?"
      id: "HTTPMethods-2"
      incorrectAnswerDescription: ""
      incorrectAnswerMainTitle: "Hmm, no."
    - 
      answers: 
        - 
          content: "<code>POST -> /products</code>"
        - 
          content: "<code>POST -> /products/id</code>"
        - 
          content: "<code>PUT -> /products/id</code>"
        - 
          content: "<code>None of the above</code>"
      correctAnswer: 2
      correctAnswerDescription: ""
      correctAnswerMainTitle: "Great, you got it right!"
      description: "Which of these is a good choice for updating a Product instance?"
      id: "HTTPMethods-3"
      incorrectAnswerDescription: ""
      incorrectAnswerMainTitle: "Hmm, no."
    - 
      answers: 
        - 
          content: "<code>POST -> /products</code>"
        - 
          content: "<code>POST -> /products/id</code>"
        - 
          content: "<code>PUT -> /products/id</code>"
        - 
          content: "<code>None of the above</code>"
      correctAnswer: 0
      correctAnswerDescription: ""
      correctAnswerMainTitle: "Great, you got it right!"
      description: "Which of these is a good choice for creating a new Product?"
      id: "HTTPMethods-4"
      incorrectAnswerDescription: ""
      incorrectAnswerMainTitle: "Hmm, no."
---