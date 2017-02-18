
app.controller('repTotalCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', 'CRUDServices', '$base64', '$routeParams', 'setting', '$location', 'growl', '$uibModal', function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, CRUDServices, $base64, $routeParams, setting, $location, growl, $uibModal) {
        $scope.years=[1436,1437,1438,1439,1440,1441,1442,1443,1444,1445];
                $scope.months = [{"name": 'محرم', "value": 1}, {"name": 'صفر', "value": 2}, {"name": 'ربيع الأول', "value": 3}, {"name": 'ربيع الثانى', "value": 4}, {"name": 'جمادى الأول', "value": 5}, {"name": 'جمادى الآخر', "value": 6}, {"name": 'رجب', "value": 7}, {"name": 'شعبان', "value": 8}, {"name": 'رمضان', "value": 9}, {"name": 'شوال', "value": 10}, {"name": 'ذو القعدة', "value": 11}, {"name": 'ذو الحجة', "value": 12}];
        $scope.selectedMonth = null;

        $scope.selectedYear=0;
                $scope.empActions= [];

       
        CRUDServices.methodLink = 'report';

       
      
    
       $scope.getReport = function (year) {
            if (year == null)
                return [];
            if (year.length < 4)
                return [];
            var fromM;
            var toM;
            if($scope.selectedMonth==12){
                fromM=11;
                toM=12;
            }else{
            fromM=+$scope.selectedMonth;
            toM=+$scope.selectedMonth+1;
        }
            search={
  "fromMonth": fromM,
  "hijriYear": year,
  "toMonth": toM
}
             CRUDServices.customMethod("monthly-analysis-report",search).success(function (data) {
                             if($scope.selectedMonth==12){
                                                     $scope.empActions[0]=data.result[1];

                                 }else{
                    $scope.empActions[0]=data.result[0];
                }
                console.log($scope.empActions);
                });
        };
      
        $scope.testExp = function () {
         console.log("test export");
         $('#test').tableExport({type:'png',escape:'false'});
     }

        $scope.onSelect = function (id) {
            $location.url('/orgs/' + id);
        };
        $scope.open = function (id) {
            search = {
                "fromDate": null,
                "orgnizationId": id,
                "ownerId": null,
                "toDate": null,
                "userId": null
            };
            CRUDServices.getVoisByOrg(search).success(function (data) {
                $scope.violations = data.result;
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: 10,
                    resolve: {
                        items: function () {

                            return $scope.violations;

                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
                console.log($scope.violations)

            });
        };

    }]);


