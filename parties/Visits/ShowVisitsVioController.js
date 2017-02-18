
app.controller('showVisitsVioCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', 'CRUDServices', 'VISITServices', function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, CRUDServices, VISITServices) {
        $scope.selectedViolation = {};

        $scope.searchBean = {
            "fromDate": new Date().getTime(),
            "vioTypeId": null,
            "unitId": null,
            "toDate": new Date().getTime()
        };
        var calendar = $.calendars.instance('ummalqura', 'ar');
        $('#fromDateVisitVio').calendarsPicker({calendar: calendar, onSelect: showFromDate});
        $('#toDateVisitVio').calendarsPicker({calendar: calendar, onSelect: showToDate});
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

        $scope.map = new google.maps.Map(document.getElementById('map3'), mapOptions);

        $scope.markers = [];

        var infoWindow = new google.maps.InfoWindow();

        var createMarker = function (info) {
            var marker = new google.maps.Marker({
                map: $scope.map,
                position: new google.maps.LatLng(info['orgnizationBean'].lat, info['orgnizationBean'].lon),
                title: info.name
            });
            marker.content = '<div class="infoWindowContent">   ' + info['orgnizationBean'].street + '</div>';

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
            $scope.searchBean.vioTypeId = $scope.selectedViolation.id;
            console.log($scope.searchBean);
            CRUDServices.postCustom("visit/getByViolation", $scope.searchBean).success(function (data) {
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
            CRUDServices.getAllCustom('vioType').success(function (data) {
                $scope.violations = data.result;
                console.log($scope.violations);
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
            }),
               DTColumnBuilder.newColumn(null).withTitle('المخالفة').notSortable().renderWith(function (data, type, full, meta) {
var imgUrl=full["destoriedRecord"];
                return '<button onclick=showImgDialog(`'+imgUrl+'`) class="btn btn-primary">المخالفة</button>';
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




