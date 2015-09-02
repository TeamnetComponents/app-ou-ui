'use strict';
ouServices
    .factory('OrganizationalUnitHierarchyFilter', ['$resource', function($resource) {
        return $resource('/app/rest/organizationalUnitHierarchyFilter', {}, {
            'getOrganizationalUnitsForCurrentUser': {
                method: "GET",
                isArray: true
            }
        });
    }]);