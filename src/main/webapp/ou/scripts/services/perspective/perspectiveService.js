'use strict';

ouServices.
    factory('Perspective', ['$resource', function($resource){
        return $resource('app/rest/perspective/:id', {}, {
            'getAll': {
                url: 'app/rest/perspective/getAll',
                method: 'GET',
                isArray: true
            },
            'save': {
                url: 'app/rest/perspective',
                method: 'POST'
            },
            'update': {
                url: 'app/rest/perspective',
                method: 'PUT'
            },
            'getByOrganizationId': {
                url: 'app/rest/perspective/getByOrganizationId/:id',
                method: 'GET',
                isArray: true
            },
            'delete': {
                url: 'app/rest/perspective/delete',
                method: 'POST'
            }
        });
    }]);