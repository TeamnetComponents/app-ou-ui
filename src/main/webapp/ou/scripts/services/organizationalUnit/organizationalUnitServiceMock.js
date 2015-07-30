'use strict';

ouServices
    .factory("organizationalUnitServiceMock", function() {
        var organizationalUnitList = [
            {
                id: "0",
                name: "Ou 1",
                description: "Organizational unit 1",
                functions: [
                    {
                        "id":1,
                        "code":"Function_Admin",
                        "description":"Admin Function",
                        "validFrom":"2012-07-08",
                        "validTo":"2050-05-03",
                        "active":true,
                        "moduleRights": [
                            {
                                "id":12,
                                "version":1,
                                "right":1,
                                "moduleRightCode": "READ_ACCESS"
                            },
                            {
                                "id":11,
                                "version":1,
                                "right":1,
                                "moduleRightCode":"READ_ACCESS"
                            }]
                    }
                ],
                accounts: [
                    {
                        "id":1,
                        "login":"user",
                        "firstName":"User",
                        "lastName":"User",
                        "email":"user@email.com",
                        "activated":true,
                        "langKey":"en",
                        "activationKey":null,
                        "gender":null,
                        "roles":null,
                        "moduleRights":null
                    }
                ],
                items: [
                    {
                        "id": 11,
                        "code": "1.1. tofu-animation",
                        "description": "1.1. tofu-animation",
                        "validFrom": "10/05/2014",
                        "validTo": "10/02/2015",
                        "items": [
                            {
                                "id": 111,
                                "code": "1.1.1. spooky-giraffe",
                                "description": "1.1.1. spooky-giraffe",
                                "validFrom": "10/05/2014",
                                "validTo": "10/10/2015",
                                "items": []
                            },
                            {
                                "id": 112,
                                "code": "1.1.2. bubble-burst",
                                "description": "1.1.2. bubble-burst",
                                "validFrom": "10/04/2014",
                                "validTo": "10/03/2015",
                                "items": []
                            }
                        ]
                    },
                    {
                        "id": 12,
                        "code": "1.2. barehand-atomsplitting",
                        "description": "1.2. barehand-atomsplitting",
                        "validFrom": "10/05/2014",
                        "validTo": "10/10/2015",
                        "items": [
                            {
                                "id": 121,
                                "code": "1.2.1. vegetarian rat",
                                "description": "1.2.1. vegetarian rat",
                                "validFrom": "10/04/2014",
                                "validTo": "10/03/2015",
                                "items": []
                            }
                        ]
                    }
                ]
            },
            {
                id: "1",
                name: "Ou 2",
                description: "Organizational unit 2",
                items: [
                    {
                        "id": 11,
                        "code": "1.1. tofu-animation",
                        "description": "1.1. tofu-animation",
                        "validFrom": "10/05/2014",
                        "validTo": "10/02/2015",
                        "items": [
                            {
                                "id": 111,
                                "code": "1.1.1. spooky-giraffe",
                                "description": "1.1.1. spooky-giraffe",
                                "validFrom": "10/05/2014",
                                "validTo": "10/10/2015",
                                "items": [
                                    {
                                        "id": 1111,
                                        "code": "1.2. barehand-atomsplitting",
                                        "description": "1.2. barehand-atomsplitting",
                                        "validFrom": "10/05/2014",
                                        "validTo": "10/10/2015",
                                        "items": []
                                    }
                                ]
                            },
                            {
                                "id": 112,
                                "code": "1.1.2. bubble-burst",
                                "description": "1.1.2. bubble-burst",
                                "validFrom": "10/04/2014",
                                "validTo": "10/03/2015",
                                "items": []
                            }
                        ]
                    },
                    {
                        "id": 12,
                        "code": "1.2. barehand-atomsplitting",
                        "description": "1.2. barehand-atomsplitting",
                        "validFrom": "10/05/2014",
                        "validTo": "10/10/2015",
                        "items": []
                    }
                ]
            }
        ];
        var getAllOU = function(cfg, callback) {
            if(typeof(cfg) == 'function') {
                cfg(organizationalUnitList);
            }else{
                callback(organizationalUnitList);
            }
        };
        var getOUByCode = function(ou, callback) {
            for (var i = 0; i<organizationalUnitList.length; i++) {
                if(angular.equals(organizationalUnitList[i].code, ou.code)) {
                    callback(organizationalUnitList[i]);
                    break;
                }
            }
            //organizationalUnitList.forEach(function (item) {
            //    if (angular.equals(item.code, ou.code)) {
            //        callback(item);
            //    }
            //})
        };


        return {
            'getAllOrganizationalUnits' : getAllOU,
            'getByCode'                 : getOUByCode,
            'updateOrganizationalUnit'  : {method : 'PUT'}
        }
    });