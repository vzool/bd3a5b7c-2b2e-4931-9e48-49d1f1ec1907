

app.controller('usersCont', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder','DTColumnDefBuilder', '$http', 'CRUDServices', '$base64', '$uibModal', function ($scope, DTOptionsBuilder, DTColumnBuilder,DTColumnDefBuilder, $http, CRUDServices, $base64, $uibModal) {

        $scope.enabled = true;
        $scope.onOff = true;
        $scope.yesNo = true;
        $scope.violations = [];
        $scope.bean = {"id": null,
            "education": "",
            "name": "",
            "password": "",
            "profileImage": null,
            "profileImageByte": null,
            "userType": true,
            "shiftCode": null,
            "dailyVisits": null,
            "lastDistrict": null,
            "districtCountMonth": null,
            "loginType":0
        };
        $scope.doClick = function () {
            alert("Clicked button !")
        }
        CRUDServices.methodLink = 'user';
//        $scope.dtColumns = [
//            DTColumnDefBuilder.newColumnDef(0),
//            DTColumnDefBuilder.newColumnDef(1),
//            DTColumnDefBuilder.newColumnDef(2),
//            DTColumnDefBuilder.newColumnDef(3),
//            DTColumnDefBuilder.newColumnDef(4).notSortable().renderWith(function (data, type, full, meta) {
//
//                var img = full['profileImage'] == null ? '/ReqabaWeb/images/user_placeholder.png' : full['profileImage']['name'];
//                return '<img width="70" src="' + img + '"/>';
//            }),
//            DTColumnDefBuilder.newColumnDef(5).withTitle('الحالة').notSortable()
//                    .renderWith(function (data, type, full, meta) {
//                        return '<button type="button" ng-click="doClick()">Send</button>';
//                    }),
//            DTColumnDefBuilder.newColumnDef(6)
//        ];


        $scope.getBeans = function () {
            CRUDServices.getAll().success(function (data) {
                $scope.beans = data.result;

//                $scope.dtOptions = DTOptionsBuilder.newOptions()
//                        .withOption('data', data.result)
//                        $scope.dtOptions .withPaginationType('full_numbers');
//                        $scope.dtOptions .withBootstrap();
                        

            });
        }
        $scope.getBeans();

        $scope.resetFields = function () {
            $scope.bean = {"id": null,
                "education": "",
                "name": "",
                "password": "",
                "profileImage": null,
                "profileImageByte": null,
                "userType": true,
                "shiftCode": null,
                "dailyVisits": null,
                "lastDistrict": null,
                "districtCountMonth": null
            };
        }

        $scope.saveBean = function () {
            if ($scope.bean.id === null) {
                if ($scope.previewImage != null) {
                    var base64result = $scope.previewImage.split(',')[1];
                    $scope.bean.profileImageByte = base64result;
                }
                CRUDServices.add($scope.bean).success(function (data) {

                    $scope.getBeans();
                });
            } else {
                CRUDServices.update($scope.bean).success(function (data) {
                    $scope.getBeans();
                });

            }
            $scope.resetFields();
        }

        $scope.selectBean = function (xBean) {
            $scope.bean = xBean;
        }
        $scope.disableUser = function (xBean) {
          xBean.userType=!xBean.userType;
            CRUDServices.update(xBean).success(function (data) {
                    $scope.getBeans();
                });
        }
        $scope.animationsEnabled = true;

      
        $scope.toggleAnimation = function (x) {
            alert('sdf');
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };


    }]);


