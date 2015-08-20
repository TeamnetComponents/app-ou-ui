'use strict';
ouControllers

    .controller('organizationalUnitController', ['Notification', '$scope', 'OrganizationalUnitService', 'Organization', 'organizationalUnitServiceMock', 'AccountMock', 'FunctionMock', 'OU',
        function (Notification, $scope, OrganizationalUnitService, Organization, PerspectiveService, organizationalUnitServiceMock, AccountMock, FunctionMock, OU) {


            /* $scope.isPerspectiveSelected = false;
            $scope.isEditingAnOu = false;
            $scope.checkIfHaveChildren = false;
            $scope.isView = true;
            $scope.isEdit = false;
            $scope.showExpandCollapse = false;
            $scope.organization = {};
            $scope.perspective = {};
            $scope.objectToUpdate = {};
            $scope.parentOu = {};
            $scope.objectFromPackage = {};

            $scope.accountsTpl = OU.url.template + OU.url.account;
            $scope.functionsTpl = OU.url.template + OU.url.functions;

            $scope.organizationalUnits = [];
            $scope.selectedOu = {};
            $scope.accounts = [];
            $scope.functions = [];
            $scope.functionsCopy = [];

            $scope.search = '';
            $scope.selectedSearch = '';
            $scope.loading = false;
            $scope.clicked = false;*/

            $scope.showPerspectiveDropDown = false;
            $scope.showOrgUnitsTree = false;
            $scope.selectedOrganization = {};
            $scope.selectedPerspective = {};

            var initNewOrgUnit = function() {
                var newOrgUnit = {
                    id : null,
                    code : null,
                    description: null,
                    validFrom : null,
                    validTo : null,
                    active : null,
                    perspective : null,
                    parent : {},
                    children : [],
                    accounts : []
                };

                return newOrgUnit;
            }

            var init = function () {
                /*//TODO getAllOrganizationalUnits in service & repository (backend + frontend)
                 organizationalUnitServiceMock.getAllOrganizationalUnits({}, function (res) {
                 $scope.organizationalUnits = res;
                 AccountMock.getAll(function (res) {
                 $scope.allAccounts = res;
                 if (!_.isEmpty($scope.organizationalUnits)) {
                 $scope.selectOrganizationalUnit($scope.organizationalUnits[0]);
                 }
                 });*/

                Organization.getAll(
                    function (result) {
                        $scope.organizationalUnitList = result;
                    });

                /* OrganizationalUnitService.getAll(function (res) {
                 $scope.currentOuList = res;
                 });

                 FunctionMock.getAll(function (res) {
                 $scope.allFunctions = res;
                 if (!_.isEmpty($scope.organizationalUnits)) {
                 $scope.selectOrganizationalUnit($scope.organizationalUnits[0]);
                 }
                 });
                 });*/
            };

            init();

            $scope.getTree = function () {
                OrganizationalUnitService.getTree(
                    {id: 231},
                    function (data) {
                        console.log(data);
                        $scope.orgUnitsTree = data;
                    });
            }

            $scope.selectOrganization = function() {
                $scope.showPerspectiveDropDown = true;

                //TODO: This is not absolutely necessary because the perspectives are brought with organizations
                PerspectiveService.getByOrganizationId(
                    {id: $scope.selectedOrganization.id},
                    function(data) {
                        $scope.perspectives = data;
                    }
                )
            }

            $scope.selectPerspective = function() {
                $scope.showOrgUnitsTree = true;

                OrganizationalUnitService.getTree(
                    {id: $scope.selectedPerspective.organizationalUnit.id},
                    function (data) {
                        $scope.orgUnitsTree = data;
                        console.log(data);
                    });

            }

            //TODO : WHATTTT?
            $scope.getPanelClass = function () {
                if ($scope.isTreeOUSelected == true) {
                    return "col-lg-5 col-md-5 col-sm-12 col-xs-12";
                }
                return "col-lg-6 col-md-6 col-sm-12 col-xs-12";
            };

            $scope.createNewOrgUnit = function() {
                $scope.newOrgUnit = initNewOrgUnit();
                $scope.isCreatedOrEdited = true;
            };

            $scope.saveOrganizationalUnit = function() {
                $scope.isCreatedOrEdited = false;
            };

            $scope.editOrganizationalUnit = function() {
                $scope.isCreatedOrEdited = true;
            };

            $scope.backOrganizationalUnit = function() {
                $scope.isCreatedOrEdited = false;
            };

            $scope.$on('editNode', function(e, data) {
                console.log(data);
               if (data != undefined && data != null) {
                   OrganizationalUnitService.getById(
                       {id : data.id},
                       function(result) {
                           $scope.newOrgUnit = data;
                           $scope.isTreeOUSelected = true;
                           $scope.isCreatedOrEdited = false;
                       },
                       function(error) {
                           Notification.error("Couldn't fetch Organizational Unit!");
                       }
                   );
               };
            });
            /*click on a tree node and you will get in args all the for the clicked node.
             parentOu will have the parent information
             objectToUpdate is the node
             isTreeOUSelected will be true to show the node info to be edited
             search is an empty string to initialize the Search input for filter
             isEditingAnOu will be true to show what action the user is doing.
             */
            var unbind = $scope.$on('newNode', function (e, data) {

                //Create root OUT
                if (data == null) {
                    $scope.isTreeOUSelected = true;
                    $scope.createNewOrgUnit();
                    $scope.newOrgUnit.parent.id = null;
                }
                //Create OU
                else if (data != undefined && data != null) {
                    $scope.isTreeOUSelected = true;
                    $scope.createNewOrgUnit();
                    $scope.newOrgUnit.parent = data;
                }

                /* if (args != undefined && args != null) {
                 $scope.parentOu = args.parentOu;
                 $scope.objectToUpdate = args.objectToUpdate;
                 $scope.isTreeOUSelected = true;//args.isTreeOUSelected;
                 $scope.search = args.search;
                 $scope.isEditingAnOu = args.isEditingAnOu;
                 //$scope.showExpandCollapse = args.isShowExpandCollapse;

                 $scope.code = $scope.objectToUpdate.code;
                 $scope.description = $scope.objectToUpdate.description;
                 $scope.validFrom = new Date($scope.objectToUpdate.validFrom);
                 $scope.validTo = new Date($scope.objectToUpdate.validTo);
                 }*/
            });
            $scope.$on('$destroy', unbind);

            /*$scope.isSelected = function (organizationalUnit) {
                return organizationalUnit.id === $scope.selectedOu.id;
            };

            $scope.objToList = {};
            $scope.objToList.functions = [];
            $scope.clickOnAccount = function (account) {
                $scope.objToList = {};
                $scope.objToList.functions = [];
                $scope.objToList = account;
                $scope.clicked = true;
            };

            $scope.findByProperty = function (array, key, val) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i][key] === val) {
                        return array[i];
                    }
                }
                return false;
            };

            $scope.selectOrganizationalUnit = function (organizationalUnit) {
                $scope.loading = true;
                //TODO getByCode in repository & service (backend + frontend)
                //organizationalUnitServiceMock.getByCode({ouCode: organizationalUnit.code}, function(res) {
                //
                //    $scope.selectedOu = res;
                //
                //    $scope.functions = angular.copy($scope.allFunctions);
                //    $scope.accounts = angular.copy($scope.allAccounts);
                //});
            };

            $scope.editOrganizationalUnit = function () {
                $scope.isView = false;
                $scope.isEdit = true;
            };

            $scope.saveOrganizationalUnit = function () {

                $scope.saveUpdateOuInformation($scope.objectToUpdate);

                $scope.objectFromPackage = $scope.objectToUpdate;
                *//*Organization.get({id: $scope.objectToUpdate.id}, function(res) {
                 $scope.objectFromPackage = res;
                 });*//*

                $scope.objectFromPackage.code = $scope.objectToUpdate.code;
                $scope.objectFromPackage.description = $scope.objectToUpdate.description;
                $scope.objectFromPackage.validFrom = $scope.objectToUpdate.validFrom;
                $scope.objectFromPackage.validTo = $scope.objectToUpdate.validTo;

                OrganizationalUnitService.update({id: $scope.objectToUpdate.id}, $scope.objectToUpdate, function (value) {
                    Notification.success('Function updated');
                    $scope.objectToUpdate.id = value.id;
                });

                $scope.isView = true;
                $scope.isEdit = false;
            };

            $scope.backOrganizationalUnit = function () {
                $scope.isView = true;
                $scope.isEdit = false;

                if ($scope.selectedOu.id != undefined) {
                    //$scope.selectOrganizationalUnit($scope.selectedOu);
                } else {
                    //$scope.selectOrganizationalUnit($scope.organizationalUnits[0]);
                }
            };

            $scope.startFnc = function () {
                arguments[0].target.style.visibility = 'hidden';
            };

            $scope.stopFnc = function () {
                arguments[0].target.style.visibility = '';
            };



            $scope.selectOu = function (funct) {
                OrganizationalUnitService.getById({id: funct.id}, function (res) {
                    $scope.organizationalUnitList = res;
                });
            };

            $scope.showPerspectiveSelect = function () {
                $scope.showPerspectiveDropDown = true;
            };

            $scope.showTreePerspective = function () {
                $scope.isPerspectiveSelected = true;
            };

            */

            //OrganizationalUnitService.getAllOu().then(function(response) {
            //    $scope.organizationalUnitList = response.content;
            //
            //    $scope.organization.selected = $scope.organizationalUnitList[0];
            //    if($scope.organization.selected.id != "") {
            //        $scope.showPerspectiveDropDown = true;
            //    }
            //});

            //$scope.organization.selected = $scope.organizationalUnitList[0];
            //if($scope.organization.selected.id != "") {
            //    $scope.showPerspectiveDropDown = true;
            //}
            //});



            /*
            $scope.saveOu = function () {
                $scope.saveUpdateOuInformation($scope.objectToUpdate);
                $scope.isView = true;
                $scope.isEdit = false;
            };

            $scope.saveUpdateOuInformation = function (objToUpdate) {
                objToUpdate.code = $scope.code;
                objToUpdate.description = $scope.description;
                objToUpdate.validFrom = $scope.validFrom;
                objToUpdate.validTo = $scope.validTo;
            };

            $scope.editAccount = function () {
                $scope.isView = false;
                $scope.isEdit = true;
            };

            $scope.backAccount = function () {
                $scope.isView = true;
                $scope.isEdit = false;
                //$scope.isTreeOUSelected = false;
                //$scope.className();
            };*/
        }]);