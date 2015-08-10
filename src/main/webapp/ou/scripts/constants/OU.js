ouConstants.constant('OU', {
    "url": {
        "manageOrganizations": "/organizationUnit/manage",
        "manageOrganizationUnits": "/organizationalUnit",
        "manageFunctions": "",
        "template": "ou/views/organizationalUnit/template/",
        "account": "account.tpl.html",
        "functions": "function.tpl.html",
        "restOrganizationalUnit": "app/rest/organizationalUnit",
        "functionTemplate": 'ou/views/function/template/',
        "functionTpl": 'function.tpl.html'
    },
    "convertDate": function (date) {
        var splitDate = date.split("-");
        return new Date(splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0]);
    }

});