/**
 * Created by Radu.Hoaghe on 7/16/2015.
 */
ouControllers.controller('ouManageController', ['$scope', '$http', 'OU', '$location', function ($scope, $http, OU, $location) {
    $scope.departmentSelection = {};
    $scope.disableDetails = false;
    $scope.newPerspectiveName = "";
    $scope.newTab = -1;
    $scope.editUrl = OU.url.manageOrganizationUnits;

    $http.get('/ou/scripts/controllers/manageOrganizationalUnit/ouManage.json')
        .success(function(data) {
            $scope.departments = data.content.organizations;
        })
        .error(function(data) {

        });

    if($scope.departmentSelection.selected != null &&
        $scope.departmentSelection.selected != undefined){
        var a = 1;
    }
    
    $scope.createOrganization = function () {
    }

    $scope.addPerspective = function () {
        $scope.departmentSelection.selected.perspectives
            [$scope.departmentSelection.selected.perspectives.length] = {"name": "new"};
        $scope.newTab = $scope.departmentSelection.selected.perspectives.length;

    };

    $scope.editPerspective = function () {
        $location.path(OU.url.manageOrganizationUnits); // TODO url params
    };

    $scope.saveNewPerspective = function (newPerspectiveName, index) {
        $scope.departmentSelection.selected.perspectives[index].name = newPerspectiveName;
    };

    //$scope.myFunction = function (data) {
    //    $scope.token = data;
    //}
    //
    //$scope.submit = function () {
    //
    //    if ($scope.token != null || $scope.token != undefined) {
    //        $http.post('/upload/sendToken', $scope.token)
    //            .success(function (response) {
    //                console.log(response.response);
    //            })
    //            .error(function (response) {
    //                console.log(response.response);
    //            })
    //    } else {
    //        window.alert("Please upload file!");
    //    }
    //}
}]);