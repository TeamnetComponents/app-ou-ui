var ouModule = angular.module('ouModule', ['ouControllers', 'ouServices', 'ouDirectives', 'ouConstants', 'ouFilters']);
ouModule
    .config(function ($routeProvider, $httpProvider, $translateProvider, $translatePartialLoaderProvider, tmhDynamicLocaleProvider, AUTH_BOOTSTRAP) {
        console.log('ou Module loading!!!');

        // include i18n files
        $translatePartialLoaderProvider.addPart('/ou/i18n/ou_');

        //place some routes here
        $routeProvider
            .when('/manageAccounts', {
                templateUrl: 'ou/views/account/manageAccount.html',
                controller: 'ManageAccountController',
                access: {
                    authorizedModules: [AUTH_BOOTSTRAP.all]
                }
            })
            .when('/organizationalUnit', {
                templateUrl: 'ou/views/organizationalUnit/organizationalUnit.html',
                controller: 'organizationalUnitController',
                access: {
                    authorizedModules: [AUTH_BOOTSTRAP.all]
                }
            })
            .when('/organizationUnit/manage', {
                templateUrl: 'ou/views/organization/manageOrganization.html',
                controller: 'OrganizationController',
                access: {
                    authorizedModules: [AUTH_BOOTSTRAP.all]
                }
            }).when('/functions', {
                templateUrl: 'ou/views/function/function.html',
                controller: 'FunctionController',
                access: {
                    authorizedModules: [AUTH_BOOTSTRAP.all]
                }
            }).when('/ouLoginStep', {
                templateUrl: 'ou/views/login/ouLoginStep.html',
                controller: 'OULoginController',
                access: {
                    authorizedModules: [AUTH_BOOTSTRAP.all]
                }
            }).when('/ouLoginSwitcher', {
                templateUrl: 'ou/views/login/ouLoginSwitcher.html',
                controller: 'OULoginController',
                access: {
                    authorizedModules: [AUTH_BOOTSTRAP.all]
                }
            })
    }).run(function ($rootScope, $location, OuAccountService) {

        var checkAuthorities = function(args, ouAccount) {
            if ((args.moduleRights.function_READ_ACCESS != null) || (ouAccount != null
                && ouAccount.moduleRights.function_READ_ACCESS != null)) {
                $rootScope.checkIfAccountFunctionHaveRights = true;
            } else {
                $rootScope.checkIfAccountFunctionHaveRights = false;
            }

            if ((args.moduleRights.organization_READ_ACCESS != null) || (ouAccount != null
                && ouAccount.moduleRights.organization_READ_ACCESS != null)) {
                $rootScope.organizationIsEnable = true;
            } else {
                $rootScope.organizationIsEnable = false;
            }

            if ((args.moduleRights.organizationalUnit_READ_ACCESS != null) || (ouAccount != null
                && ouAccount.moduleRights.organizationalUnit_READ_ACCESS != null)) {
                $rootScope.organizationalUnitIsEnable = true;
            } else {
                $rootScope.organizationalUnitIsEnable = false;
            }

            if ((args.moduleRights.SETTINGS_READ_ACCESS != null) || (ouAccount != null
                && ouAccount.moduleRights.SETTINGS_READ_ACCESS != null)) {
                $rootScope.hasSettingsAccess = true;
            }
        };

        $rootScope.ouEnabled = true;

        $rootScope.$on("event:get-account-information", function (event, args) {
            var ouAccount = null
            OuAccountService.getCurrUserWithOuAuth(
                function (data) {
                    ouAccount = data;
                    checkAuthorities(args, ouAccount);
                },
                function (error) {
                    checkAuthorities(args, ouAccount);
                });
        });

        $rootScope.loginExtensionTpl = "ou/views/login/organizationLogin.html"

        if ($rootScope.finalStep === undefined) {
            $rootScope.finalStep = 1;
        }
        if ($rootScope.ouLoginStep === undefined) {
            $rootScope.ouLoginStep = 1;
        }

        // Call when the authentication flow is complete
        $rootScope.$on('event:auth-login-step' + $rootScope.ouLoginStep, function (event, pathParameters) {
            $rootScope.ouLoginInfo = {pathParams: pathParameters};
            $location.path('/ouLoginStep').replace();
        });

    });