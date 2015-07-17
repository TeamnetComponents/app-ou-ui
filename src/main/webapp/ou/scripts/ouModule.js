var ouModule=angular.module('ouModule',['ouControllers','ouServices','ouDirectives','ouConstants']);
ouModule
    .config(function ($routeProvider, $httpProvider, $translateProvider, tmhDynamicLocaleProvider,AUTH_BOOTSTRAP) {
        console.log('ou Module loading!!!');

    //place some routes here
        $routeProvider
            .when('/organizationalUnit', {
                templateUrl: 'ou/views/organizationalUnit/organizationalUnit.html',
                controller: 'organizationalUnitController',
                access: {
                    authorizedModules: [AUTH_BOOTSTRAP.all]
                }
            })
            .when('/organizationUnit/manage', {
                templateUrl: 'ou/views/manageOrganizationUnits.html',
                controller: 'ouManageController',
                access: {
                    authorizedModules: [AUTH_BOOTSTRAP.all]
                }
            })
    });