'use strict';
ouControllers
    .controller('organizationalUnitController',['$scope', 'organizationalUnitService', 'organizationalUnitServiceMock', 'AccountMock', 'Function', function ($scope, organizationalUnitService, organizationalUnitServiceMock, AccountMock, Function) {

        $scope.showDropDownForPerspective = false;
        $scope.isPerspectiveSelected = false;
        $scope.isEditingAnOu = false;
        $scope.checkIfHaveChildren = false;
        $scope.organization = {};
        $scope.perspective = {};
        $scope.objectToUpdate = {};
        $scope.parentOu = {};

        var baseTemplateUrl = 'ou/views/organizationalUnit/template/';
        $scope.accountsTpl = baseTemplateUrl + 'account.tpl.html';
        $scope.functionsTpl = baseTemplateUrl + 'function.tpl.html';

        $scope.organizationalUnits = [];
        $scope.selectedOu = {};
        $scope.accounts = [];
        $scope.functions = [];

        $scope.search = '';
        $scope.selectedSearch = '';

        $scope.isView = true;
        $scope.isEdit = false;

        $scope.loading = false;

        $scope.isSelected = function(organizationalUnit){
            return organizationalUnit.id === $scope.selectedOu.id;
        };

        $scope.findByProperty = function(array, key, val) {
            for (var i = 0; i < array.length; i++) {
                if (array[i][key] === val) {
                    return array[i];
                }
            }
            return false;
        };

        $scope.selectOrganizationalUnit = function(organizationalUnit) {
            $scope.loading = true;
            //TODO getByCode in repository & service (backend + frontend)
            organizationalUnitServiceMock.getByCode({ouCode: organizationalUnit.code}, function(res) {

                $scope.selectedOu = res;

                $scope.functions = angular.copy($scope.allFunctions);
                $scope.accounts = angular.copy($scope.allAccounts);
            });
        };

        $scope.editOrganizationalUnit = function(){
            $scope.isView = false;
            $scope.isEdit = true;
        };

        $scope.saveOrganizationalUnit = function() {

            //TODO updateOrganizationalUnit in repository & service (backend + frontend)
            organizationalUnitServiceMock.updateOrganizationalUnit($scope.selectedOu, function() {
                Notification.success('OrganizationalUnit updated');
                $scope.backOrganizationalUnit();
            }, function(error) {
                Notification.error(error.data.errMsg);
            });
        };

        $scope.backOrganizationalUnit = function(){
            $scope.isView = true;
            $scope.isEdit = false;

            if($scope.selectedOu.id != undefined){
                //$scope.selectOrganizationalUnit($scope.selectedOu);
            } else {
                //$scope.selectOrganizationalUnit($scope.organizationalUnits[0]);
            }
        };

        $scope.startFnc = function(){
            arguments[0].target.style.visibility = 'hidden';
        };

        $scope.stopFnc = function(){
            arguments[0].target.style.visibility = '';
        };

        var init = function() {
            //TODO getAllOrganizationalUnits in service & repository (backend + frontend)
            organizationalUnitServiceMock.getAllOrganizationalUnits({}, function(res) {
                $scope.organizationalUnits = res;
                AccountMock.getAll(function(res) {
                    $scope.allAccounts = res;
                    if(!_.isEmpty($scope.organizationalUnits)) {
                        $scope.selectOrganizationalUnit($scope.organizationalUnits[0]);
                    }
                });
                Function.getAll(function(res){
                    $scope.allFunctions = res;
                    if(!_.isEmpty($scope.organizationalUnits)){
                        $scope.selectOrganizationalUnit($scope.organizationalUnits[0]);
                    }
                });
            });
        };

        init();

        $scope.showPerspectiveSelect = function () {
            $scope.showDropDownForPerspective = true;
        };

        $scope.showTreePerspective = function () {
            $scope.isPerspectiveSelected = true;
        };

        $scope.className = function () {
            if ($scope.isTreePerspectiveSelected == true) {
                return "col-lg-4 col-md-4 col-sm-12 col-xs-12";
            }
            return "col-lg-6 col-md-6 col-sm-12 col-xs-12";
        };

        organizationalUnitService.getAllOu().then(function(response) {
            $scope.organizationalUnitList = response.content;
        });

        /*click on a tree node and you will get in args all the for the clicked node.
         parentOu will have the parent information
         objectToUpdate is the node
         isTreePerspectiveSelected will be true to show the node info to be edited
         search is an empty string to initialize the Search input for filter
         isEditingAnOu will be true to show what action the user is doing.
         */
        $scope.$on('sendData', function (e, args) {
            $scope.parentOu = args.parentOu;
            $scope.objectToUpdate = args.objectToUpdate;
            $scope.isTreePerspectiveSelected = args.isTreePerspectiveSelected;
            $scope.search = args.search;
            $scope.isEditingAnOu = args.isEditingAnOu;

            $scope.code = $scope.objectToUpdate.code;
            $scope.description = $scope.objectToUpdate.description;
            $scope.validFrom = new Date($scope.objectToUpdate.validFrom);
            $scope.validTo = new Date($scope.objectToUpdate.validTo);
        });

        $scope.saveOu = function () {
            $scope.saveUpdateOuInformation($scope.objectToUpdate);
        };

        $scope.saveUpdateOuInformation = function (objToUpdate) {
            objToUpdate.code = $scope.code;
            objToUpdate.description = $scope.description;
            objToUpdate.validFrom = $scope.validFrom;
            objToUpdate.validTo = $scope.validTo;
        };
    }]);