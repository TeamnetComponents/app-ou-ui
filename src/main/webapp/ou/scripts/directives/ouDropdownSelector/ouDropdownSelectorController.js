'use strict';
ouControllers
    .controller('ouDropdownSelectorController', ['$scope', 'OrganizationalUnitHierarchyFilter', 'OrganizationalUnitObjectGetter', function ($scope, OrganizationalUnitHierarchyFilter, OrganizationalUnitObjectGetter) {

        $scope.ouAccountSelected = {};

        var init = function () {
            OrganizationalUnitHierarchyFilter.getOrganizationalUnitsForCurrentUser(function (res) {
                $scope.ouAccount = res;

                if (OrganizationalUnitObjectGetter.id != {}) {
                    res.forEach(function (item) {
                        if (item.id == OrganizationalUnitObjectGetter.id) {
                            $scope.ouAccountSelected.selected = item;
                        }
                    })
                }
            });
        };

        init();

        $scope.selectOu = function (item) {
            $scope.$emit('onSelectedFromDropdown', item);
        };

        $scope.$on('onSavedDataFromDropdown', function (e, data) {
            if (data) {
                $scope.ouAccountSelected = {};
                OrganizationalUnitObjectGetter.id = {};
            }
        });
    }]);