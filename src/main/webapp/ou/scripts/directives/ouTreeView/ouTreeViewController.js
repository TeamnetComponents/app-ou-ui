ouControllers.
    controller('ouTreeViewController', ['$scope', '$location', function ($scope, $location) {

        $scope.isShowExpandCollapse = false;

        $scope.remove = function (scope) {
            scope.remove();
        };

        $scope.createTreeRoot = function () {
            $scope.$emit('onCreateTreeNode', null);
        };

        $scope.createTreeNode = function (item) {
            $scope.$emit('onCreateTreeNode', item);
        };

        $scope.selectTreeNode = function(item) {
            $scope.$emit('onSelectTreeNode', item);
        };


        $scope.deleteTreeNode = function (item) {
            $scope.$emit('onDeleteTreeNode', item);
        };


    }]);