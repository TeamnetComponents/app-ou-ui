ouConstants.constant('OU', {
    "url": {
        "manageOrganizations": "/organizationUnit/manage",
        "manageOrganizationUnits": "/organizationalUnit",
        "manageFunctions": ""
    },
    "convertDate": function (date) {
        var splitDate = date.split("-");
        return new Date(splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0]);
    }

});