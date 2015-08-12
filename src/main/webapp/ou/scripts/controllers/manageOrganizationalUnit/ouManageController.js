/**
 * Created by Radu.Hoaghe on 7/16/2015.
 */
ouControllers.controller('ouManageController', ['$scope', '$http', 'OU', '$location', 'OuManage', 'Notification', function ($scope, $http, OU, $location, OuManage, Notification) {
    $scope.departmentSelection = {};
    $scope.disableDetails = true;
    $scope.newPerspectiveName = "";
    $scope.newTab = -1;
    $scope.editUrl = OU.url.manageOrganizationUnits;
    $scope.canEdit = false;
    $scope.invalidForm = false;
    $scope.objectToUpdate = {};

    /*$http.get('/ou/scripts/controllers/manageOrganizationalUnit/ouManage.json')
        .success(function(data) {
            $scope.departments = data.content.organizations;
            $scope.initialDepartments = data.content.organizations;
            for(var i = 0; i < $scope.departments.length; i++){

                $scope.departments[i].validFrom = OU.convertDate($scope.departments[i].validFrom);

                $scope.departments[i].validTo = OU.convertDate($scope.departments[i].validTo);
            }
        })
        .error(function(data) {

        });*/

    var init = function() {
        OuManage.getAll(function(res) {
            $scope.departments = res;
        });
    };

    init();


    $scope.disableEditing = function () {
        $scope.canEdit = false;
        $scope.disableDetails = !$scope.canEdit;
    };

    $scope.createOrganization = function () {
        $scope.departmentSelection.selected = {
            "name": "",
            "code": "",
            "description": ""
        };
        $scope.canEdit = true;
        $scope.disableDetails = !$scope.canEdit;
    };

    $scope.editOrganization = function () {
        $scope.canEdit = true;
        $scope.disableDetails = !$scope.canEdit;
    };

    $scope.saveOrganization = function () {
        // TODO save new modifications to DB
        $scope.objectToUpdate = {
            id: null,
            code: null,
            description: null,
            validFrom: null,
            validTo: null,
            "active": null,
            "perspective": [],
            "jpaId": null,
            "perspectivesNeo": [],
            "roots": []
        };
        $scope.objectToUpdate.code = $scope.departmentSelection.selected.name;
        $scope.objectToUpdate.description = $scope.departmentSelection.selected.code;
        $scope.objectToUpdate.validFrom = $scope.departmentSelection.selected.validFrom;
        $scope.objectToUpdate.validTo = $scope.departmentSelection.selected.validTo;
        $scope.objectToUpdate.active = true;
        OuManage.createOrganization($scope.objectToUpdate, function(value) {
            Notification.success('Organization created');
            $scope.objectToUpdate.id = value.id;
            $scope.objectToUpdate.jpaId = value.id;
        }, function(error) {
            Notification.error(error.data.errMsg);
        });
    };

    $scope.back = function () {
        $scope.canEdit = false;
        $scope.disableDetails = !$scope.canEdit;
        // Sa se citeasca din nou datele din json
        // TODO poate sa schimb variabilele de pe ng-model de pe inputuri in cazul in care
        // raman salvate modificarile facute de user

    };

    $scope.deleteOrganization = function () {
        // TODO delete the organization from database

    };

    $scope.addPerspective = function () {
        $scope.departmentSelection.selected.perspectives
            [$scope.departmentSelection.selected.perspectives.length] = {"name": "new"};
        $scope.newTab = $scope.departmentSelection.selected.perspectives.length;

    };

    $scope.editPerspective = function () {
        $location.path(OU.url.manageOrganizationUnits); // TODO url params
    };

    $scope.saveNewPerspective = function (newPerspectiveName, index) {
        $scope.departmentSelection.selected.perspectives[index].name = newPerspectiveName;
    };

}]);