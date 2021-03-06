
app.controller('showOrgsEviCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', 'CRUDServices', 'VISITServices', '$uibModal', function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, CRUDServices, VISITServices, $uibModal) {
        $scope.selectedUnit = {};

        $scope.searchBean = {
            "fromDate": new Date().getTime(),
            "vioTypeId": null,
            "unitId": null,
            "toDate": new Date().getTime()
        };
        var calendar = $.calendars.instance('ummalqura', 'ar');
        $('#fromDateEvi').calendarsPicker({calendar: calendar, onSelect: showFromDate});
        $('#toDateEvi').calendarsPicker({calendar: calendar, onSelect: showToDate});
        function showFromDate(date) {
            var jd = calendar.toJD(date[0].year(), date[0].month(), date[0].day());
            var gCal = $.calendars.instance("gregorian");
            var mdate = gCal.fromJD(jd);
            $scope.searchBean.fromDate = gCal.toJSDate(mdate).getTime();

        }
        function showToDate(date) {
            var jd = calendar.toJD(date[0].year(), date[0].month(), date[0].day());
            var gCal = $.calendars.instance("gregorian");
            var mdate = gCal.fromJD(jd);
            $scope.searchBean.toDate = gCal.toJSDate(mdate).getTime();

        }
        var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(30.9887983, 41.0221916),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        }

        $scope.map = new google.maps.Map(document.getElementById('map4'), mapOptions);

        $scope.markers = [];

        var infoWindow = new google.maps.InfoWindow();

        var createMarker = function (info) {
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info.lat, info.lon),
                title: info.name
            });
            marker.content = '<div class="infoWindowContent">   ' + info.street + '</div>';

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

        CRUDServices.methodLink = 'visit';



        $scope.getBeansWithDate = function () {
            $scope.clearMarkers();
            $scope.searchBean.unitId = $scope.selectedUnit.id;
            console.log($scope.searchBean);
            CRUDServices.postCustom("orgnization/getByViolation", $scope.searchBean).success(function (data) {
                $scope.beans = data.result;
                console.log($scope.beans);

                for (i = 0; i < $scope.beans.length; i++) {
                    $scope.beans[i].location = $scope.beans[i].lat + ',' + $scope.beans[i].lon;
                    createMarker($scope.beans[i]);
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
            CRUDServices.getAllCustom('unit').success(function (data) {
                $scope.units = data.result;
                console.log($scope.units);
            });
        }
        $scope.getUserBeans();
        //Table
        $scope.dtColumns = [
            DTColumnBuilder.newColumn('id').withTitle('الكود'),
               DTColumnBuilder.newColumn(null).withTitle('الصورة').notSortable().renderWith(function (data, type, full, meta) {
                var imgUrl = full["orgImage"] != null ? full["orgImage"]["name"] : "";
                return '<button onclick=showImgDialog(`' + imgUrl + '`) class="btn btn-primary">الصورة</button>';
            }),
            DTColumnBuilder.newColumn('name').withTitle('الإسم'),
            DTColumnBuilder.newColumn('ownerBean.name').withTitle('المالك'),
            DTColumnBuilder.newColumn('activityBean.name').withTitle('النشاط'),
            DTColumnBuilder.newColumn('districtBean.name').withTitle('الحى'),
            DTColumnBuilder.newColumn('orgCode').withTitle('رقم البطاقة'),
            DTColumnBuilder.newColumn('lastVisitDate').withTitle('آخر زيارة').renderWith(function (data, type, full, meta) {
                var formatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic");
                return full['lastVisitDate'] != null ? formatter.format(new Date(data)) : 'لم تتم الزيارة';
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

        $scope.clearMarkers = function () {
            for (var i = 0; i < $scope.markers.length; i++) {
                $scope.markers[i].setMap(null);
            }
            $scope.markers = [];
        }
    }]);




