(function () {
  'use strict';

  angular
    .module('javabrains')
    .directive('quiz', QuizDirective)
    .directive('codeQuiz', function ($compile) {
      return {
        'restrict': 'A',
        'scope': {
          'code': '=',
          'onChange': '&'
        },
        'link': function ($scope, element, attrs) {
          $scope.$watch(attrs, function () {

            if ($scope.code) {
              $scope.code = $scope.code.replace(/\n/g, '<br/>');

              var content = $.parseHTML($scope.code)[0];
              var codeContent = content.children[0]; // TODO: Look for code element here - like content.find('code')[0];
              hljs.configure({ 'useBR': true });
              hljs.highlightBlock(codeContent);
              var linkFn = $compile(content.outerHTML);
              content = linkFn($scope);
              element.append(content);
            }

          });
        }
      };
    });

  /** @ngInject */
  function QuizDirective() {

    return {
      templateUrl: '/app/lessons/quiz/quiz.html',
      scope: {
        'content': '=',
        'courseCode': '=',
        'nextPermalinkName': '='
      },
      controller: QuizModuleCtrl,
      controllerAs: 'ctrl'
    };

  }



  function QuizModuleCtrl($scope, $timeout, UserData, codeService, $stateParams) {
    var vm = this;
    
    this.quiz = {
      'questions': $scope.content
    };
    vm.nextPermalinkName = $scope.nextPermalinkName;
    this.quiz.questions[this.quiz.questions.length - 1].last = true;
    this.quizStarted = true;
    this.showTabs = true;
    this.userData = {
      'quizAnswers': {}
    };
    this.activeQuestionIndex = 0;

    this.activateQuestion = function (questionNumber) {
      this.setActiveQuestionIndex(questionNumber);
    };

    this.setActiveQuestionIndex = function (questionNumber) {
      this.activeQuestionIndex = questionNumber;
      this.activeQuestion = this.quiz.questions[questionNumber];
    };

    this.isAnswerCorrect = function (question) {
      var answer = this.userData.quizAnswers[question.id];
      if (question.type === 'code' && answer) {
        return codeService.compareCode(question.correctAnswer, answer);
      }
      return null != answer && answer == question.correctAnswer;
    };

    this.isAnswerIncorrect = function (question) {
      var answer = this.userData.quizAnswers[question.id];
      if (question.type === 'code' && answer) {
        return !codeService.compareCode(question.correctAnswer, answer);
      }
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
      "Oops, that is not the correct answer!",
      "Sorry, that isn't the correct answer.",
      "Nope, that isn't the right answer."];

    var index = Math.floor(Math.random() * 5);

    this.correctAnswerText = this.correctAnswerTexts[index];

    this.incorrectAnswerText = this.incorrectAnswerTexts[index];

    this.changed = function (val) {
      if (val) {
        this.userData.quizAnswers[this.activeQuestion.id] = val;
      }
    };

    this.submit = function () {
      vm.quizSubmitted = true;
      vm.totalCorrectAnswers =
        _.reduce(vm.quiz.questions, function (totalCorrectAnswers, question) {
          if (vm.isAnswerCorrect(question)) {
            totalCorrectAnswers++;
          }
          return totalCorrectAnswers;
        }, 0);
        
        
      if (Math.floor(vm.totalCorrectAnswers * 100/vm.quiz.questions.length) > 65) {
        UserData.submitQuizData($scope.courseCode, $stateParams.lessonName, this.userData);
        vm.quizComplete = true;  
      }
      else {
        vm.quizComplete = false;
      }
      
    };


  }

})(); 