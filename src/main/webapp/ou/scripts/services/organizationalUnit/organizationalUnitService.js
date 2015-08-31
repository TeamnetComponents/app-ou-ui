'use strict';

ouServices
    .factory("OrganizationalUnit", ['$resource', '$http', '$q', 'OU', function ($resource, $http, $q, OU) {
        return $resource('app/rest/organizationalUnit/:id', {}, {
            'update': {
                method: 'PUT'
            },
            'getTree' : {
                url: 'app/rest/organizationalUnit/getTree/:id',
                method: 'GET',
                isArray: true,
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            }
        });
    }]);