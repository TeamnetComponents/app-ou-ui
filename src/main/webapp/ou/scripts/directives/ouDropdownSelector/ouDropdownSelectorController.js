'use strict';
ouControllers
    .controller('ouDropdownSelectorController', ['$scope', 'OrganizationalUnitHierarchyFilter',  function($scope, OrganizationalUnitHierarchyFilter) {

        $scope.ouAccountSelected = {};

        var init = function () {
            OrganizationalUnitHierarchyFilter.getOrganizationalUnitsForCurrentUser(function (res) {
                $scope.ouAccount = res;
            });
        };

        init();

        $scope.selectOu = function(item) {
            $scope.$emit('onSelectedFromDropdown', item);
        };

    }]);