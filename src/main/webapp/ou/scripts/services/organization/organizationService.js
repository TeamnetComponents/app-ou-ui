'use strict';

ouModule
    .factory('Organization', ['$resource', function ($resource) {
        return $resource('app/rest/organization/:id', {}, {
            'getAll': {
                url: 'app/rest/organization/getAllOrganizations',
                method: 'GET',
                isArray: true
            },
            'update': {
                url: 'app/rest/organization/saveOrganization',
                method: 'PUT'
            },
            'save': {
                url: 'app/rest/organization/saveOrganization',
                method: 'POST'
            }
        });
    }]);