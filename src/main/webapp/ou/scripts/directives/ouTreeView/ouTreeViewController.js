ouControllers.
    controller('ouTreeViewController', function($scope){

        /*
            Get the current ou and his parent.
            Send to the parent controller those objects and some booleans to show html data.
            You must listen with $on for the sendData event.
         */
        $scope.updateOuInformation = function (item, father) {
            $scope.search = "";
            $scope.isTreePerspectiveSelected = true;
            $scope.isEditingAnOu = true;

            $scope.objectToUpdate = item;
            if (father != undefined) {
                $scope.parentOu = father;
            } else {
                $scope.parentOu = $scope.getMissingParent(item);
            }

            var array = {};
            array.parentOu = $scope.parentOu;
            array.objectToUpdate = $scope.objectToUpdate;
            array.isTreePerspectiveSelected = $scope.isTreePerspectiveSelected;
            array.search = $scope.search;
            array.isEditingAnOu = $scope.isEditingAnOu;
            $scope.$emit('sendData', array);
        };

        $scope.getMissingParent = function (object) {
            var objectToReturn = $scope.ouTreeData;
            var objectToIterate = $scope.ouTreeData.items;
            for(var i = 0; i < objectToIterate.length; i++) {
                for(var j = 0; j < objectToIterate[i].items.length; j++) {
                    if(objectToIterate[i].items[j].code == object.code &&
                        objectToIterate[i].items[j].description == object.description) {
                        return objectToIterate[i];
                    }
                }
            }
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

        $scope.createNewChildForPerspective = function () {
            $scope.ouTreeData.items.push(
                {
                    code: "New",
                    description: "Description",
                    validFrom: "10/10/2014",
                    validTo: "06/10/2015",
                    items: []
                }
            )
        };

        var getRootNodesScope = function() {
            return angular.element(document.getElementById("tree-root")).scope();
        };

        $scope.collapseAll = function() {
            var scope = getRootNodesScope();
            scope.collapseAll();
            $scope.$broadcast('collapseAll');
            //scope.collapsed = true;
        };

        $scope.expandAll = function () {
            var scope = getRootNodesScope();
            scope.expandAll();
            $scope.$broadcast('expandAll');
            //scope.collapsed = false;
        };
    });