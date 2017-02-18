
app.controller('finishedEmpCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', 'CRUDServices', 'VISITServices','$uibModal', function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, CRUDServices, VISITServices,$uibModal) {

        $scope.bean = {
            "activityBean": {},
            "districtBean": {},
            "employees": null,
            "id": null,
            "lastVisitDate": null,
            "lat": "",
            "lon": "",
            "muniFromDate": null,
            "muniImage": null,
            "muniImageBytes": "",
            "muniNo": "",
            "muniToDate": null,
            "name": "",
            "orgCode": null,
            "orgDocs": null,
            "orgImage": null,
            "orgImageBytes": "",
            "ownerBean": {},
            "remainingVisits": null,
            "location": null,
            "street": ""
        };
     
        CRUDServices.methodLink = 'visit';
 $scope.$on('$routeChangeSuccess', function () {
               console.log('change');
        });

        $scope.getBeans = function () {
            CRUDServices.getData("employee/get-exceeded-license-date",null).success(function (data) {
                $scope.beans = data.result;
                console.log($scope.beans);
                $scope.dtOptions = DTOptionsBuilder
                        .newOptions()
                 .withOption('data', data.result)
                        .withOption('rowCallback', rowCallback)
                .withTableTools('js/copy_csv_xls_pdf.swf')
            .withButtons([
            'print'
        ]);

            });
        }


        $scope.getBeans();
     



        $scope.selectBean = function (xBean) {
            $scope.bean = xBean;
        }
         showImgDialog =function (data){
             var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalImg.html',
                    controller: 'ModalInstanceCtrl',
                    size: 10,
                    resolve: {
                        items: function () {

                            return null;

                        },
                        data:function () {

                            return data;

                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
        }
        //Table
        $scope.dtColumns = [
      
            
            DTColumnBuilder.newColumn('id').withTitle('الكود'),
         
            DTColumnBuilder.newColumn('name').withTitle('الإسم'),
            DTColumnBuilder.newColumn('residencyNo').withTitle('رقم الإقامة'),
            DTColumnBuilder.newColumn('medCertNo').withTitle('رقم الشهادة'),
            DTColumnBuilder.newColumn('orgnizationBean.name').withTitle('إسم المنشآة'),
            DTColumnBuilder.newColumn('counter').withTitle('عدد الأيام'),
             DTColumnBuilder.newColumn('medCertFromDate').withTitle('تاريخ الإبتداء').renderWith(function (data, type, full, meta) {
                var formatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic");

                return full['medCertFromDate'] != null ? formatter.format(new Date(data)) :'';
            }),
            DTColumnBuilder.newColumn('medCertToDate').withTitle('تاريخ الإنتهاء').renderWith(function (data, type, full, meta) {
                var formatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic");

                return full['medCertToDate'] != null ? formatter.format(new Date(data)) :'';
            })

        ];

        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            if (aData.status == 0) {
                nRow.style.background = 'rgb(240, 125, 125)';
                nRow.style.color = 'white';
            } else if (aData.status == 1) {
//                nRow.style.background='red';
//                nRow.style.color='white';
            }
            return nRow;
        }

       $scope.clearMarkers= function () {
            for (var i = 0; i < $scope.markers.length; i++) {
                $scope.markers[i].setMap(null);
            }
            $scope.markers=[];
        }
        showImgDialog =function (data){
             var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'myModalContent.html',
                    controller: 'ModalInstanceCtrl',
                    size: 10,
                    resolve: {
                        items: function () {

                            return null;

                        },
                        data:function () {

                            return data;

                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
        }
    }]);




