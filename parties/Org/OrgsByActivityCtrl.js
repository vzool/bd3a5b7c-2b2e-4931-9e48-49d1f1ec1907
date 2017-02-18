
app.controller('orgByActivityCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', 'CRUDServices', 'setting', '$uibModal', function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, CRUDServices, setting, $uibModal) {

        var calendar = $.calendars.instance('ummalqura', 'ar');
        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(30.9887983, 41.0221916),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }

        $scope.map = new google.maps.Map(document.getElementById('map1'), mapOptions);
        $scope.activityselected = null;
        $scope.markers = [];

        var infoWindow = new google.maps.InfoWindow();

        var createMarker = function (info) {
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.lon),
                title: info.name
            });
            marker.content = '<div class="infoWindowContent">' + info.name + '</div>'+'<a href="#/orgs/'+info.id+'" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i>عرض المنشآة</a>';
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
                infoWindow.open($scope.map, marker);
            });

            $scope.markers.push(marker);

        }



        $scope.$on('$routeChangeSuccess', function () {
            google.maps.event.trigger($scope.map, 'resize');
        });


        $scope.openInfoWindow = function (e, selectedMarker) {
            e.preventDefault();
            google.maps.event.trigger(selectedMarker, 'click');
        }
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
        CRUDServices.methodLink = 'orgnization';


        $scope.getBeans = function () {
            CRUDServices.getAll().success(function (data) {
                console.log(data);
                $scope.beans = data.result;

                for (i = 0; i < $scope.beans.length; i++) {
                    $scope.beans[i].location = $scope.beans[i].lat + ',' + $scope.beans[i].lon;
                    console.log($scope.beans[i].location);
                    createMarker($scope.beans[i]);
                }
                $scope.dtOptions = DTOptionsBuilder.newOptions()
                        .withOption('data', data.result)
                        .withTableTools('js/copy_csv_xls_pdf.swf')
                        .withButtons([
                            'print'
                        ]);

            });
        }
//        $scope.getBeans();
        $scope.getActivityBeans = function () {
            CRUDServices.getAllCustom('activity').success(function (data) {
                $scope.activities = data.result;
                console.log($scope.activities);
            });
        }
        $scope.getActivityBeans();
        $scope.getOrgsByActivity = function (val) {
            return $http.get(setting.connection.url + 'orgnization/getByActivity?activityId=' + val, {headers: {'X-Auth-Token': setting.connection.sessionId}}).then(function (response) {
                console.log(response.data.result);
                $scope.beans = response.data.result;

                for (i = 0; i < $scope.beans.length; i++) {
                    $scope.beans[i].location = $scope.beans[i].lat + ',' + $scope.beans[i].lon;
                    console.log($scope.beans[i].location);
                    createMarker($scope.beans[i]);
                }
                $scope.dtOptions = DTOptionsBuilder.newOptions()
                        .withOption('data', response.data.result)
                        .withTableTools('js/copy_csv_xls_pdf.swf')
                        .withButtons([
                            'print'
                        ]);
            });
        };

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


            if ($scope.bean.id === null) {
                var base64Muni = $scope.muniImageBytes.split(',')[1];
                $scope.bean.muniImageBytes = base64Muni;
                var base64Org = $scope.orgImageBytes.split(',')[1];
                $scope.bean.orgImageBytes = base64Org;
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
        //Table
        $scope.dtColumns = [
//            DTColumnBuilder.newColumn(null).withTitle('الصورة').notSortable().renderWith(function (data, type, full, meta) {
//
//                var img = full['muniImage'] == null || full['muniImage'] == "" ? '/ReqabaWeb/images/user_placeholder.png' : full['muniImage']['name'];
//                return '<img width="45" src="' + img + '"/>';
//            }),
            DTColumnBuilder.newColumn('orgCode').withTitle('الكود'),
               DTColumnBuilder.newColumn(null).withTitle('الصورة').notSortable().renderWith(function (data, type, full, meta) {
                var imgUrl = full["orgImage"] != null ? full["orgImage"]["name"] : "";
                return '<button onclick=showImgDialog(`' + imgUrl + '`) class="btn btn-primary">الصورة</button>';
            }),
            DTColumnBuilder.newColumn('name').withTitle('الإسم'),
            DTColumnBuilder.newColumn('lastVisitDate').withTitle('آخر زيارة').renderWith(function (data, type, full, meta) {
                var formatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic");
                return formatter.format(new Date(data * 1000));
            }),
            DTColumnBuilder.newColumn('ownerBean.name').withTitle('المالك'),
            DTColumnBuilder.newColumn('activityBean.name').withTitle('النشاط'),
            DTColumnBuilder.newColumn('districtBean.name').withTitle('الحى'),
            DTColumnBuilder.newColumn('muniToDate').withTitle('إنتهاء الشهادة').renderWith(function (data, type, full, meta) {
                var formatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic");
                return formatter.format(new Date(data));
            }),
            DTColumnBuilder.newColumn(null).withTitle('حذف/تعديل').notSortable().renderWith(function (data, type, full, meta) {

                return '<a href="#/orgs/' + full["id"] + '" class="btn btn-primary btn-xs"><i class="fa fa-edit"></i> View </a>';
            })

        ];
        $scope.getOwner = function (owner) {
            CRUDServices.get('owner', owner).then(function (data) {
                $scope.owner = data.data.result;
                $scope.bean.ownerBean.id = $scope.owner.id;
                $scope.dtOptions = DTOptionsBuilder.newOptions()
                        .withOption('data', $scope.owner.orgnizations)
                        .withTableTools('js/copy_csv_xls_pdf.swf')
                        .withButtons([
                            'print'
                        ]);
            }, function (data) {
            });
        };
        function test() {
            alert('sdf');
        }
    }]);




