'use strict';
ouControllers
    .controller('organizationalUnitController', function ($scope) {

        $scope.showDropDownForPerspective = false;
        $scope.isPerspectiveSelected = false;
        $scope.isEditingAnOu = false;
        $scope.checkIfHaveChildren = false;
        //$scope.item = {};
        $scope.organization = {};
        $scope.perspective = {};
        $scope.objectToUpdate = {};
        $scope.parentOu = {};

        var baseTemplateUrl = 'ou/views/organizationalUnit/template/';
        $scope.accountsTpl = baseTemplateUrl + 'account.tpl.html';
        $scope.functionsTpl = baseTemplateUrl + 'function.tpl.html';

        $scope.showPerspectiveSelect = function () {
            $scope.showDropDownForPerspective = true;
        };

        $scope.showTreePerspective = function () {
            $scope.isPerspectiveSelected = true;
            //if ($scope.perspective.selected.items.length == 0) {
            //    $scope.checkIfHaveChildren = true;
            //}
        };

        $scope.createNewChildForPerspective = function () {
            $scope.perspective.selected.items.push(
                {
                    code: "New",
                    description: "Description",
                    validFrom: "10/10/2014",
                    validTo: "06/10/2015",
                    items: []
                }
            )
        };

        $scope.className = function () {
            if ($scope.isTreePerspectiveSelected == true) {
                return "col-lg-4 col-md-4 col-sm-12 col-xs-12";
            }
            return "col-lg-6 col-md-6 col-sm-12 col-xs-12";
        };

        $scope.saveOu = function () {
            $scope.saveUpdateOuInformation($scope.objectToUpdate);
        };

        $scope.saveUpdateOuInformation = function (objToUpdate) {
            objToUpdate.code = $scope.code;
            objToUpdate.description = $scope.description;
            objToUpdate.validFrom = $scope.validFrom;
            objToUpdate.validTo = $scope.validTo;
        };

        $scope.insertNewElement = function (item) {
            var object = {
                code: "New " + item.code + " child",
                description: "Description",
                validFrom: "10/10/2014",
                validTo: "06/10/2015",
                items: []
            };
            item.items.push(object);
        };

        $scope.toggle = function (scope) {
            scope.toggle();
        };

        $scope.organizationalUnitList = [
            {
                id: "0",
                name: "Ou 1",
                description: "Organizational unit 1",
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

        $scope.getMissingParent = function (object) {
            var objectToReturn = $scope.perspective.selected;
            var objectToIterate = $scope.perspective.selected.items;
            for(var i = 0; i < objectToIterate.length; i++) {
                for(var j = 0; j < objectToIterate[i].items.length; j++) {
                    if(objectToIterate[i].items[j].code == object.code &&
                        objectToIterate[i].items[j].description == object.description) {
                        return objectToIterate[i];
                    }
                }
            }
        };

        $scope.updateOuInformation = function (item, father) {
            $scope.search = "";
            $scope.isTreePerspectiveSelected = true;
            $scope.isEditingAnOu = true;

            if (father != undefined) {
                $scope.parentOu = father;
            } else {
                $scope.parentOu = $scope.getMissingParent(item);
            }
            $scope.objectToUpdate = item;

            $scope.code = item.code;
            $scope.description = item.description;
            $scope.validFrom = new Date(item.validFrom);
            $scope.validTo = new Date(item.validTo);
        };

        $scope.collapseAll = function() {
            $scope.$broadcast('collapseAll');
        };

        $scope.expandAll = function() {
            $scope.$broadcast('expandAll');
        };
    });