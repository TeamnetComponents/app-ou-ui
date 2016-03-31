ouControllers.controller('SyncController',
    ['$scope', 'Sync', function ($scope, Sync) {
        $scope.status = null;

        $scope.synchronizeDb = function () {
            if ($scope.status != 'pending') {
                $scope.status = 'pending';

                Sync.syncDb({}, function (status) {
                    $scope.status = 'ok';
                }, function (error) {
                    switch (error.status) {
                        case 409:
                            $scope.status = 'already';
                            break;
                        default:
                            $scope.status = 'error';
                    }
                });
            }
        };
}]);