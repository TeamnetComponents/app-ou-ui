/**
 * Created by Marian.Spoiala on 8/20/2015.
 */
'use strict';

ouServices
    .factory("PerspectiveService", ['$resource', function ($resource) {

        return $resource('app/rest/perspective/:id', {}, {
            'getByOrganizationId': {
                url: 'app/rest/perspective/getByOrganizationId/:id',
                method: 'GET'
            }
        });
    }]);