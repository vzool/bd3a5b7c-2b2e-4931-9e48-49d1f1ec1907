
app.controller('repMonthQurtCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', 'CRUDServices', '$base64', '$routeParams', 'setting', '$location', 'growl', '$uibModal', function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, CRUDServices, $base64, $routeParams, setting, $location, growl, $uibModal) {
        $scope.years=[1436,1437,1438,1439,1440,1441,1442,1443,1444,1445];
        $scope.selectedYear=0;
          $scope.ranges=[{"name":"ربع أول","value":1},{"name":"ربع ثانى","value":2},{"name":"ربع ثالث","value":3},{"name":"ربع رابع","value":4}];
        $scope.selectedRange=0;
        $scope.mFromMonth="";
        $scope.mToMonth="";
                $scope.empActions= [];

       
        CRUDServices.methodLink = 'report';

       
      
    
       $scope.getReport = function (year) {
            if (year == null)
                return [];
            if (year.length < 4)
                return [];
              if($scope.selectedRange==1){
             mFrom=1;
             mTo=3;
            }
            if($scope.selectedRange==2){
             mFrom=4;
             mTo=6;
            }
             if($scope.selectedRange==3){
             mFrom=7;
             mTo=9;
            }
             if($scope.selectedRange==4){
             mFrom=10;
             mTo=12;
            }
            search={
  "fromMonth": mFrom,
  "hijriYear": year,
  "toMonth": mTo
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
        
          $scope.onSelectRange = function () {
             if($scope.selectedRange==1){
             $scope.mFromMonth="محرم";
             $scope.mToMonth="ربيع أول";
            }
            if($scope.selectedRange==2){
             $scope.mFromMonth="ربيع آخر";
             $scope.mToMonth="جمادى آخر";
            }
               if($scope.selectedRange==3){
             $scope.mFromMonth="رجب";
             $scope.mToMonth="رمضان";
            }
               if($scope.selectedRange==4){
             $scope.mFromMonth="شوال";
             $scope.mToMonth="ذو الحجة";
            }
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


