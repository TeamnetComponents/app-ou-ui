'use strict';

ouServices
    .factory("OrganizationalUnit", ['$resource', '$http', '$q', 'OU', function ($resource, $http, $q, OU) {
        return $resource('app/rest/organizationalUnit/:id', {}, {
            'update': {
                method: 'PUT'
            },
            'getParentOrgUnitsById': {
                url : 'app/rest/organizationalUnit/getParentOrgUnitsById/:rootId/:id',
                method: 'GET',
                isArray: true,
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'getTree' : {
                url: 'app/rest/organizationalUnit/getTree/:id',
                method: 'GET',
                isArray: true,
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'getPublicOUs': {
                url : 'app/public/rest/ou/:organizationId/',
                method: 'GET',
                isArray: true
            }
        });
    }]);