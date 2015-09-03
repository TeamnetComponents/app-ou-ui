'use strict';

ouServices.factory('OUAccount',['$resource', function ($resource) {
    return $resource('app/rest/organizationalUnit/accounts/:ouId', {}, {
        'queryEligible' : {
            url: 'app/rest/organizationalUnit/eligibleAccounts/:ouId',
            method: 'GET',
            isArray: true
        },
        'getAllByAccountId' :{
            url: 'app/rest/organizationalUnit/allByAccountId/:accountId',
            method: 'GET',
            isArray: true
        }
    });
}]);