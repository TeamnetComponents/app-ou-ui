'use strict';
ouControllers
    .controller('organizationalUnitController',['$scope', 'organizationalUnitService', function ($scope, organizationalUnitService) {

        $scope.showDropDownForPerspective = false;
        $scope.isPerspectiveSelected = false;
        $scope.isEditingAnOu = false;
        $scope.checkIfHaveChildren = false;
        $scope.isView = true;
        $scope.isEdit = false;
        $scope.organization = {};
        $scope.perspective = {};
        $scope.objectToUpdate = {};
        $scope.parentOu = {};

        var baseTemplateUrl = 'ou/views/organizationalUnit/template/';
        $scope.accountsTpl = baseTemplateUrl + 'account.tpl.html';
        $scope.functionsTpl = baseTemplateUrl + 'function.tpl.html';

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

            //$scope.organization.selected = $scope.organizationalUnitList[0];
            //if($scope.organization.selected.id != "") {
            //    $scope.showDropDownForPerspective = true;
            //}
        });

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