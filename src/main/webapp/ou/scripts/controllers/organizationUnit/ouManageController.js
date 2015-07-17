/**
 * Created by Radu.Hoaghe on 7/16/2015.
 */
ouControllers.controller('ouManageController', ['$scope', function ($scope) {
    $scope.departmentSelection = {};

    $scope.departments = [
        {
            name: "Departament 1"
        },
        {
            name: "Departament 2"
        },
        {
            name: "Departament 3"
        },
        {
            name: "Departament 4"
        }
    ];
    $scope.departmentSelection.selected = $scope.departments[0];
    
    $scope.createOrganization = function () {
        
    }
}]);