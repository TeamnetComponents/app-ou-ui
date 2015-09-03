/**
 * Created by Radu.Hoaghe on 7/16/2015.
 */
ouControllers.controller('OrganizationController',
    ['$scope', '$http', 'OU', '$location', 'OrganizationalUnit', 'Organization', 'Notification', 'Perspective', 'ServiceSelectedOU',
        function ($scope, $http, OU, $location, OrganizationalUnit, Organization, Notification, Perspective, ServiceSelectedOU) {

            $scope.organizationSelection = {};
            $scope.disableDetails = true;
            //$scope.newPerspectiveName = null;
            //$scope.newPerspectiveDescription = null;
            $scope.newTab = -1;
            $scope.canEdit = false;
            $scope.invalidForm = false;
            $scope.selectedPerspective = {
                id: null,
                code: null,
                description: null
            };
            $scope.canEditPerspective = false;
            $scope.selectedPerspectiveOuTree = [];

            $scope.getTree = function () {
                OrganizationalUnit.getTree(
                    {id: $scope.selectedPerspective.ouTreeRoot.id},
                    function (data) {
                        $scope.selectedPerspectiveOuTree = data;
                    }
                );
            };

            $scope.$on('onSelectTreeNode', function (e, data) {
                if (data !== undefined && data !== null && data.id !== undefined && data.id !== null) {
                    ServiceSelectedOU.ouId = data.id;
                    ServiceSelectedOU.perspectiveId = $scope.selectedPerspective.id;
                    ServiceSelectedOU.organizationId = $scope.organizationSelection.selected.id;

                    $location.path('/organizationalUnit').search({param: 'value'});
                }
            });

            var init = function () {
                Organization.getAll(function (res) {
                    $scope.organizations = res;
                });
            };

            init();

            $scope.selectPerspective = function (index) {
                $scope.selectedPerspective = angular.copy($scope.organizationSelection.selected.perspectives[index]);
                $scope.selectedPerspectiveOuTree = [];
                $scope.getTree();
            };

            $scope.clearSelectedPerspective = function () {
                $scope.selectedPerspective = {
                    id: null,
                    code: null,
                    description: null
                };
            };

            $scope.clearSelected = function () {
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

            $scope.refresh = function () {
                init();
            };

            $scope.selectOrganization = function () {
                $scope.canEdit = false;
                $scope.disableDetails = !$scope.canEdit;
                $scope.getPerspectivesByOrganization();

                $scope.canEditPerspective = false;
                $scope.selectedPerspectiveOuTree = [];
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

            $scope.getPerspectivesByOrganization = function () {
                Perspective.getByOrganizationId({id: $scope.organizationSelection.selected.id}, function (res) {
                    $scope.organizationSelection.selected.perspectives = angular.copy(res);
                    var perspectiveIndex = $scope.organizationSelection.selected.perspectives.length;
                    $scope.selectPerspective(perspectiveIndex - 1);
                });
            };

            $scope.saveOrganization = function () {
                $scope.organizationSelection.selected.active = true;

                Organization.save($scope.organizationSelection.selected, function (value) {
                    if ($scope.organizationSelection.selected.id != null) {
                        Notification.success('Organization updated');
                    }
                    else {
                        Notification.success('Organization created');
                    }
                    $scope.organizationSelection.selected = value;
                    $scope.refresh();
                    $scope.back();
                }, function (error) {
                    Notification.error(error.data.error);
                });
            };

            $scope.deleteOrganization = function () {
                Organization.delete(
                    {id : $scope.organizationSelection.selected.id},
                    function (value) {
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
                var perspectivesLength = 0;
                if ($scope.organizationSelection.selected.perspectives != null) {
                    perspectivesLength = $scope.organizationSelection.selected.perspectives.length;
                } else {
                    $scope.organizationSelection.selected.perspectives = [];
                }
                $scope.organizationSelection.selected.
                    perspectives[perspectivesLength] = {code: "new", description: ""};
                $scope.newTab = perspectivesLength;

                $scope.clearSelectedPerspective();

            };

            $scope.editPerspective = function () {
                $scope.canEditPerspective = true;
            };

            $scope.deletePerspective = function () {
                Perspective.delete($scope.selectedPerspective, function () {
                    Notification.success("Perspective deleted");
                    $scope.getPerspectivesByOrganization();
                }, function (httpResponse) {
                    Notification.error('Forbidden operation!');
                });
            };

            $scope.savePerspective = function (index) {

                $scope.organizationSelection.selected.perspectives[index] = angular.copy($scope.selectedPerspective);

                var perspective = {
                    id: $scope.selectedPerspective.id,
                    code: $scope.selectedPerspective.code,
                    description: $scope.selectedPerspective.description,
                    organization: {},
                    ouTreeRoot: {}
                };

                perspective.organization = angular.copy($scope.organizationSelection.selected);
                perspective.ouTreeRoot = angular.copy($scope.selectedPerspective.ouTreeRoot);
                perspective.organization.perspectives = null;
                if ($scope.selectedPerspective.id != null) {
                    Perspective.update(perspective, function (value) {
                        Notification.success('Perspective updated');
                        $scope.getPerspectivesByOrganization();
                    }, function (error) {
                        Notification.error("Perspective save failed!");
                    });
                } else {
                    Perspective.save(perspective, function (value) {
                        Notification.success('Perspective created');
                        $scope.getPerspectivesByOrganization();
                    }, function (error) {
                        Notification.error(error);
                    });
                }

                $scope.canEditPerspective = false;
            };
        }]);
