
app.controller('repEmpCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', 'CRUDServices', '$base64', '$routeParams', 'setting', '$location', 'growl', '$uibModal', function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, CRUDServices, $base64, $routeParams, setting, $location, growl, $uibModal) {
        $scope.years = [1436, 1437, 1438, 1439, 1440, 1441, 1442, 1443, 1444, 1445];
        $scope.months = [{"name":'محرم',"value":1},{"name":'صفر',"value":2},{"name":'ربيع الأول',"value":3},{"name":'ربيع الثانى',"value":4},{"name":'جمادى الأول',"value":5},{"name":'جمادى الآخر',"value":6},{"name":'رجب',"value":7},{"name":'شعبان',"value":8},{"name":'رمضان',"value":9},{"name":'شوال',"value":10},{"name":'ذو القعدة',"value":11},{"name":'ذو الحجة',"value":12}];

        $scope.selectedYear = null;
        $scope.selectedMonth = null;

        $scope.empActions = [];



        CRUDServices.methodLink = 'report';






        $scope.getReport = function (year, month) {
            if (year == null || month ==null)
                return [];
            if (year.length < 4)
                return [];
            search = {
                "hijriYear": year,
                "month": month

            }
            CRUDServices.getData("report/employee-analysis-report", search).success(function (data) {
                $scope.empActions = data.result;
//                    $scope.getBeans();
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


