
app.controller('repMonthCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', 'CRUDServices', '$base64', '$routeParams', 'setting', '$location', 'growl', '$uibModal', function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, CRUDServices, $base64, $routeParams, setting, $location, growl, $uibModal) {
        $scope.years=[1436,1437,1438,1439,1440,1441,1442,1443,1444,1445];
        $scope.selectedYear=0;
                $scope.empActions= [];

       
        CRUDServices.methodLink = 'report';

       
      
    
       $scope.getReport = function (year) {
            if (year == null)
                return [];
            if (year.length < 4)
                return [];
            search={
  "fromMonth": 1,
  "hijriYear": year,
  "toMonth": 12
}
             CRUDServices.customMethod("monthly-analysis-report",search).success(function (data) {
                    $scope.empActions=data.result;
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


