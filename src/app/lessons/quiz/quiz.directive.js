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

  
  
  

};
  
  
})(); 