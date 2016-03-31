'use strict';

ouServices.factory('Sync',['$resource', function ($resource) {
    return $resource('app/rest/organization/account/', {}, {
        'syncDb' : {
            url: 'app/rest/dbSynchronization/syncNeo',
            method: 'POST'
        }
    });
}]);