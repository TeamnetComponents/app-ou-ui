'use strict';

ouServices.factory('AccountFunction',['$resource', function ($resource) {
    return $resource('app/rest/accountfunction/account/:accountId', {}, {
        'delete' : {
            url: 'app/rest/accountfunction/account/:accountId/:functionId',
            method: 'DELETE'
        }
    });
}]);