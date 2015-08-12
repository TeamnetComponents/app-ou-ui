'use strict';

ouServices
    .factory("organizationalUnitService", ['$resource', '$http', '$q', 'OU', function ($resource, $http, $q, OU) {

        return $resource('app/rest/organizationalUnit/:id', {}, {
            'getById': {
                method: 'GET'
            },
            'getAll': {
                url: 'app/rest/organizationalUnit/getAll',
                method: 'GET',
                isArray: true
            },
            'update': {
                method: 'PUT'
            }
        });
    }]);