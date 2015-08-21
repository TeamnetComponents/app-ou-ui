'use strict';

ouServices.factory('Function',['$resource', function ($resource) {
    return $resource('app/rest/function/:functionId', {}, {
        'update' : {
            method: 'PUT'
        }
    });
}]);