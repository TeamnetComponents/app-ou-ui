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