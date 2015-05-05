ouDirectives.directive('ouMainDirective',['$translate', '$locale', 'tmhDynamicLocale',
        function($translate, $locale, tmhDynamicLocale) {
        return {
            restrict: 'EA',
//          templateUrl:'someUrl',
//          template:'<someHtml>',
//          replace:true|false,
//          scope:{},
//          compile: function postLink($scope, $element, attrs) {
//            return {
//                pre: function ($scope, iElement) {
//                iElement.append($compile($templateCache.get('template/timeline.html'))($scope));
//                }
//            };
//          },
//          controller: ['$scope','$attrs','$http', function ($scope, $attrs, $http) {
//
//         }]);
            link: function(scope, element, attrs, controller) {

                }
            };
        }]);