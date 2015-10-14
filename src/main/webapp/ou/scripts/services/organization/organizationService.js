'use strict';

ouModule
    .factory('Organization', ['$resource', function ($resource) {
        return $resource('app/rest/organization/:id', {}, {
            'getAll': {
                url: 'app/rest/organization/getAllOrganizations',
                method: 'GET',
                isArray: true
            },
            'save': {
                url: 'app/rest/organization/save',
                method: 'POST'
            },
            'publicOrganizations': {
                url: 'app/public/rest/organization/',
                method: 'GET',
                isArray: true
            }
        });
    }]);

ouModule
    .factory("ServiceSelectedOU",function(){
        return {};
    }
);

ouModule
    .factory('OrgAccount', ['$resource', function ($resource) {
        return $resource('app/rest/organization/accounts/:orgId', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    return data;
                }
            },
            'queryAvailable' : {
                url: 'app/rest/organization/availableAccounts/:orgId',
                method: 'GET',
                isArray: true
            }
        });
    }]);