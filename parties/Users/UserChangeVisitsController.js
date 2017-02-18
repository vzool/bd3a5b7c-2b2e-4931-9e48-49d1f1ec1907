
app.controller('userChangeVisitsCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', 'CRUDServices', 'VISITServices', function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, CRUDServices, VISITServices) {
        $scope.selectedFromUser = {};
        $scope.selectedToUser = {};
$scope.beans =[];


        $scope.$on('$routeChangeSuccess', function () {
            google.maps.event.trigger($scope.map, 'resize');
        });

      

       
        CRUDServices.methodLink = 'visit';

 $scope.changeVisits= function () {
     changeVisit={
  "userId": $scope.selectedToUser.id,
  "visitIds": []
}
           
                for (i = 0; i < $scope.beans.length; i++) {
                    changeVisit.visitIds.push($scope.beans[i].id);
                }
console.log(changeVisit);
            CRUDServices.customMethod("changeVisitUser",changeVisit).success(function (data) {
                growl.success('تمت التبديل بنجاح', {title: 'عملية ناجحة!'});

            });
     }
         $scope.test= function () {
             $scope.beans ={};
         }
        $scope.getVisitsBeans= function () {
            
            CRUDServices.getData("visit/get-future-visits",{"userId":$scope.selectedFromUser.id}).success(function (data) {
                $scope.beans = data.result;

                for (i = 0; i < $scope.beans.length; i++) {
                    $scope.beans[i].location = $scope.beans[i].lat + ',' + $scope.beans[i].lon;
                    
                }
                $scope.dtOptions = DTOptionsBuilder.newOptions()
                        .withOption('data', data.result)
                        .withOption('rowCallback', rowCallback)
                   .withTableTools('js/copy_csv_xls_pdf.swf')
            .withButtons([
            'print'
        ]);
                ;

            });
        }



        $scope.selectBean = function (xBean) {
            $scope.bean = xBean;
        }
        $scope.getUserBeans = function () {
            CRUDServices.getAllCustom('user').success(function (data) {
                $scope.users = data.result;
            });
        }
        $scope.getUserBeans();
        //Table
        $scope.dtColumns = [
            
            DTColumnBuilder.newColumn('id').withTitle('الكود'),
            DTColumnBuilder.newColumn('orgnizationBean.name').withTitle('الإسم'),
            DTColumnBuilder.newColumn('orgnizationBean.ownerBean.name').withTitle('المالك'),
            DTColumnBuilder.newColumn('orgnizationBean.activityBean.name').withTitle('النشاط'),
            DTColumnBuilder.newColumn('orgnizationBean.districtBean.name').withTitle('الحى'),
            DTColumnBuilder.newColumn('orgnizationBean.orgCode').withTitle('رقم البطاقة'),
            DTColumnBuilder.newColumn('orgnizationBean.lastVisitDate').withTitle('آخر زيارة').renderWith(function (data, type, full, meta) {
                var formatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic");
                return full['orgnizationBean']['lastVisitDate'] != null ? formatter.format(new Date(data)) : 'لم تتم الزيارة';
            })

        ];

        function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            if (aData.status == 0) {
               
            } else if (aData.status == 1) {
//                nRow.style.background='red';
//                nRow.style.color='white';
            }
            return nRow;
        }

       
    }]);




