(function () {
    'use strict';

    angular
        .module('javabrains')
        .factory('codeService', codeService);

    function codeService() {

        var api = {};

        api.compareCode = function (code, answer) {
            // var cs = new CommentStripper();
            var regSpecialChars = /\s*([!@#$%^&*()_+\-=\[\]{};:\\|,.<>\/?])\s*/g;
            var regLineBreaks = /^\s+|\r+\n+|\n+|\r+|\s+$/g;
            var regSpaces = / +/g;
            // code = cs.strip(code);
            code = code.trim();
            code = code.replace(regLineBreaks, " ");
            code = code.replace(regSpaces, " ");
            code = code.replace(regSpecialChars, "$1");


            // answer = cs.strip(answer);
            if (!answer) {
                return;
            }
            answer = answer.trim();
            answer = answer.replace(regLineBreaks, " ");
            answer = answer.replace(regSpaces, " ");
            answer = answer.replace(regSpecialChars, "$1");

            return code == answer;
        };

        return api;

    };


})();