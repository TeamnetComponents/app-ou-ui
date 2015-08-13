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
                url: 'app/rest/organization/saveOrganization',
                method: 'POST'
            },
            'delete': {
                url: 'app/rest/organization/deleteOrganization',
                method: 'POST'
            }
        });
    }]);