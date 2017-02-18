
app.controller('userLoginFailCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', 'CRUDServices', 'VISITServices', function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, CRUDServices, VISITServices) {

       

        CRUDServices.methodLink = 'visit';



        $scope.getLoginFail= function () {
            
            CRUDServices.getData("login_log/getall",null).success(function (data) {
                $scope.beans = data.result;
        

                
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

$scope.getLoginFail();

       
        //Table
        $scope.dtColumns = [
            
            DTColumnBuilder.newColumn('id').withTitle('الكود'),
            DTColumnBuilder.newColumn('ip').withTitle('العنوان'),
            DTColumnBuilder.newColumn('date').withTitle('التاريخ').renderWith(function (data, type, full, meta) {
                var formatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic");
                return full['date']!= null ? formatter.format(new Date(data)) : '-';
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




