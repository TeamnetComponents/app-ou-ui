/**
 * Created by Marian.Spoiala on 10/15/2015.
 */
'use strict';

ouServices.factory('OuAccountService',['$resource', function ($resource) {
    return $resource('app/rest/organization/account/', {}, {
        'getAll' : {
            url: 'app/rest/organization/account/getAll',
            method: 'GET',
            isArray: true
        },
        'getByLogin' : {
            url: 'app/rest/organization/account/getByLogin/:login',
            method: 'GET'
        },
        'getCurrUserWithOuAuth': {
            url: 'app/rest/organization/account/getCurrentUserWithOuAuthorities',
            method: 'GET'
        }
    });
}]);