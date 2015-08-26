/**
 * Created by Radu.Hoaghe on 7/16/2015.
 */
ouControllers.controller('OrganizationController', ['$scope', '$http', 'OU', '$location', 'Organization', 'Notification', 'Perspective',
    function ($scope, $http, OU, $location, Organization, Notification,Perspective) {

        $scope.organizationSelection = {};
        $scope.disableDetails = true;
        $scope.newPerspectiveName = null;
        $scope.newTab = -1;
        $scope.canEdit = false;
        $scope.invalidForm = false;

        var init = function () {
            Organization.getAll(function (res) {
                $scope.organizations = res;
            });
        };

        init();

        $scope.clearSelected = function() {
            $scope.organizationSelection.selected = {
                id: null,
                code: null,
                description: null,
                validFrom: null,
                validTo: null,
                active: null,
                perspectives: [],
                perspectivesNeo: [],
                roots: []
            };
        };

        $scope.refresh = function() {
            init();
        };

        $scope.disableEditing = function () {
            $scope.canEdit = false;
            $scope.disableDetails = !$scope.canEdit;
            $scope.getPerspectivesByOrganization();

        };

        $scope.createOrganization = function () {
            $scope.clearSelected();
            $scope.savedObject = jQuery.extend(true, {}, $scope.organizationSelection.selected);
            $scope.canEdit = true;
            $scope.disableDetails = !$scope.canEdit;
            $scope.refresh();
        };

        $scope.editOrganization = function () {

            $scope.savedObject = jQuery.extend(true, {}, $scope.organizationSelection.selected);
            $scope.canEdit = true;
            $scope.disableDetails = !$scope.canEdit;
        };

        $scope.getPerspectivesByOrganization = function(){
            Perspective.getByOrganizationId({id: $scope.organizationSelection.selected.id}, function(res) {
                $scope.organizationSelection.selected.perspectives = angular.copy(res);
            });
        };

        $scope.saveOrganization = function () {
            $scope.organizationSelection.selected.active = true;

            Organization.save($scope.organizationSelection.selected, function (value) {
                if ($scope.organizationSelection.selected.neoId != null) {
                    Notification.success('Organization updated');
                }
                else {
                    Notification.success('Organization created');
                }
                $scope.organizationSelection.selected = value;
                //$scope.getPerspectivesByOrganization();
                $scope.refresh();
            }, function (error) {
                Notification.error(error.data.error);
            });
        };

        $scope.deleteOrganization = function () {
            Organization.delete($scope.organizationSelection.selected, function (value) {
                Notification.success('Organization deleted');
                $scope.canEdit = false;
                $scope.disableDetails = !$scope.canEdit;
                $scope.back();
                $scope.refresh();

            }, function (error) {
                Notification.error(error.data.error);
            });
        };

        /**
         * Pentru salvarea datelor folosesc un deep copy oferit de jquery, iar la click pe back
         * se face referinta catre acel obiect.
         */
        $scope.back = function () {
            $scope.canEdit = false;
            $scope.disableDetails = !$scope.canEdit;
            $scope.organizationSelection.selected = $scope.savedObject;
        };

        $scope.addPerspective = function () {
            $scope.organizationSelection.selected.
                perspectives[$scope.organizationSelection.selected.perspectives.length] = {code: "new", description: ""};
            $scope.newTab = $scope.organizationSelection.selected.perspectives.length;

        };

        $scope.editPerspective = function () {
            $location.path(OU.url.manageOrganizationUnits); // TODO url params
        };

        $scope.saveNewPerspective = function (newPerspectiveCode, newPerspectiveDescription, index) {

            $scope.organizationSelection.selected.perspectives[index] = {
                code : newPerspectiveCode,
                description : newPerspectiveDescription
            };

            var perspective = {
                code : newPerspectiveCode,
                description : newPerspectiveDescription,
                organizationDto : {}
            };
//            perspective.organizationDto.perspectives = null;


            angular.copy($scope.organizationSelection.selected,perspective.organizationDto);
            perspective.organizationDto.perspectives = null;

            Perspective.save(perspective, function (value) {
                Notification.success('Permission created');

                $scope.getPerspectivesByOrganization();

            }, function (error) {
                Notification.error(error);
            });
        };

    }]);
