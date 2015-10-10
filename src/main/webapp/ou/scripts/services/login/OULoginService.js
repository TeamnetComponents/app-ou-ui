'use strict';
ouServices
    .factory('OULogin', ['$resource', function ($resource) {
        return $resource('app/rest/loginStep/', {}, {
            'organizations': {
                url: 'app/rest/loginStep/organizations',
                method: 'GET',
                isArray: true
            },
            'organizationalUnits': {
                url: 'app/rest/loginStep/organizationalUnits/:organizationId',
                method: 'GET',
                isArray: true
            },
            'loginWithoutOrganization': {
                url: 'app/rest/loginStep/authenticate/',
                method: 'GET'
            },
            'loginWithoutOU': {
                url: 'app/rest/loginStep/authenticate/:organizationId',
                method: 'GET'
            }
            ,
            'login': {
                url: 'app/rest/loginStep/authenticate/:organizationId/:ouId',
                method: 'GET'
            },
            'info': {
                url: 'app/rest/loginStep/authenticationInfo',
                method: 'GET'
            }
        });
    }]);