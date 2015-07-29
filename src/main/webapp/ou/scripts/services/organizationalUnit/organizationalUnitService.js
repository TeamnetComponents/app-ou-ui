'use strict';

ouServices
    .factory("organizationalUnitService", ['$resource', '$http', '$q', function ($resource, $http, $q) {

        function handleSuccess(response) {
            return (response.data);
        }

        function handleError(response) {
            if (!angular.isObject(response.data) || !response.data.message) {
                return ($q.reject("An unknown error occurred."));
            }

            return ($q.reject(response.data.message));
        }

        function getAllOu() {
            var request = $http({
                method: "GET",
                url: '/ou/scripts/controllers/organizationalUnit/orgUnit.json'
            });
            return (request.then(handleSuccess, handleError));
        }

        return {
            getAllOu: getAllOu
        }
    }]);