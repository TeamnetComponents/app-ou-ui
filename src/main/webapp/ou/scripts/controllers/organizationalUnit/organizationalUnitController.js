'use strict';

ouControllers
    .controller('organizationalUnitController', ['ServiceSelectedOU','Notification', '$scope', 'OrganizationalUnit', 'Organization', 'Perspective', 'Function', 'OUFunction', 'OUAccount', 'OU',
        function (ServiceSelectedOU, Notification, $scope, OrganizationalUnit, Organization, Perspective, Function, OUFunction, OUAccount, OU) {

            $scope.ouTree = {};
            $scope.ouTree.organization = {};
            $scope.ouTree.perspective = {};
            $scope.showPerspectiveDropDown = false;
            $scope.showOrgUnitsTree = false;
            $scope.organizationalUnits = null;

            $scope.getParentOrgUnitsById = function (nodeId) {

                /*OrganizationalUnit.getParentOrgUnitsById(
                    {
                        rootId: $scope.ouTree.perspective.ouTreeRoot.id,
                        id: nodeId
                    },
                    function (data) {
                        $scope.organizationalUnits = data;
                        console.log($scope.organizationalUnits);
                    },
                    function (error) {
                        $scope.organizationalUnits = null
                        Notification.error("Cannot retrieve Organizational Units!");
                    });*/
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

            var initAvailableFunctionsAndAccounts = function () {
                $scope.availableFunctions = [];
                $scope.selectedFunctions = [];
                $scope.ouFunctions = [];
                $scope.availableAccounts = [];
                $scope.selectedAccounts = [];
                $scope.ouAccounts = [];
                $scope.selectedAccount = {functions: [], availableFunctions: []};
                $scope.displayAccountFunctions = false;

                Function.query(function (res) {
                    $scope.allFunctions = res;
                    $scope.availableFunctions = angular.copy($scope.allFunctions);
                });
            };

            var init = function (callback) {
                Organization.getAll(function (result) {
                    $scope.organizations = result;
                    if (callback) return callback(result);
                });
                initAvailableFunctionsAndAccounts();
            };

            init();

            $scope.$on('onSelectTreeNode', function (e, data) {
                if (data !== undefined && data !== null && data.id !== undefined && data.id !== null) {
                    selectOrganizationalUnit(data.id);
                }
            });

            $scope.$on('onCreateTreeNode', function (e, data) {
                $scope.isTreeOUSelected = true;
                initAvailableFunctionsAndAccounts();
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
                $scope.editedOrgUnitCopy = angular.copy($scope.organizationalUnit);

                //Chained saving of OU, OUFunctions, OUAccounts
                OrganizationalUnit.save($scope.organizationalUnit,
                    function (data) {
                        $scope.organizationalUnit.id = data.id;

                        saveOrganizationalUnitFunctions(
                            data.id,
                            function (funcResult) {
                                console.log("SAVEOUF : " + funcResult);
                                if (funcResult == true) {
                                    saveOrganizationalUnitAccounts(
                                        data.id,
                                        function (accResult) {
                                            console.log("SAVEOUACC : " + accResult);
                                            if (accResult == true) {
                                                //todo: show wait animation and retrieve tree when function and account saving is done
                                                $scope.getTree();
                                                $scope.setEdit(false);
                                                selectOrganizationalUnit(data.id);
                                                Notification.success('Organizational unit saved!');
                                            }
                                        });
                                }
                            });
                    },
                    function(error) {
                        Notification.error('Organizational unit save failed!');
                    });
            };

            //Pe functia de callback : true - in caz de succes, false - in caz de eroare
            var saveOrganizationalUnitFunctions = function (ouId, callbackFunc) {
                var functionsToSave = 0;
                var functionsSaved = 0;
                var functionsToDelete = 0;
                var functionsDeleted = 0;

                $scope.selectedFunctions.forEach(function (selectedFunction) {
                    if (angularIndexOf($scope.ouFunctions, selectedFunction) < 0) {
                        functionsToSave++;
                        OUFunction.save({ouId: ouId}, selectedFunction,
                            function (succes) {
                                functionsSaved++;
                                console.log("SAVE: " + functionsToSave + " " + functionsSaved);

                                if (functionsToSave == functionsSaved && functionsToDelete == functionsDeleted) {
                                    if (callbackFunc) return callbackFunc(true);
                                }
                            },
                            function (error) {
                                return callbackFunc(false);
                            });
                    }
                });

                $scope.ouFunctions.forEach(function (ouFunction) {
                    if (angularIndexOf($scope.selectedFunctions, ouFunction) < 0) {
                        functionsToDelete++;
                        OUFunction.delete({ouId: ouId, functionId: ouFunction.id},
                            function (succes) {
                                functionsDeleted++;
                                console.log("DELETE : " + functionsToDelete + " " + functionsDeleted);

                                if (functionsToDelete == functionsDeleted && functionsToSave == functionsSaved) {
                                    if (callbackFunc) callbackFunc(true);
                                }
                            },
                            function (error) {
                                if (callbackFunc) callbackFunc(false);
                            });
                    }
                });

                //Daca nu exista functii de salvat/sters, atunci se intoarce un rezultat true pe callback
                if (functionsToSave == 0 && functionsToDelete == 0) {
                    if (callbackFunc) callbackFunc(true);
                }

            };

            //Pe functia de callback : true - in caz de succes, false - in caz de eroare
            var saveOrganizationalUnitAccounts = function (ouId, callbackFunc) {
                OUAccount.save({ouId: ouId}, $scope.selectedAccounts,
                    function (succes) {
                        if (callbackFunc) return callbackFunc(true);
                    },
                    function (error) {
                        if (callbackFunc) return callbackFunc(false);
                    });
            };

            var selectOrganizationalUnit = function (ouId) {
                $scope.selectedAccount = {functions: [], availableFunctions: []};
                $scope.displayAccountFunctions = false;
                $scope.setEdit(false);
                getOuDetails(ouId);
            };

            var deselectOrganizationalUnit = function() {
                $scope.isTreeOUSelected = false;
                $scope.selectedAccount = {functions: [], availableFunctions: []};
                $scope.displayAccountFunctions = false;
                $scope.setEdit(false);
            };

            var getOuDetails = function (ouId) {
                OrganizationalUnit.get(
                    {id: ouId},
                    function (result) {
                        $scope.organizationalUnit = result;
                        if ($scope.organizationalUnit.parent === undefined || $scope.organizationalUnit.parent === null) {
                            $scope.organizationalUnit.perspective = $scope.ouTree.perspective;
                        }

                        //Daca utilizatorul are acces la OU, se obtin si celelalte detalii
                        $scope.isTreeOUSelected = true;
                        $scope.getParentOrgUnitsById(ouId);
                        getSelectedAndAvailableFunctions(ouId);
                        getSelectedAndEligibleAccounts(ouId);
                    },
                    function (error) {
                        if (error.status == 406) {
                            Notification.error("Not authorized to view this Organizational Unit!");
                        }
                        else {
                            Notification.error("Couldn't fetch Organizational Unit!");
                        }
                        deselectOrganizationalUnit();
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
                        $scope.ouAccounts.forEach(function (item) {
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

                //Daca se da click pe back, copiem vechile valori.
                if (editMode == false) {
                    $scope.organizationalUnit = angular.copy($scope.editedOrgUnitCopy);
                }
                else {
                    $scope.editedOrgUnitCopy = angular.copy($scope.organizationalUnit);
                }
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
                //fixme: fix multiselect - selectedAccount.functions and selectedAccount.availableFunctions both contain objects that are not equal for equal ids, therefore ui-select allows selecting the same element twice (the one in functions is found to be different than the one in availableFunctions).
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

            function resetServiceData() {
                ServiceSelectedOU.dataRedirect = false;
                ServiceSelectedOU.ouId = null;
                ServiceSelectedOU.perspectiveId = null;
                ServiceSelectedOU.organizationId = null;
                ServiceSelectedOU.ouParent = null;
            }

            //If it's redirected from Organizations, a certain OrgUnit must be opened.
            if (ServiceSelectedOU.dataRedirect != undefined && ServiceSelectedOU.dataRedirect == true) {

                var requestedOUId = ServiceSelectedOU.ouId;
                var requestedOUPerspectiveId = ServiceSelectedOU.perspectiveId;
                var requestedOUOrganizationId = ServiceSelectedOU.organizationId;
                var requestOuParent = ServiceSelectedOU.ouParent;
                resetServiceData();

                $scope.showPerspectiveDropDown = true;
                $scope.showOrgUnitsTree = true;

                init(function(result) {
                    $scope.ouTree = {};
                    $scope.ouTree.organization = {};
                    $scope.ouTree.perspective = {};

                    $scope.organizations.forEach(function(orgEntry) {
                        console.log(orgEntry);
                        if (orgEntry.id == requestedOUOrganizationId) {
                            console.log(orgEntry);
                            $scope.ouTree.organization = orgEntry;

                            $scope.ouTree.organization.perspectives.forEach(function(perspEntry) {
                                if (perspEntry.id == requestedOUPerspectiveId) {
                                    $scope.ouTree.perspective = perspEntry;

                                    $scope.getTree();

                                    if (requestedOUId != undefined && requestedOUId != null) {
                                        selectOrganizationalUnit(requestedOUId);
                                    }
                                    else if (requestOuParent != undefined && requestOuParent != null) {
                                        $scope.isTreeOUSelected = true;
                                        initAvailableFunctionsAndAccounts();
                                        $scope.createNewOrgUnit();
                                        $scope.organizationalUnit.parent = requestOuParent;
                                    }
                                }
                            });
                        }
                    });
                });
            }
        }]);