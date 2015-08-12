'use strict';

ouModule
    .factory('OuManage', ['$resource', function ($resource) {
        return $resource('app/rest/organization/:id', {}, {
            'getAll': {
                url: 'app/rest/organization/getAll',
                method: 'GET',
                isArray: true
            },
            'update': {
                method: 'PUT'
            },
            'createOrganization': {
                url: 'app/rest/organization/createOrganization',
                method: 'POST'
            }
        });
    }]);