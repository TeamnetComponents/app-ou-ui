'use strict';

ouControllers
    .controller('organizationalUnitController', ['Notification', '$scope', 'OrganizationalUnit', 'Organization', 'Perspective', 'Function', 'OUFunction', 'OUAccount', 'OU',
        function (Notification, $scope, OrganizationalUnit, Organization, Perspective, Function, OUFunction, OUAccount, OU) {

            $scope.ouTree = {};
            $scope.ouTree.organization = {};
            $scope.ouTree.perspective = {};
            $scope.showPerspectiveDropDown = false;
            $scope.showOrgUnitsTree = false;
            $scope.organizationalUnits = null;

            $scope.getParentOrgUnitsById = function(nodeId) {

                OrganizationalUnit.getParentOrgUnitsById(
                    {rootId : $scope.ouTree.perspective.ouTreeRoot.id,
                     id : nodeId},
                    function(data) {
                        $scope.organizationalUnits = data;
                        console.log($scope.organizationalUnits);
                    },
                    function(error) {
                        $scope.organizationalUnits = null
                        Notification.error("Cannot retrieve Organizational Units!");
                    });
            };

            $scope.selectOrganization = function () {
                $scope.showPerspectiveDropDown = true;
                $scope.ouTree.perspective = {};
                $scope.showOrgUnitsTree = false;
            };

            $scope.selectPerspective = function () {
                $scope.showOrgUnitsTree = true;
                $scope.getTree();
            };

            $scope.getTree = function () {
                OrganizationalUnit.getTree(
                    {id: $scope.ouTree.perspective.ouTreeRoot.id},
                    function (data) {
                        $scope.orgUnitsTree = data;
                    }
                );
            };

            $scope.functionsTpl = OU.template.functionsTab;
            $scope.accountsTpl = OU.template.ouAccountsTab;
            $scope.availableFunctions = [];
            $scope.selectedFunctions = [];
            $scope.ouFunctions = [];
            $scope.availableAccounts = [];
            $scope.selectedAccounts = [];
            $scope.ouAccounts = [];
            $scope.selectedAccount = {};
            $scope.displayAccountFunctions = false;

            var init = function () {
                Organization.getAll(function (result) {
                    $scope.organizations = result;
                });

                Function.query(function (res) {
                    $scope.allFunctions = res;
                    $scope.availableFunctions = angular.copy($scope.allFunctions);
                });
            };

            init();

            $scope.$on('onSelectTreeNode', function (e, data) {
                if (data !== undefined && data !== null && data.id !== undefined && data.id !== null) {
                    selectOrganizationalUnit(data.id);
                }
            });

            $scope.$on('onCreateTreeNode', function (e, data) {
                $scope.isTreeOUSelected = true;
                $scope.createNewOrgUnit();
                //Create root OU
                if (data == null) {
                    $scope.organizationalUnit.perspective = $scope.ouTree.perspective;
                }
                //Create OU
                else if (data != undefined && data != null) {
                    $scope.organizationalUnit.parent = {id: data.id, code: data.code};
                }
            });

            $scope.$on('onDeleteTreeNode', function (e, data) {
                OrganizationalUnit.delete(
                    {id: data.id},
                    function () {
                        Notification.success("Organizational unit deleted");
                    },
                    function (error) {
                        Notification.error("Couldn't delete Organizational Unit!");
                        console.error(error);
                    });
            });

            $scope.saveOrganizationalUnit = function () {
                OrganizationalUnit.save($scope.organizationalUnit, function (data) {
                    $scope.organizationalUnit.id = data.id;
                    $scope.selectedFunctions.forEach(function (selectedFunction) {
                        if (angularIndexOf($scope.ouFunctions, selectedFunction) < 0) {
                            OUFunction.save({ouId: data.id}, selectedFunction);
                        }
                    });
                    $scope.ouFunctions.forEach(function (ouFunction) {
                        if (angularIndexOf($scope.selectedFunctions, ouFunction) < 0) {
                            OUFunction.delete({ouId: data.id, functionId: ouFunction.id});
                        }
                    });
                    $scope.getTree();
                    $scope.setEdit(false);
                    selectOrganizationalUnit(data.id);
                    Notification.success('Organizational unit saved');

                });
            };

            var selectOrganizationalUnit = function (ouId) {
                $scope.isTreeOUSelected = true;
                $scope.selectedAccount = {};
                $scope.displayAccountFunctions = false;
                $scope.setEdit(false);
                getOuDetails(ouId);
                $scope.getParentOrgUnitsById(ouId);
                getSelectedAndAvailableFunctions(ouId);
                getSelectedAndEligibleAccounts(ouId);
            };

            var getOuDetails = function (ouId) {
                OrganizationalUnit.get(
                    {id: ouId},
                    function (result) {
                        $scope.organizationalUnit = result;
                        if ($scope.organizationalUnit.parent === undefined || $scope.organizationalUnit.parent === null) {
                            $scope.organizationalUnit.perspective = $scope.ouTree.perspective;
                        }
                    },
                    function (error) {
                        Notification.error("Couldn't fetch Organizational Unit!");
                        console.error(error);
                    }
                );
            };

            var getSelectedAndAvailableFunctions = function (ouId) {
                OUFunction.query({ouId: ouId}, function (data) {
                    $scope.ouFunctions = data;
                    $scope.selectedFunctions = angular.copy($scope.ouFunctions);
                    $scope.availableFunctions = angular.copy($scope.allFunctions);
                    $scope.ouFunctions.forEach(function (item) {
                        var idx = angularIndexOf($scope.availableFunctions, item);
                        if (idx > -1) {
                            $scope.availableFunctions.splice(idx, 1);
                        }
                    });
                });
            };
            var getSelectedAndEligibleAccounts = function (ouId) {
                OUAccount.query({ouId: ouId}, function (accounts) {
                    $scope.ouAccounts = accounts;
                    $scope.selectedAccounts = angular.copy($scope.ouAccounts);
                    OUAccount.queryEligible({ouId: ouId}, function (eligibleAccounts) {
                        $scope.eligibleAccounts = eligibleAccounts;
                        $scope.availableAccounts = angular.copy($scope.eligibleAccounts);
                        $scope.ouFunctions.forEach(function (item) {
                            var idx = angularIndexOf($scope.availableAccounts, item);
                            if (idx > -1) {
                                $scope.availableAccounts.splice(idx, 1);
                            }
                        });
                    });
                });
            };


            $scope.open_validFrom = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened_validFrom = true;
            };

            $scope.open_validTo = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened_validTo = true;
            };

            $scope.dateOptions = {
                format: 'dd/MM/yyyy',
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.startFnc = function () {
                arguments[0].target.style.visibility = 'hidden';
            };

            $scope.stopFnc = function () {
                arguments[0].target.style.visibility = '';
            };

            var angularIndexOf = function (array, elem) {
                for (var x = 0; x < array.length; x++) {
                    if (angular.equals(array[x].id, elem.id))
                        return x;
                }
                return -1;
            };

            var initNewOrgUnit = function () {
                return {
                    id: null,
                    code: null,
                    description: null,
                    validFrom: null,
                    validTo: null,
                    active: false,
                    perspective: null,
                    parent: {},
                    children: [],
                    accounts: []
                };
            };

            $scope.setEdit = function (editMode) {
                $scope.isEdit = editMode;
                $scope.isView = !editMode;
            };
            $scope.createNewOrgUnit = function () {
                $scope.organizationalUnit = initNewOrgUnit();
                $scope.setEdit(true);
            };


            $scope.editOrganizationalUnit = function () {
                $scope.setEdit(true);
            };

            $scope.backOrganizationalUnit = function () {
                $scope.setEdit(false);
            };


            $scope.isSelected = function (organizationalUnit) {
                return organizationalUnit.id === $scope.organizationalUnit.id;
            };

            $scope.clickOnAccount = function (account) {
                $scope.selectedAccount = account;
                $scope.displayAccountFunctions = true;
            };

            $scope.findByProperty = function (array, key, val) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i][key] === val) {
                        return array[i];
                    }
                }
                return false;
            };

        }]);