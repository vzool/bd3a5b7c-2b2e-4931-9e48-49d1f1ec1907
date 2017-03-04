angular.module("uiSwitch", []).directive("switch", function () {
    return{restrict: "AE", replace: !0, transclude: !0, template: function (n, e) {
            var s = "";
            return s += "<span", s += ' class="switch' + (e.class ? " " + e.class : "") + '"', s += e.ngModel ? ' ng-click="' + e.ngModel + "=!" + e.ngModel + (e.ngChange ? "; " + e.ngChange + '()"' : '"') : "", s += ' ng-class="{ checked:' + e.ngModel + ' }"', s += ">", s += "<small></small>", s += '<input type="checkbox"', s += e.id ? ' id="' + e.id + '"' : "", s += e.name ? ' name="' + e.name + '"' : "", s += e.ngModel ? ' ng-model="' + e.ngModel + '"' : "", s += ' style="display:none" />', s += '<span class="switch-text">', s += e.on ? '<span class="on">' + e.on + "</span>" : "", s += e.off ? '<span class="off">' + e.off + "</span>" : " ", s += "</span>"
        }}
});
var app = angular.module('reqaba_app', ['ngRoute', 'ui.bootstrap', 'datatables', 'datatables.tabletools', 'datatables.buttons', 'bootstrap.fileField', 'datatables.bootstrap', 'base64', 'ngStorage', 'angular-growl', 'ngAnimate', 'ngSanitize', 'ui.select', 'angularMomentHijri', 'uiSwitch']);

/**
 * AngularJS default filter with the following expression:
 * "person in people | filter: {name: $select.search, age: $select.search}"
 * performs a AND between 'name: $select.search' and 'age: $select.search'.
 * We want to perform a OR.
 */
app.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            items.forEach(function (item) {
                var itemMatches = false;

                var keys = Object.keys(props);
                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
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
});
app.config(['$routeProvider', 'growlProvider', function ($routeProvider, growlProvider) {
        growlProvider.globalTimeToLive(3000);
        $routeProvider
//                .when('/index', {templateUrl: '/index.html', controller: 'indexCtrl'})
                .when('/addowner/:ID', {templateUrl: 'parties/ItemType/AddOwner.html', controller: 'itemTypeCont'})
                .when('/addowner', {templateUrl: 'parties/ItemType/AddOwner.html', controller: 'itemTypeCont'})
                .when('/showowner', {templateUrl: 'parties/ItemType/ShowOwner.html', controller: 'itemTypeCont'})
                .when('/activity', {templateUrl: 'parties/Activity/Activity.html', controller: 'activityCont'})
                .when('/priority', {templateUrl: 'parties/Priority/Priority.html', controller: 'priorityCont'})
                .when('/district', {templateUrl: 'parties/District/District.html', controller: 'districtCont'})
                .when('/vioType', {templateUrl: 'parties/Violation/ViolationType.html', controller: 'vioTypeCont'})
                .when('/unitType', {templateUrl: 'parties/units/UnitType.html', controller: 'unitTypeCtrl'})
                .when('/users', {templateUrl: 'parties/Users/Users.html', controller: 'usersCont'})
                .when('/orgs/:orgID', {templateUrl: 'parties/Org/Organization.html', controller: 'orgCont'})
                .when('/orgs', {templateUrl: 'parties/Org/Organization.html', controller: 'orgCont'})
                .when('/showorgs', {templateUrl: 'parties/Org/ShowOrgs.html', controller: 'showOrgCont'})
                .when('/closeorg/:orgID', {templateUrl: 'parties/Org/CloseOrg.html', controller: 'closeOrgCtrl'})
                .when('/closeorg', {templateUrl: 'parties/Org/CloseOrg.html', controller: 'closeOrgCtrl'})
                .when('/showvisits', {templateUrl: 'parties/Visits/ShowVisits.html', controller: 'showVisitsCtrl'})
                .when('/showvisitsdate', {templateUrl: 'parties/Visits/ShowVisitsDate.html', controller: 'showVisitsDateCtrl'})
                .when('/showvisitsreport', {templateUrl: 'parties/reports/ShowVisitsReport.html', controller: 'showVisitsReportCtrl'})
                .when('/showvisitsvio', {templateUrl: 'parties/Visits/ShowVisitsVio.html', controller: 'showVisitsVioCtrl'})
                .when('/showorgsvio', {templateUrl: 'parties/reports/ShowOrgsVio.html', controller: 'showOrgsVioCtrl'})
                .when('/showorgsevi', {templateUrl: 'parties/Org/ShowOrgsEvi.html', controller: 'showOrgsEviCtrl'})
                .when('/showvisitsevi', {templateUrl: 'parties/reports/ShowVisitsEvi.html', controller: 'showVisitsEviCtrl'})
                .when('/showorgswarn', {templateUrl: 'parties/Org/ShowOrgsWarn.html', controller: 'showOrgsWarnCtrl'})
                .when('/showorgsclosed', {templateUrl: 'parties/Org/ShowOrgsClosed.html', controller: 'showOrgsClosedCtrl'})
                .when('/addvisit', {templateUrl: 'parties/Visits/AddVisit.html', controller: 'addVisitCtrl'})
                .when('/addvisits', {templateUrl: 'parties/Visits/AddVisitByActivity.html', controller: 'addVisitsCtrl'})
                .when('/addmessage', {templateUrl: 'parties/Messages/AddMessage.html', controller: 'addMessageCtrl'})
                .when('/orgsbyactivity', {templateUrl: 'parties/Org/OrgsByActivity.html', controller: 'orgByActivityCtrl'})
                .when('/ownersearch', {templateUrl: 'parties/reports/OwnerSearch.html', controller: 'ownerSearch'})
                .when('/orglic/:orgID', {templateUrl: 'parties/reports/OrgLicense.html', controller: 'orgLicenseCtrl'})
                .when('/orglic', {templateUrl: 'parties/reports/OrgLicense.html', controller: 'orgLicenseCtrl'})
                .when('/repmonth', {templateUrl: 'parties/reports/RepMonth.html', controller: 'repMonthCtrl'})
                .when('/repquartmonth', {templateUrl: 'parties/reports/RepMonthQurt.html', controller: 'repMonthQurtCtrl'})
                .when('/rephalfmonth', {templateUrl: 'parties/reports/RepMonthHalf.html', controller: 'repMonthHalfCtrl'})
                .when('/reptotal', {templateUrl: 'parties/reports/RepTotal.html', controller: 'repTotalCtrl'})
                .when('/repemp', {templateUrl: 'parties/reports/RepEmp.html', controller: 'repEmpCtrl'})
                .when('/orghist/:orgID', {templateUrl: 'parties/reports/OrgHistory.html', controller: 'orgHistoryCtrl'})
                .when('/finishedmuni', {templateUrl: 'parties/reports/FinishedMuni.html', controller: 'finishedMuniCtrl'})
                .when('/orghist', {templateUrl: 'parties/reports/OrgHistory.html', controller: 'orgHistoryCtrl'})
                .when('/orgclosehist/:orgID', {templateUrl: 'parties/reports/OrgCloseHistory.html', controller: 'orgCloseHistoryCtrl'})
                .when('/orgclosehist', {templateUrl: 'parties/reports/OrgCloseHistory.html', controller: 'orgCloseHistoryCtrl'})
                .when('/userchangevisits', {templateUrl: 'parties/Users/UserChangeVisits.html', controller: 'userChangeVisitsCtrl'})
                .when('/userfuvisits', {templateUrl: 'parties/reports/UserFutureVisits.html', controller: 'userFutureVisitsCtrl'})
                .when('/loginfail', {templateUrl: 'parties/reports/UserLoginFail.html', controller: 'userLoginFailCtrl'})
                .when('/empkpi', {templateUrl: 'parties/reports/EmpKPI.html', controller: 'empKPICtrl'})
                .when('/emphist', {templateUrl: 'parties/reports/EmpHistory.html', controller: 'empHistCtrl'})
                .when('/empactions', {templateUrl: 'parties/reports/UserActions.html', controller: 'userActionsCtrl'})
                .when('/finishedemp', {templateUrl: 'parties/reports/FinishedEmp.html', controller: 'finishedEmpCtrl'})
                .when('/payvio', {templateUrl: 'parties/reports/PayVios.html', controller: 'payViosCtrl'})
                .when('/ownerorgs', {templateUrl: 'parties/reports/OwnerOrgs.html', controller: 'ownerOrgs'})
                .when('/ownerorgs/:ownerID', {templateUrl: 'parties/reports/OwnerOrgs.html', controller: 'ownerOrgs'})
                .otherwise({redirectTo: '/'
                });

    }]);

var setting = {};

if(location.host == "reqabaweb.com" || location.host == "reqabaweb.net" ){

    setting = {
        connection: {
            url: location.protocol + '//' + location.host + ':8080/reqaba/',
            webURL: location.protocol + '//' + location.host + '/',
            user: null,
            sessionId: ''
        }
    };

}else{
    
    setting = {
        connection: {
            url: 'http://localhost:8080/reqaba/',
            webURL: 'http://localhost:8000/',
            user: null,
            sessionId: ''
        }
    };
}

console.log('setting', setting);
app.value('setting', setting);

// app.value('setting', {connection: {url: 'http://78.93.180.115:8080/reqaba/', webURL: 'http://localhost:8383/ReqabaWeb/', user: null, sessionId: ''}});
// app.value('setting', {connection: {url: 'http://127.0.0.1:8080/ReqabaServer/', webURL: 'http://localhost:8000/', user: null, sessionId: ''}});

app.controller('mainPageCtrl', function ($scope, setting, $localStorage, UserServices) {
    console.log($localStorage.$default().user.body.token);
    $scope.user = $localStorage.$default().user;
    setting.connection.sessionId = $localStorage.$default().user.body.token;
});

app.controller('loginCtrl', ['$scope', '$window', 'setting', '$localStorage', 'UserServices', function ($scope, $window, setting, $localStorage, UserServices) { // UserServices is the service file that make the login webservice calling
        $scope.user = {"name": "", "password": ""};
        $scope.isLoginFailed = false;
        $scope.login = function () {

            UserServices.login($scope.user).success(function (data) { // the $scope.user data will not passed as parameter but as request-header 
                if (data.statusCode === "ACCEPTED") {
                    $scope.isLoginFailed = false;
                    // Login success here ! 
//                    $scope.$storage = $localStorage.$default({// to save the user data into the localStorage so we can get it back in the mainPage
//                        user: data
//                    });
                    $localStorage.$default().user = data;
                    $window.location.href = setting.connection.webURL + 'app.html#/showorgs'; // to navigate to the main Page
                } else {
                    // Login fail here !
                    $scope.isLoginFailed = true;

                }

            });
        }
    }]);

app.filter('toHijri', function () {
    return function (milliseconds) {
        if (milliseconds === null)
            return null;
        return moment(milliseconds).format('hYYYY/hM/hD');
    };
});

app.filter('toHijriTime', function () {
    return function (milliseconds) {
        if (milliseconds === null)
            return null;
        return moment(milliseconds).format('hh:mm');
    };
});
app.filter('actionType', function () {
    return function (type) {
        if (type === null)
            return "";
        var typeString = "";
        switch (type) {
            case 1:
                typeString = "زيارة";
                break;
            case 2:
                typeString = "مخالفة";
                break;
            case 3:
                typeString = "غلق";
                break;
            case 4:
                typeString = "فتح";
                break;

        }
        return typeString;
    };
});

app.filter('arMonth', function () {
    return function (type) {
        if (type === null)
            return "";
        var typeString = "";
        switch (type) {
            case 1:
                typeString = "محرم";
                break;
            case 2:
                typeString = "صفر";
                break;
            case 3:
                typeString = "ربيع الأول";
                break;
            case 4:
                typeString = "ربيع الثانى";
                break;
            case 5:
                typeString = "جمادى الأول";
                break;
            case 6:
                typeString = "جمادى الآخر";
                break;
            case 7:
                typeString = "رجب";
                break;
            case 8:
                typeString = "شعبان";
                break;
            case 9:
                typeString = "رمضان";
                break;
            case 10:
                typeString = "شوال";
                break;
            case 11:
                typeString = "ذو القعدة";
                break;
            case 12:
                typeString = "ذو الحجة";
                break;
        }
        return typeString;
    };
});

app.filter('arNumber', function () {
    return function (fromNum) {
        console.log(fromNum);
        var result;
        var arabicMap = {
            '٩': 9,
            '٨': 8,
            '٧': 7,
            '٦': 6,
            '٥': 5,
            '٤': 4,
            '٣': 3,
            '٢': 2,
            '١': 1,
            '٠': 0
        };
        result = arabicMap[fromNum];
        return result;
    };
});
//app.filter('arNumber', function () {
//    return function (fromNum) {
//        var result;
//        var arabicMap = {
//            '٩': 9,
//            '٨': 8,
//            '٧': 7,
//            '٦': 6,
//            '٥': 5,
//            '٤': 4,
//            '٣': 3,
//            '٢': 2,
//            '١': 1,
//            '٠': 0
//        };
//        console.log(fromNum);
//        result = arabicMap[fromNum];
//        if (result === undefined) {
//            result = -1;
//        }
//        return result;
//    };
//});

