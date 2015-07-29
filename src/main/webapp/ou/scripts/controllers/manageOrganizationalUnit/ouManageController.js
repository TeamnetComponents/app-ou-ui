/**
 * Created by Radu.Hoaghe on 7/16/2015.
 */
ouControllers.controller('ouManageController', ['$scope', '$http', function ($scope, $http) {
    $scope.departmentSelection = {};
    $scope.disableDetails = false;

    $http.get('/ou/scripts/controllers/manageOrganizationalUnit/ouManage.json')
        .success(function(data) {
            $scope.departments = data.content.organizations;
        })
        .error(function(data) {

        });

    //$scope.departmentWasSelected = $scope.departmentSelection.selected != null ||
    //                                $scope.departmentSelection.selected != undefi
    
    $scope.createOrganization = function () {
    }

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