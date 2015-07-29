'use strict';
ouControllers
    .controller('organizationalUnitController', function ($scope) {

        $scope.showDropDownForPerspective = false;
        $scope.isPerspectiveSelected = false;
        $scope.isEditingAnOu = false;
        $scope.checkIfHaveChildren = false;
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
        };

        $scope.className = function () {
            if ($scope.isTreePerspectiveSelected == true) {
                return "col-lg-4 col-md-4 col-sm-12 col-xs-12";
            }
            return "col-lg-6 col-md-6 col-sm-12 col-xs-12";
        };

        /*click on a tree node and you will get in args all the for the clicked node.
            parentOu will have the parent information
            objectToUpdate is the node
            isTreePerspectiveSelected will be true to show the node info to be edited
            search is an empty string to initialize the Search input for filter
            isEditingAnOu will be true to show what action the user is doing.
        */
        $scope.$on('sendData', function(e, args){
            $scope.parentOu = args.parentOu;
            $scope.objectToUpdate = args.objectToUpdate;
            $scope.isTreePerspectiveSelected = args.isTreePerspectiveSelected;
            $scope.search = args.search;
            $scope.isEditingAnOu = args.isEditingAnOu;

            $scope.code = $scope.objectToUpdate.code;
            $scope.description = $scope.objectToUpdate.description;
            $scope.validFrom = new Date($scope.objectToUpdate.validFrom);
            $scope.validTo = new Date($scope.objectToUpdate.validTo);
        });

        $scope.saveOu = function () {
            $scope.saveUpdateOuInformation($scope.objectToUpdate);
        };

        $scope.saveUpdateOuInformation = function (objToUpdate) {
            objToUpdate.code = $scope.code;
            objToUpdate.description = $scope.description;
            objToUpdate.validFrom = $scope.validFrom;
            objToUpdate.validTo = $scope.validTo;
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
    });