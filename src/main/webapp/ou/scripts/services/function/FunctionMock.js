'use strict';

ouModule
    .factory('FunctionMock', function () {
        var something =
            [{
                "id": 2,
                "code": "Org 2",
                "description": "Org description for 2nd",
                "validFrom": null,
                "validTo": null,
                "active": null,
                "jpaId": null,
                "perspectives": null,
                "roots": null
            }, {
                "id": 1,
                "code": "Org 1",
                "description": "Org description for 1st",
                "validFrom": null,
                "validTo": null,
                "active": null,
                "jpaId": null,
                "perspectives": [{
                    "id": 1,
                    "code": "Persp 1",
                    "description": "Persp description for 1st",
                    "jpaId": null,
                    "organization": null,
                    "organizationalUnit": null,
                    "organizationalUnitSet": [{
                        "id": 1,
                        "code": "Organizational Unit 1",
                        "description": "Org Unit",
                        "validFrom": 1444424400000,
                        "validTo": 1444424400000,
                        "active": null,
                        "perspective": null,
                        "jpaId": null,
                        "parent": null,
                        "children": [],
                        "accounts": [],
                        "organizationalUnitFunctions": []
                    }, {
                        "id": 1,
                        "code": "Organizational Unit 1",
                        "description": "Org Unit",
                        "validFrom": 1444424400000,
                        "validTo": 1444424400000,
                        "active": null,
                        "perspective": null,
                        "jpaId": null,
                        "parent": null,
                        "children": [{
                            "id": 1,
                            "code": "Organizational Unit 1",
                            "description": "Org Unit",
                            "validFrom": 1444424400000,
                            "validTo": 1444424400000,
                            "active": null,
                            "perspective": null,
                            "jpaId": null,
                            "parent": null,
                            "children": [],
                            "accounts": [],
                            "organizationalUnitFunctions": []
                        }, {
                            "id": 3,
                            "code": "Organizational Unit 1",
                            "description": "Org Unit",
                            "validFrom": 1444424400000,
                            "validTo": 1444424400000,
                            "active": null,
                            "perspective": null,
                            "jpaId": null,
                            "parent": null,
                            "children": [],
                            "accounts": [],
                            "organizationalUnitFunctions": []
                        }],
                        "accounts": [],
                        "organizationalUnitFunctions": []
                    }, {
                        "id": 3,
                        "code": "Organizational Unit 1",
                        "description": "Org Unit",
                        "validFrom": 1444424400000,
                        "validTo": 1444424400000,
                        "active": null,
                        "perspective": null,
                        "jpaId": null,
                        "parent": null,
                        "children": [],
                        "accounts": [],
                        "organizationalUnitFunctions": []
                    }]
                }, {
                    "id": 1,
                    "code": "Persp 1",
                    "description": "Persp description for 1st",
                    "jpaId": null,
                    "organization": null,
                    "organizationalUnit": null,
                    "organizationalUnitSet": [
                        {
                            "id": 1,
                            "code": "Organizational Unit 1",
                            "description": "Org Unit",
                            "validFrom": 1444424400000,
                            "validTo": 1444424400000,
                            "active": null,
                            "perspective": null,
                            "jpaId": null,
                            "parent": null,
                            "children": [],
                            "accounts": [],
                            "organizationalUnitFunctions": []
                        }, {
                            "id": 1,
                            "code": "Organizational Unit 1",
                            "description": "Org Unit",
                            "validFrom": 1444424400000,
                            "validTo": 1444424400000,
                            "active": null,
                            "perspective": null,
                            "jpaId": null,
                            "parent": null,
                            "children": [
                                {
                                    "id": 1,
                                    "code": "Organizational Unit 1",
                                    "description": "Org Unit",
                                    "validFrom": 1444424400000,
                                    "validTo": 1444424400000,
                                    "active": null,
                                    "perspective": null,
                                    "jpaId": null,
                                    "parent": null,
                                    "children": [],
                                    "accounts": [],
                                    "organizationalUnitFunctions": []
                                }, {
                                    "id": 3,
                                    "code": "Organizational Unit 1",
                                    "description": "Org Unit",
                                    "validFrom": 1444424400000,
                                    "validTo": 1444424400000,
                                    "active": null,
                                    "perspective": null,
                                    "jpaId": null,
                                    "parent": null,
                                    "children": [],
                                    "accounts": [],
                                    "organizationalUnitFunctions": []
                                }],
                            "accounts": [],
                            "organizationalUnitFunctions": []
                        }, {
                            "id": 3,
                            "code": "Organizational Unit 1",
                            "description": "Org Unit",
                            "validFrom": 1444424400000,
                            "validTo": 1444424400000,
                            "active": null,
                            "perspective": null,
                            "jpaId": null,
                            "parent": null,
                            "children": [],
                            "accounts": [],
                            "organizationalUnitFunctions": []
                        }]
                }],
                "roots": null
            }];
        var mockFunctions = [
            {
                "id": 1,
                "code": "Function_SYSTEM",
                "description": "System Function",
                "validFrom": "2012-07-08",
                "validTo": "2050-05-03",
                "active": true,
                "moduleRights": [
                    {
                        "id": 12,
                        "version": 1,
                        "right": 1,
                        "moduleRightCode": "READ_ACCESS"
                    },
                    {
                        "id": 11,
                        "version": 1,
                        "right": 1,
                        "moduleRightCode": "READ_ACCESS"
                    }]
            },
            {
                "id": 2,
                "code": "Function_User",
                "description": "User Function",
                "validFrom": "2012-01-01",
                "validTo": "2050-12-08",
                "active": true,
                "moduleRights": [
                    {
                        "id": 23,
                        "version": 1,
                        "right": 1,
                        "moduleRightCode": "READ_ACCESS"
                    },
                    {
                        "id": 1,
                        "version": 1,
                        "right": 1,
                        "moduleRightCode": "READ_ACCESS"
                    }]
            }];
        var getFunction = function (query, callback) {
            mockFunctions.forEach(function (item) {
                if (angular.equals(item.id, query.functionId)) {
                    callback(item);

                }
                //console.log('item with' + query.functionId + 'not in list!')

            })

        };
        var getAllFunctions = function (cfg, callback) {
            if (typeof(cfg) == 'function') {
                cfg(mockFunctions);
            } else {
                callback(mockFunctions);
            }

        };

        return {
            'update': {method: 'PUT'},
            'getAll': getAllFunctions,
            'get': getFunction
        };
    });