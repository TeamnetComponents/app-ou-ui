/**
 * Created by Radu.Hoaghe on 7/16/2015.
 */
ouControllers.controller('OrganizationController', ['$scope', '$http', 'OU', '$location', 'Organization', 'Notification',
    function ($scope, $http, OU, $location, Organization, Notification) {

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
                neoId: null,
                jpaId: null,
                code: null,
                description: null,
                validFrom: null,
                validTo: null,
                active: null,
                perspective: [],
                perspectivesNeo: [],
                roots: []
            };
        }

        $scope.refresh = function() {
            init();
        };

        $scope.disableEditing = function () {
            $scope.canEdit = false;
            $scope.disableDetails = !$scope.canEdit;
        };

        $scope.createOrganization = function () {
            $scope.clearSelected();
            $scope.savedObject = jQuery.extend(true, {}, $scope.organizationSelection.selected);
            $scope.canEdit = true;
            $scope.disableDetails = !$scope.canEdit;
        };

        $scope.editOrganization = function () {
            $scope.savedObject = jQuery.extend(true, {}, $scope.organizationSelection.selected);
            $scope.canEdit = true;
            $scope.disableDetails = !$scope.canEdit;
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
                $scope.organizationSelection.selected = $scope.clearSelected;
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