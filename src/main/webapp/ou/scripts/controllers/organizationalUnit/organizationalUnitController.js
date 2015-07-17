'use strict';
ouControllers
    .controller('organizationalUnitController', function ($scope, $filter) {

        $scope.showInputAndButton = false;
        $scope.showDropDownForPerspective = false;
        $scope.isPerspectiveSelected = false;
        $scope.isTreePrespectiveSelected = false;
        $scope.item = {};

        var baseTemplateUrl = 'ou/views/organizationalUnit/template/';
        $scope.accountsTpl = baseTemplateUrl + 'account.tpl.html';
        $scope.functionsTpl = baseTemplateUrl + 'function.tpl.html';

        $scope.showPerspectiveSelect = function () {
            $scope.showDropDownForPerspective = true;
        };

        $scope.showTreePerspective = function () {
            $scope.isPerspectiveSelected = true;
        };

        $scope.className = function() {
            if($scope.isTreePerspectiveSelected == true) {
                return "col-lg-4 col-md-4 col-sm-12 col-xs-12";
            }
            return "col-lg-6 col-md-6 col-sm-12 col-xs-12";
        };

        $scope.saveOu = function () {
            //TODO update ou information
            //$scope.showDropDownForPerspective = false;
            //$scope.isPerspectiveSelected = false;
            //$scope.isTreePrespectiveSelected = false;

            var id = $scope.item.id;
            var data = JSON.parse($scope.testListForUi);

            if ($scope.item.items.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].id == id) {
                        if (data[i].items.length > 0) {
                            var obj = {};
                            obj.id = 10;
                            obj.title = "Ana are mere";
                            obj.items = [];
                            data[i].items.push(obj);
                        }
                    }
                }
            }

            var backToString = JSON.stringify(data);
            console.log(data);
        };

        $scope.createOu = function (item) {
            //TODO create ou
            $scope.isTreePerspectiveSelected = true;
            var id = item.id;
            var data = JSON.parse($scope.testListForUi);

            for (var i = 0; i < data.length; i++) {
                if (data[i].id == id) {
                    if (data[i].items.length > 0) {
                        var obj = {};
                        obj.id = 10;
                        obj.title = "Ana are mere";
                        obj.items = [];
                        data[i].items.push(obj);
                    }
                }
            }
            var backToString = JSON.stringify(data);
            console.log(data);
        };

        $scope.repetitionTypes = [
            {id: "0", name: "Padre uno"},
            {id: "1", name: "Padre dos"},
            {id: "2", name: "Padre tres"},
            {id: "3", name: "Padre quatro"},
            {id: "4", name: "Padre cinco"}
        ];

        $scope.testListForUi = [
            {
                "id": 1,
                "code": "1. moiré-vision",
                "description": "moiré-vision",
                "validFrom" : "10/05/2015",
                "validTo" : "10/10/2015",
                "items": [
                    {
                        "id": 11,
                        "code": "1.1. tofu-animation",
                        "description": "1.1. tofu-animation",
                        "validFrom" : "10/05/2015",
                        "validTo" : "10/10/2015",
                        "items": [
                            {
                                "id": 111,
                                "code": "1.1.1. spooky-giraffe",
                                "description": "1.1.1. spooky-giraffe",
                                "validFrom" : "10/05/2015",
                                "validTo" : "10/10/2015",
                                "items": []
                            },
                            {
                                "id": 112,
                                "code": "1.1.2. bubble-burst",
                                "description": "1.1.2. bubble-burst",
                                "validFrom" : "10/05/2015",
                                "validTo" : "10/10/2015",
                                "items": []
                            }
                        ]
                    },
                    {
                        "id": 12,
                        "code": "1.2. barehand-atomsplitting",
                        "description": "1.2. barehand-atomsplitting",
                        "validFrom" : "10/05/2015",
                        "validTo" : "10/10/2015",
                        "items": []
                    }
                ]
            }
        ];

        $scope.toggle = function (scope) {
            scope.toggle();
        };

        $scope.updateOuInformation = function (item) {
            $scope.item = item;
            $scope.isTreePerspectiveSelected = true;
            $scope.ou = item.code;
            $scope.description = item.description;
            $scope.validFrom = $filter('date')(item.validFrom, "MM/dd/yyyy");
            $scope.validTo = $filter('date')(item.validTo, "MM/dd/yyyy");
        };
    });