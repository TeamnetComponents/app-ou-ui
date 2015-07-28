'use strict';
    ouFilters.filter('organizationUnitFilter', function() {
        function filter(items, props) {     //(json-ul, obiectul cautat {name: "ex"})
            var out = [];

            if (angular.isArray(items)) {
                items.forEach(function(item) {
                    var itemMatches = false;
                    var newProps = eval('props.' + Object.keys(props).toString());  //obtine obiect {prop: "cauta"}
                    var keys = Object.keys(newProps);   //array cu proprietatea
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = newProps[prop].toLowerCase();    //cuvantul cautat
                        if (eval("item." + Object.keys(props).toString() + "." + prop.toString()).toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }
            return out;
        }
        filter.$stateful = true;
        return filter;
    });
