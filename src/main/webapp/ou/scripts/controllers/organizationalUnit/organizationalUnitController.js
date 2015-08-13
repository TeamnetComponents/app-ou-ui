'use strict';
ouControllers
   
    .controller('organizationalUnitController',['$scope', 'organizationalUnitService', 'Organization', 'organizationalUnitServiceMock', 'AccountMock', 'FunctionMock', 'OU',
        function ($scope, organizationalUnitService, Organization, organizationalUnitServiceMock, AccountMock, FunctionMock, OU) {

        $scope.showDropDownForPerspective = false;
        $scope.isPerspectiveSelected = false;
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
        $scope.clicked = false;

        $scope.isSelected = function(organizationalUnit){
            return organizationalUnit.id === $scope.selectedOu.id;
        };
        $scope.objToList = {};
        $scope.objToList.functions = [];
        $scope.clickOnAccount = function(account) {
            $scope.objToList = {};
            $scope.objToList.functions = [];
            $scope.objToList = account;
            $scope.clicked = true;
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
            //organizationalUnitServiceMock.getByCode({ouCode: organizationalUnit.code}, function(res) {
            //
            //    $scope.selectedOu = res;
            //
            //    $scope.functions = angular.copy($scope.allFunctions);
            //    $scope.accounts = angular.copy($scope.allAccounts);
            //});
        };

        $scope.editOrganizationalUnit = function(){
            $scope.isView = false;
            $scope.isEdit = true;
        };

        $scope.saveOrganizationalUnit = function() {

            $scope.saveUpdateOuInformation($scope.objectToUpdate);

            $scope.objectFromPackage = $scope.objectToUpdate;
            /*Organization.get({id: $scope.objectToUpdate.id}, function(res) {
                $scope.objectFromPackage = res;
            });*/

            $scope.objectFromPackage.code = $scope.objectToUpdate.code;
            $scope.objectFromPackage.description = $scope.objectToUpdate.description;
            $scope.objectFromPackage.validFrom = $scope.objectToUpdate.validFrom;
            $scope.objectFromPackage.validTo = $scope.objectToUpdate.validTo;

            organizationalUnitService.update({id: $scope.objectToUpdate.id}, $scope.objectToUpdate, function(value) {
                Notification.success('Function updated');
                $scope.objectToUpdate.id = value.id;
            });

            $scope.isView = true;
            $scope.isEdit = false;
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

                Organization.getAll(function(res) {
                    $scope.organizationalUnitList = res;
                });

                organizationalUnitService.getAll(function(res) {
                    $scope.currentOuList = res;
                });

                FunctionMock.getAll(function(res){
                    $scope.allFunctions = res;
                    if(!_.isEmpty($scope.organizationalUnits)){
                        $scope.selectOrganizationalUnit($scope.organizationalUnits[0]);
                    }
                });
            });
        };

        init();

            $scope.selectOu = function (funct) {
                organizationalUnitService.getById({id: funct.id}, function (res) {
                    $scope.organizationalUnitList = res;
                });
            };

        $scope.showPerspectiveSelect = function () {
            $scope.showDropDownForPerspective = true;
        };

        $scope.showTreePerspective = function () {
            $scope.isPerspectiveSelected = true;
        };

        $scope.className = function () {
            if ($scope.isTreePerspectiveSelected == true) {
                return "col-lg-5 col-md-5 col-sm-12 col-xs-12";
            }
            return "col-lg-6 col-md-6 col-sm-12 col-xs-12";
        };

        //organizationalUnitService.getAllOu().then(function(response) {
        //    $scope.organizationalUnitList = response.content;
        //
        //    $scope.organization.selected = $scope.organizationalUnitList[0];
        //    if($scope.organization.selected.id != "") {
        //        $scope.showDropDownForPerspective = true;
        //    }
        //});

            //$scope.organization.selected = $scope.organizationalUnitList[0];
            //if($scope.organization.selected.id != "") {
            //    $scope.showDropDownForPerspective = true;
            //}
        //});

        /*click on a tree node and you will get in args all the for the clicked node.
         parentOu will have the parent information
         objectToUpdate is the node
         isTreePerspectiveSelected will be true to show the node info to be edited
         search is an empty string to initialize the Search input for filter
         isEditingAnOu will be true to show what action the user is doing.
         */
        var unbind = $scope.$on('sendData', function (e, args) {
            $scope.parentOu = args.parentOu;
            $scope.objectToUpdate = args.objectToUpdate;
            $scope.isTreePerspectiveSelected = args.isTreePerspectiveSelected;
            $scope.search = args.search;
            $scope.isEditingAnOu = args.isEditingAnOu;
            //$scope.showExpandCollapse = args.isShowExpandCollapse;

            $scope.code = $scope.objectToUpdate.code;
            $scope.description = $scope.objectToUpdate.description;
            $scope.validFrom = new Date($scope.objectToUpdate.validFrom);
            $scope.validTo = new Date($scope.objectToUpdate.validTo);
        });
        $scope.$on('$destroy', unbind);

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

        $scope.editAccount = function(){
            $scope.isView = false;
            $scope.isEdit = true;
        };

        $scope.backAccount = function() {
            $scope.isView = true;
            $scope.isEdit = false;
            //$scope.isTreePerspectiveSelected = false;
            //$scope.className();
        };
    }]);