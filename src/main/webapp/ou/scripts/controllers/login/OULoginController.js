ouControllers.controller('OULoginController', [
    '$scope', '$rootScope', 'OULogin',
    function ($scope, $rootScope, OULogin) {
        $scope.isFinalStep = function () {
            return $rootScope.ouLoginStep === $rootScope.finalStep;
        };

        var init = function () {
            $scope.selection = {organization: {}, organizationalUnit: {}};
            $scope.showOUs = false;
            if ($rootScope.ouLoginInfo === undefined) {
                $rootScope.ouLoginInfo = {};
            }
            OULogin.organizations(function (res) {
                if (res.length == 0) {
                    loginOrGoToNextStep();
                }
                else {
                    $scope.accountOrganizations = res;
                    OULogin.info({}, function (info) {
                        if (info.authorizedOrganization != null) {
                            $scope.selection.organization = info.authorizedOrganization;
                            $scope.selectOrganization();
                            if (info.authorizedOUs.length == 1) {
                                $scope.selection.organizationalUnit = {id: info.authorizedOUs[0].id, code: info.authorizedOUs[0].code};
                            }

                        }
                    });
                }
            });
        };

        init();

        $scope.selectOrganization = function () {
            $scope.selection.organizationalUnit = {};
            if ($scope.selection.organization == undefined || $scope.selection.organization.id === undefined) {
                $scope.showOUs = false;
                $scope.accountOUs = [];
            }
            else {
                OULogin.organizationalUnits(
                    {organizationId: $scope.selection.organization.id}, function (res) {
                        $scope.accountOUs = res;
                        $scope.showOUs = true;
                    });
            }
        };

        var login = function () {
            console.log("login finished");
            $rootScope.$broadcast('event:auth-loginComplete', $rootScope.ouLoginInfo.pathParams);
        };

        var goToNextStep = function () {
            console.log("go to next login step");
            $rootScope.$broadcast('event:auth-login-step' + ($rootScope.ouLoginStep + 1), $rootScope.ouLoginInfo.pathParams);
        };

        var loginOrGoToNextStep = function () {
            var callback = $scope.isFinalStep() ? login : goToNextStep;
            if ($scope.selection.organization == undefined || $scope.selection.organization.id === undefined) {
                OULogin.loginWithoutOrganization({}, callback);
            }
            else if ($scope.selection.organizationalUnit === undefined || $scope.selection.organizationalUnit.id === undefined) {
                OULogin.loginWithoutOU({
                    organizationId: $scope.selection.organization.id
                }, callback);
            }
            else {
                OULogin.login({
                    organizationId: $scope.selection.organization.id,
                    ouId: $scope.selection.organizationalUnit.id
                }, callback);
            }
        };

        $scope.proceed = loginOrGoToNextStep;
    }
]);