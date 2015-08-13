ouControllers.
    controller('ouTreeViewController', ['$scope', '$location', function ($scope, $location) {

        $scope.isShowExpandCollapse = false;

        /*
         Get the current ou and his parent.
         Send to the parent controller those objects and some booleans to show html data.
         You must listen with $on for the sendData event.
         */
        $scope.updateOuInformation = function (item, father) {
            if ($scope.isOrganization) {
                $location.path($scope.editUrl); // TODO send perspective id on url

            } else {
                $scope.search = "";
                $scope.isTreePerspectiveSelected = true;
                $scope.isEditingAnOu = true;

                $scope.objectToUpdate = item;
                $scope.parentOu = item.parent;
                /*if (father != undefined) {
                    $scope.parentOu = father;
                } else {
                    $scope.parentOu = $scope.getMissingParent(item);
                }*/

                var array = {};
                array.parentOu = $scope.parentOu;
                array.objectToUpdate = $scope.objectToUpdate;
                array.isTreePerspectiveSelected = $scope.isTreePerspectiveSelected;
                array.search = $scope.search;
                array.isEditingAnOu = $scope.isEditingAnOu;
                $scope.$emit('sendData', array);
            }
        };

        $scope.getMissingParent = function (object) {
            var objectToIterate = $scope.ouTreeData.organizationalUnitSet;
            for (var i = 0; i < objectToIterate.length; i++) {
                if(objectToIterate[i].code == object.code && objectToIterate[i].description == object.description && objectToIterate[i].id == object.id) {
                    return objectToIterate;
                    break;
                } else {
                    if(objectToIterate[i].children != null) {
                        var father = $scope.getMissingMissingParent(objectToIterate[i].children, object);
                        if(father != null) {
                            return father;
                            break;
                        }
                    }
                }
                //for (var j = 0; j < objectToIterate[i].children.length; j++) {
                //    if (objectToIterate[i].children[j].code == object.code &&
                //        objectToIterate[i].children[j].description == object.description) {
                //        return objectToIterate[i];
                //    }
                //}
            }
        };

        $scope.getMissingMissingParent = function (objectToIterate, object) {
            //var objectToReturn = $scope.ouTreeData;
            for (var k = 0; k < objectToIterate.length; k++) {
                if (objectToIterate[k].code == object.code &&
                    objectToIterate[k].description == object.description &&
                    objectToIterate[k].id == object.id) {
                    return objectToIterate[k];
                    break;
                } else {
                    $scope.getMissingMissingParent(objectToIterate[k].children, object);
                }
            }
        };

        $scope.insertNewElement = function (item) {
            $scope.newId = (item.id * 10) + (item.children.length) + 1;

            var object = {
                id: $scope.newId,
                code: "New " + item.code + " child",
                description: "Description",
                validFrom: "10/10/2014",
                validTo: "06/10/2015",
                "active": null,
                "perspective": null,
                "jpaId": null,
                "parent": item,
                "children": [],
                "accounts": [],
                "organizationalUnitFunctions": []
            };
            item.children.push(object);
            $scope.updateOuInformation(object, item);
        };

        $scope.deleteElement = function (item, father) {
            // TODO
            if (father == undefined) {
                father = $scope.getMissingParent(item);
                if (father == undefined) {
                    father = $scope.getMissingMissingParent(item);
                }
            }
            deleteChild(item, father);
        };

        var deleteChild = function (item, father) {
            var dim = $scope.ouTreeData.organizationalUnitSet.length;
            for (var i = 0; i < dim; i++) {
                if ($scope.ouTreeData.organizationalUnitSet[i].id == itemId) {
                    $scope.ouTreeData.children[i] = [];
                    break;
                } else {
                    updateOuTreeData($scope.ouTreeData.children[i], itemId);
                }
            }
            //updateOuTreeData($scope.ouTreeData, item.id);
        };

        var updateOuTreeData = function (data, itemId) {
            //TODO: problem when deleting the first child from a perspective with many children
            var dim = data.children.length;
            for (var i = 0; i < dim; i++) {
                if (data.children[i].id == itemId) {
                    data.children[i] = [];
                    break;
                } else {
                    updateOuTreeData(data.children[i], itemId);
                }
            }
        };

        $scope.createNewChildForPerspective = function () {
            $scope.newId = ($scope.ouTreeData.id * 10) + 1;
            var object = {
                id: $scope.newId,
                code: "New",
                description: "Description",
                validFrom: "10/10/2014",
                validTo: "06/10/2015",
                "active": null,
                "perspective": null,
                "jpaId": null,
                "parent": null,
                "children": [],
                "accounts": [],
                "organizationalUnitFunctions": []
            };
            $scope.ouTreeData.organizationalUnitSet.push(object);
            $scope.updateOuInformation(object, $scope.ouTreeData);
        };

        var getRootNodesScope = function () {
            return angular.element(document.getElementById("tree-root")).scope();
        };

        $scope.collapseAll = function () {
            var scope = getRootNodesScope();
            scope.collapseAll();
        };

        $scope.expandAll = function () {
            var scope = getRootNodesScope();
            scope.expandAll();
        };
    }]);