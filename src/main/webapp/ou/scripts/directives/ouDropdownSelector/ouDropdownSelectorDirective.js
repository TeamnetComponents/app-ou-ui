'use strict';
ouDirectives
    .directive('ouDropdownSelector', function() {
        return {
            restrict: "EA",
            templateUrl: "ou/views/ouDropdownSelector/ouDropdownSelectorView.html",
            scope: {},
            controller: "ouDropdownSelectorController",
            link: function($scope, $element, $attrs) {
            }
        }
    });