ouControllers.controller('LoginExtensionController', [
    '$scope', '$rootScope', 'Organization',
    function ($scope, $rootScope, Organization) {
        var init = function () {
            $scope.selection = {organization: {}};
            Organization.publicOrganizations(function (res) {
                $scope.publicOrganizations = res;
            });
        };
        init();
        $scope.selectOrganization = function(){
            console.log($scope.selection.organization);
            $rootScope.extraDetails = $scope.selection.organization.id;
        };
    }
]);

