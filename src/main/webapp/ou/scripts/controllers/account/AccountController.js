 'use strict';

ouControllers.controller('OuAccountController', ['$scope', '$http', '$q', 'Notification', '$animate', 'Function', 'AccountFunction', 'OU','OUAccount',
    function ($scope, $http, $q, Notification, $animate, Function, AccountFunction, OU, OUAccount) {
        $scope.functionTpl = OU.template.functionsTab;
        $scope.ouTpl = OU.template.accountOusTab;

        $scope.availableFunctions = [];
        $scope.accountFunctions = [];
        $scope.selectedFunctions = [];
        $scope.selectedOUs = [];

        $scope.$on('onSelectAccount', function(event, accountId){
            AccountFunction.query({accountId:accountId}, function(data){
                $scope.accountFunctions = data;
                $scope.selectedFunctions = angular.copy($scope.accountFunctions);
                $scope.availableFunctions = angular.copy($scope.allFunctions);
                $scope.accountFunctions.forEach(function(item){
                    var idx = angularIndexOf($scope.availableFunctions, item);
                    if(idx > -1){
                        $scope.availableFunctions.splice(idx, 1);
                    }
                });
            });

            OUAccount.getAllByAccountId({accountId:accountId}, function(data){
                $scope.selectedOUs = data;
            });

        });

        $scope.$on('onSaveAccount', function(event, accountId){
            $scope.selectedFunctions.forEach(function(selectedFunction){
                if (angularIndexOf($scope.accountFunctions, selectedFunction) < 0) {
                    AccountFunction.save({accountId: accountId}, selectedFunction,
                        function(successData) {
                            Notification.success('Account functions updated!');
                        },
                        function(errorData) {
                            Notification.error('Error updating account functions!');
                        });
                }
            });
            $scope.accountFunctions.forEach(function(accountFunction){
                if (angularIndexOf($scope.selectedFunctions, accountFunction) < 0) {
                    AccountFunction.delete({accountId: accountId, functionId: accountFunction.id},
                        function(successData) {
                            Notification.success('Account functions updated!');
                        },
                        function(errorData) {
                            Notification.error('Error updating account functions!');
                        });
                }
            });
        });

        var angularIndexOf = function (array, elem) {
            for (var x = 0; x < array.length; x++) {
                if (angular.equals(array[x].id, elem.id))
                    return x;
            }
            return -1;
        };

        var init = function () {
            Function.query(function (res) {
                $scope.allFunctions = res;
            });
        };
        init();
    }
]);
