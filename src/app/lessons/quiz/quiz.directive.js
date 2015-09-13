(function() {
  'use strict';

  angular
    .module('javabrains')
    .directive('quiz', QuizDirective);

  /** @ngInject */
  function QuizDirective() {
	  
	  return {
		  templateUrl: '/app/lessons/quiz/quiz.html',
      scope: {
        'content': '='
      },
      controller: QuizModuleCtrl,
      controllerAs: 'ctrl'
	  };
     
  }
  
  
  
  function QuizModuleCtrl($scope) {
  
  this.quiz = {
    'questions': $scope.content
  };
  this.quizStarted = true;
  this.showTabs = true;
  this.userData = {
    'quizAnswers': {}
  };
  this.activeQuestionIndex = 0;
  
  this.activateQuestion = function(questionNumber) {
    this.setActiveQuestionIndex(questionNumber);
  };
  
  this.setActiveQuestionIndex = function(questionNumber) {
    this.activeQuestionIndex = questionNumber;
  };
  
  this.isAnswerCorrect = function(question) {
    var answer = this.userData.quizAnswers[question.id];
    return null != answer && answer == question.correctAnswer;
  };
  
  this.isAnswerIncorrect = function(question) {
      var answer = this.userData.quizAnswers[question.id];
      return null != answer && answer != question.correctAnswer;
  };
  
  this.correctAnswerTexts = 
  ["Yes, that's right!",
    "Good work!",
    "That's correct!",
    "You've got it right!",
    "Awesome! That's correct!"];

  this.incorrectAnswerTexts = 
   ["Hmm... no. That's not right.",
    "That isn't correct.",
    "Sorry, that isn't the correct answer.",
    "Nope, that isn't the right answer."];
  
  var index = Math.floor(Math.random() * 5);
    
  this.correctAnswerText = this.correctAnswerTexts[index];
  
  this.incorrectAnswerText = this.incorrectAnswerTexts[index];
  
  
  }
  
})(); 