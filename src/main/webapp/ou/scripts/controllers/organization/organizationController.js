/**
 * Created by Radu.Hoaghe on 7/16/2015.
 */
ouControllers.controller('OrganizationController', ['$scope', '$http', 'OU', '$location', 'Organization', 'Notification', function ($scope, $http, OU, $location, Organization, Notification) {
    $scope.organizationSelection = {};
    $scope.disableDetails = true;
    $scope.newPerspectiveName = "";
    $scope.newTab = -1;
    $scope.editUrl = OU.url.manageOrganizationUnits;
    $scope.canEdit = false;
    $scope.invalidForm = false;
    $scope.objectToUpdate = {};

    /*$http.get('/ou/scripts/controllers/organization/organization.json')
        .success(function(data) {
            $scope.organizations = data.content.organizations;
            $scope.initialDepartments = data.content.organizations;
            for(var i = 0; i < $scope.organizations.length; i++){

                $scope.organizations[i].validFrom = OU.convertDate($scope.organizations[i].validFrom);

                $scope.organizations[i].validTo = OU.convertDate($scope.organizations[i].validTo);
            }
        })
        .error(function(data) {

        });*/

    var init = function() {
        Organization.getAll(function(res) {
            $scope.organizations = res;
        });
    };

    init();


    $scope.disableEditing = function () {
        $scope.canEdit = false;
        $scope.disableDetails = !$scope.canEdit;
    };

    $scope.createOrganization = function () {
        $scope.organizationSelection.selected = {
            code: null,
            description: null,
            validFrom: null,
            validTo: null,
            active: null,
            perspective: [],
            jpaId: null,
            perspectivesNeo: [],
            roots: []
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
            active: null,
            perspective: [],
            jpaId: null,
            perspectivesNeo: [],
            roots: []
        };
        $scope.objectToUpdate.code = $scope.organizationSelection.selected.code;
        $scope.objectToUpdate.description = $scope.organizationSelection.selected.description;
        $scope.objectToUpdate.validFrom = $scope.organizationSelection.selected.validFrom;
        $scope.objectToUpdate.validTo = $scope.organizationSelection.selected.validTo;
        $scope.objectToUpdate.active = true;
        Organization.createOrganization($scope.objectToUpdate, function(value) {
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
        $scope.organizationSelection.selected.perspectives
            [$scope.organizationSelection.selected.perspectives.length] = {"name": "new"};
        $scope.newTab = $scope.organizationSelection.selected.perspectives.length;

    };

    $scope.editPerspective = function () {
        $location.path(OU.url.manageOrganizationUnits); // TODO url params
    };

    $scope.saveNewPerspective = function (newPerspectiveName, index) {
        $scope.organizationSelection.selected.perspectives[index].name = newPerspectiveName;
    };

}]);