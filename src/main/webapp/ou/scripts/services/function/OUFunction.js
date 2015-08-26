'use strict';

ouServices.factory('OUFunction',['$resource', function ($resource) {
    return $resource('app/rest/function/ou/:ouId', {}, {
        'delete' : {
            url: 'app/rest/function/ou/:ouId/:functionId',
            method: 'DELETE'
        }
    });
}]);