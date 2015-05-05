ouServices.factory('ouMainService', ['$resource', function ($resource) {
    return $resource('app/rest/main', {}, {
    });
}]);