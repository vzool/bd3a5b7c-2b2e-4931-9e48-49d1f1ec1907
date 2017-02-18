
app.controller('orgLicenseCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', 'CRUDServices', '$base64', '$routeParams', 'setting', '$location', 'growl', '$uibModal', function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, CRUDServices, $base64, $routeParams, setting, $location, growl, $uibModal) {

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
            "street": ""
        };

        var calendar = $.calendars.instance('ummalqura', 'ar');
        $('#muniFromDate').calendarsPicker({calendar: calendar, onSelect: showMuniFromDate});
        $('#muniToDate').calendarsPicker({calendar: calendar, onSelect: showMuniToDate});
        function showMuniFromDate(date) {
            var am = moment(date[0].year() + '/' + date[0].month() + '/' + date[0].day(), 'hYYYY/hM/hD');
            $scope.bean.muniFromDate = am.toDate().getTime();

        }
        function showMuniToDate(date) {
            var am = moment(date[0].year() + '/' + date[0].month() + '/' + date[0].day(), 'hYYYY/hM/hD');
            console.log(am);
            console.log(am.toDate().getTime());
            $scope.bean.muniToDate = am.toDate().getTime();

        }

        CRUDServices.methodLink = 'orgnization';

        $scope.getBeans = function () {
            CRUDServices.getAll().success(function (data) {
                $scope.beans = data.result;

                $scope.dtOptions = DTOptionsBuilder.newOptions()
                        .withOption('data', data.result)
                   .withTableTools('js/copy_csv_xls_pdf.swf')
            .withButtons([
            'print'
        ]);
            });
        }
       
      
        $scope.refreshOrgs = function (name) {
            if (name == null)
                return [];
            if (name.length < 2)
                return [];
            return $http.get(
                    setting.connection.url + 'orgnization/search-by-name?name=' + name, {headers: {'X-Auth-Token': setting.connection.sessionId}}
            ).then(function (response) {
                $scope.orgs = response.data.result
            });
        };


        $scope.refreshCode = function (orgCode) {
            if (orgCode == null)
                return [];
            if (orgCode.length < 4)
                return [];
            return $http.get(
                    setting.connection.url + 'orgnization/search-by-code?orgCode=' + orgCode, {headers: {'X-Auth-Token': setting.connection.sessionId}}
            ).then(function (response) {
                $scope.orgs = response.data.result
            });
        };
//        $scope.getLocation = function (val) {
//            return $http.get(setting.connection.url + 'orgnization/search-by-name?name=' + val, {headers: {'X-Auth-Token': setting.connection.sessionId}}).then(function (response) {
//                return response.data.result;
//            });
//        };
//        $scope.getOwnerBeans();
        $scope.getActivitiesBeans = function () {
            CRUDServices.getAllCustom('activity').success(function (data) {
                $scope.activities = data.result;
            });
        }
        $scope.getActivitiesBeans();
        $scope.getDistrictsBeans = function () {
            CRUDServices.getAllCustom('district').success(function (data) {
                $scope.districts = data.result;
                console.log($scope.districts);
            });
        }
        $scope.getDistrictsBeans();

        $scope.getBean = function (id) {

            CRUDServices.get("orgnization", id).success(function (data) {
                $scope.bean = data.result;
               // $scope.getOwner($scope.bean.ownerBean.id);
                $('#muniFromDate').calendarsPicker({calendar: calendar, onSelect: showMuniFromDate});
                $('#muniToDate').calendarsPicker({calendar: calendar, onSelect: showMuniToDate});
            });
        }
        if ($routeParams.orgID !== null) {
            $scope.getBean($routeParams.orgID);
        }
        $scope.resetFields = function () {
            $scope.bean = {
                "activityBean": {},
                "districtBean": {},
                "employees": null,
                "id": null,
                "lastVisitDate": null,
                "lat": "",
                "lon": "",
                "muniFromDate": {},
                "muniImage": null,
                "muniImageBytes": "",
                "muniNo": "",
                "muniToDate": {},
                "name": "",
                "orgCode": null,
                "orgDocs": null,
                "orgImage": {},
                "orgImageBytes": "",
                "ownerBean": {},
                "street": ""
            };
        }

        $scope.saveBean = function () {
            console.log("test");
            console.log($scope.muniImageBytes);
            if ($scope.muniImageBytes != null) {
                var base64Muni = $scope.muniImageBytes.split(',')[1];
                $scope.bean.muniImageBytes = base64Muni;
            }
            if ($scope.orgImageBytes != null) {
                var base64Org = $scope.orgImageBytes.split(',')[1];
                $scope.bean.orgImageBytes = base64Org;
            }


            if ($scope.bean.id === null) {

                CRUDServices.add($scope.bean).success(function (data) {
                    growl.success('This is a success mesage.', {title: 'Success!'});

//                    $scope.getBeans();
                });
            } else {
                CRUDServices.update($scope.bean).success(function (data) {
                    growl.success('This is a success mesage.', {title: 'Success!'});

//                    $scope.getBeans();
                });

            }
//            $scope.resetFields();
        }

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
            DTColumnBuilder.newColumn('orgCode').withTitle('رقم البطاقة'),
            DTColumnBuilder.newColumn(null).withTitle('الصورة').notSortable().renderWith(function (data, type, full, meta) {
                var imgUrl = full["orgImage"] != null ? full["orgImage"]["name"] : "";
                return '<button onclick=showImgDialog(`' + imgUrl + '`) class="btn btn-primary">الصورة</button>';
            }),
            DTColumnBuilder.newColumn('name').withTitle('الإسم'),
            DTColumnBuilder.newColumn('activityBean.name').withTitle('النشاط'),
            DTColumnBuilder.newColumn('districtBean.name').withTitle('الحى'),
            DTColumnBuilder.newColumn(null).withTitle('التفاصيل').notSortable().renderWith(function (data, type, full, meta) {

                return '<a href="#/orgs/' + full["id"] + '" class="btn btn-primary btn-xs"><i class="fa fa-edit"></i> View </a>';
            })
        ];
     

        $scope.getLocation = function (val) {
            return $http.get(setting.connection.url + 'orgnization/search-by-name?name=' + val, {headers: {'X-Auth-Token': setting.connection.sessionId}}).then(function (response) {
                console.log(response.data.result);
                return response.data.result;
            });
        };
        $scope.onSelect = function (id) {
            $location.url('/orglic/' + id);
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


