'use strict';

ouServices.factory('AccountFunction',['$resource', function ($resource) {
    return $resource('app/rest/function/account/:accountId', {}, {
        'delete' : {
            url: 'app/rest/function/account/:accountId/:functionId',
            method: 'DELETE'
        }
    });
}]);