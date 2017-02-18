
app.controller('empHistCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', 'CRUDServices', '$base64', '$routeParams', 'setting', '$location', 'growl', '$uibModal', function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, CRUDServices, $base64, $routeParams, setting, $location, growl, $uibModal) {
        $scope.years = [1436, 1437, 1438, 1439, 1440, 1441, 1442, 1443, 1444, 1445];
        $scope.months = [{"name": 'محرم', "value": 1}, {"name": 'صفر', "value": 2}, {"name": 'ربيع الأول', "value": 3}, {"name": 'ربيع الثانى', "value": 4}, {"name": 'جمادى الأول', "value": 5}, {"name": 'جمادى الآخر', "value": 6}, {"name": 'رجب', "value": 7}, {"name": 'شعبان', "value": 8}, {"name": 'رمضان', "value": 9}, {"name": 'شوال', "value": 10}, {"name": 'ذو القعدة', "value": 11}, {"name": 'ذو الحجة', "value": 12}];

        $scope.selectedUser = {};
        $scope.selectedYear = null;
        $scope.selectedMonth = null;
        var theBigDay = new Date();
        theBigDay.setYear(2015);
        $scope.search = {
            "fromDate": theBigDay.getTime(),
            "toDate": new Date().getTime(),
            "userId": $scope.selectedUser.id
        }
        $scope.empActions = {
            "shiftCode": 1,
            "visitCount": 0,
            "violationCount": 0,
            "violationCost": 0,
            "closeCount": 0,
            "alarmCount": 0,
            "kiloUnitCount": 0,
            "litreUnitCount": 0
        };

        $scope.visitCount = [];
        $scope.violationCount = [];
        $scope.alarmCount = [];
        $scope.violationCost = [];

        $scope.getUserBeans = function () {
            CRUDServices.getAllCustom('user').success(function (data) {
                $scope.users = data.result;
                console.log($scope.users);
            });
        };
        $scope.getUserBeans();


        CRUDServices.methodLink = 'report';





        $scope.getReport = function () {
            $scope.search.userId = $scope.selectedUser.id;
            if ($scope.search.userId == null)
                return [];

            CRUDServices.customMethod("user-analysis-report", $scope.search).success(function (data) {
                $scope.empActions = data.result[0];
            });
        };

        $scope.testExp = function () {
            console.log("test export");
            $('#test').tableExport({type: 'png', escape: 'false'});
        }

        $scope.onSelect = function (id) {
            $location.url('/orgs/' + id);
        };


    }]);


