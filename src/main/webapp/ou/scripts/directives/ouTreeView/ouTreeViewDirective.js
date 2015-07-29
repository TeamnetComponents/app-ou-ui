'use strict';
ouDirectives.
    directive('ouTreeView', function() {
        /* You must give this attributes:
        *   ou-tree-data: the object to represent
        *   is-ou-manage: true in case of editing
        *                   false in case of showing information
        **/
        return {
            restrict: 'EA',
            templateUrl: 'ou/views/organizationalUnit/organizationalUnitTreeView.html',
            scope: {
                ouTreeData: '=',
                isOuManage: '='
            },
            controller: 'ouTreeViewController',
            link: function($scope, $element, $attrs) {
            }
        }
    });