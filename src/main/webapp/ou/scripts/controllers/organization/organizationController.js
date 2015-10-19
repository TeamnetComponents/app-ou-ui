/**
 * Created by Radu.Hoaghe on 7/16/2015.
 */
ouControllers.controller('OrganizationController',
    ['$scope', '$http', 'OU', '$location', 'OrganizationalUnit', 'Organization',
        'Notification', 'Perspective', 'ServiceSelectedOU', 'OrgAccount',
        function ($scope, $http, OU, $location, OrganizationalUnit, Organization,
                  Notification, Perspective, ServiceSelectedOU, OrgAccount) {

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
            $scope.orgAccounts = [];

            $scope.search = '';
            $scope.selSearch = '';

            $scope.open_validFrom = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened_validFrom = true;
            };

            $scope.open_validTo = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.opened_validTo = true;
            };

            $scope.dateOptions = {
                format: 'dd/MM/yyyy',
                formatYear: 'yyyy',
                startingDay: 1
            };

            $scope.getTree = function () {
                OrganizationalUnit.getTree(
                    {id: $scope.selectedPerspective.ouTreeRoot.id},
                    function (data) {
                        $scope.selectedPerspectiveOuTree = data;
                    }
                );
            };

            var baseTemplateUrl = 'ou/views/organization/template/';
            $scope.accountsTpl = baseTemplateUrl + 'orgaccount.tpl.html';

            $scope.$on('onSelectTreeNode', function (e, data) {
                if (data !== undefined && data !== null && data.id !== undefined && data.id !== null) {

                    ServiceSelectedOU.dataRedirect = true;
                    ServiceSelectedOU.ouId = data.id;
                    ServiceSelectedOU.perspectiveId = $scope.selectedPerspective.id;
                    ServiceSelectedOU.organizationId = $scope.organizationSelection.selected.id;

                    $location.path('/organizationalUnit').search({param: 'value'});
                }
            });

            $scope.$on('onCreateTreeNode', function (e, data) {
                /*$scope.isTreeOUSelected = true;
                initAvailableFunctionsAndAccounts();
                $scope.createNewOrgUnit();
                //Create root OU
                if (data == null) {
                    $scope.organizationalUnit.perspective = $scope.ouTree.perspective;
                }
                //Create OU
                else if (data != undefined && data != null) {
                    $scope.organizationalUnit.parent = {id: data.id, code: data.code};
                }*/

                if (data != undefined && data != null) {
                    ServiceSelectedOU.dataRedirect = true;
                    ServiceSelectedOU.ouId = null;
                    ServiceSelectedOU.perspectiveId = $scope.selectedPerspective.id;
                    ServiceSelectedOU.organizationId = $scope.organizationSelection.selected.id;
                    ServiceSelectedOU.ouParent = {id: data.id, code: data.code};

                    $location.path('/organizationalUnit');
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

            var init = function () {
                Organization.getAll(function (res) {
                    $scope.organizations = res;
                });
            };

            var angularIndexOf = function (array, elem) {
                for (var x = 0; x < array.length; x++) {
                    if (angular.equals(array[x].id, elem.id))
                        return x;
                }
                return -1;
            };

            $scope.startFnc = function () {
                arguments[0].target.style.visibility = 'hidden';
            };

            $scope.stopFnc = function () {
                arguments[0].target.style.visibility = '';
            };

            var initAvailableFunctionsAndAccounts = function () {
                $scope.availableAccounts = [];
                $scope.selectedAccounts = [];
                $scope.selectedAccount = {};
            };

            initAvailableFunctionsAndAccounts();

            var getSelectedAndAvailableAccounts = function (orgId) {
                OrgAccount.query({orgId: orgId}, function (accounts) {
                    $scope.selectedAccounts = accounts;
                    OrgAccount.queryAvailable({orgId: orgId}, function (availableAccounts) {
                        $scope.availableAccounts = availableAccounts;
                        $scope.selectedAccounts.forEach(function (item) {
                            var idx = angularIndexOf($scope.availableAccounts, item);
                            if (idx > -1) {
                                $scope.availableAccounts.splice(idx, 1);
                            }
                        });
                    });
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
                getSelectedAndAvailableAccounts($scope.organizationSelection.selected.id);
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

            $scope.saveOrgAccounts = function() {
                OrgAccount.save({orgId: $scope.organizationSelection.selected.id}, $scope.selectedAccounts,
                    function (succes) {
                        Notification.success("Organization accounts save succeeded!");
                    },
                    function (error) {
                        Notification.error("Organization accounts save failed!");
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
                    $scope.saveOrgAccounts();
                    $scope.organizationSelection.selected = value;
                    $scope.refresh();

                    $scope.canEdit = false;
                    $scope.disableDetails = !$scope.canEdit;
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
