'use strict';
ouDirectives.
    directive('ouTreeView', function() {
        /* You must give this attributes:
        *   ou-tree-data: the object to represent
        *   is-ou-manage: false in case of editing
        *                   true in case of showing information
        *   edit-url: required only when is-ou-manage is true
        *             contains the url for editing the tree entry
        **/
        return {
            restrict: 'EA',
            templateUrl: 'ou/views/organizationalUnit/organizationalUnitTreeView.html',
            scope: {
                ouTreeData: '=',
                isOuManage: '=',
                editUrl: '='
            },
            controller: 'ouTreeViewController',
            link: function($scope, $element, $attrs) {
            }
        }
    });