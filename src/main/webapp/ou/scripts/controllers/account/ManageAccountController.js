/**
 * Created by Spoiala.Marian on 10/15/15.
 */
bootstrapControllers
    .controller('ManageAccountController', ['$scope', '$rootScope', '$http', '$q', 'Notification',
        '$animate', 'OuAccountService',
        function ($scope, $rootScope, $http, $q, Notification, $animate, OuAccountService) {

            $scope.accounts = [];
            $scope.selectedAccount = {};

            $scope.search = '';
            $scope.selectedSearch = '';

            $scope.isView = true;
            $scope.isEdit = false;

            $scope.loading = false;

            $scope.isSelected = function (account) {
                return account.id === $scope.selectedAccount.id;
            };

            $scope.selectAccount = function (account) {
                $scope.loading = true;
                OuAccountService.getByLogin({login: account.username}, function (res) {
                    $scope.$broadcast('onSelectAccount', res.id);
                    $scope.selectedAccount = res;
                });
            };

            $scope.editAccount = function () {
                $scope.isView = false;
                $scope.isEdit = true;
            };

            $scope.saveAccount = function () {
                $scope.$broadcast('onSaveAccount', $scope.selectedAccount.id);
            };

            $scope.backAccount = function () {
                $scope.isView = true;
                $scope.isEdit = false;

                if ($scope.selectedAccount.id != undefined) {
                    $scope.selectAccount($scope.selectedAccount);
                } else if (!_.isEmpty($scope.account)) {
                    $scope.selectAccount($scope.accounts[0]);
                }
            };

            $scope.startFnc = function () {
                arguments[0].target.style.visibility = 'hidden';
            };

            $scope.stopFnc = function () {
                arguments[0].target.style.visibility = '';
            };

            var init = function () {
                OuAccountService.getAll(function (res) {
                    $scope.accounts = res;
                });
            };

            init();
        }]);