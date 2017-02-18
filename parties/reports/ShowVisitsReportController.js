
app.controller('showVisitsReportCtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', 'CRUDServices', 'VISITServices', '$uibModal', function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, CRUDServices, VISITServices, $uibModal) {
        $scope.searchBean = {
            "fromDate": new Date().getTime(),
            "showDeleted": false,
            "toDate": new Date().getTime()
        };
        var calendar = $.calendars.instance('ummalqura', 'ar');
        $('#fromDateVisit').calendarsPicker({calendar: calendar, onSelect: showFromDate});
        $('#toDateVisit').calendarsPicker({calendar: calendar, onSelect: showToDate});
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
                title: info['orgnizationBean'].name
            });
            marker.content = '<div class="infoWindowContent">  المراقب :' + info['userBean'].name +
                    '<br> آخر زيارة : ' + info['orgnizationBean']['lastVisitDate'] +
                    '<br> <a href="#/orgs/' + info['orgnizationBean']['id'] + '" class="btn btn-primary btn-xs"> View </a>'
            '</div>';

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
        $scope.$on('$routeChangeSuccess', function () {
            console.log('change');
            google.maps.event.trigger($scope.map, 'resize');
        });

        $scope.getBeans = function () {
            CRUDServices.getAll().success(function (data) {
                $scope.beans = data.result;
                console.log($scope.beans);

                for (i = 0; i < $scope.beans.length; i++) {
                    $scope.beans[i].location = $scope.beans[i]['orgnizationBean'].lat + ',' + $scope.beans[i]['orgnizationBean'].lon;
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
        };

     showImgDialog = function (data) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalImg.html',
                controller: 'ModalInstanceCtrl',
                size: 10,
                resolve: {
                    items: function () {

                        return null;

                    },
                    data: function () {

                        return data;

                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
            }, function () {
            });
        };
        $scope.getBeansWithDate = function () {
            $scope.clearMarkers();
            console.log($scope.searchBean);
            VISITServices.getWithDate($scope.searchBean).success(function (data) {
                $scope.beans = data.result;
                console.log($scope.beans);

                for (i = 0; i < $scope.beans.length; i++) {
                    $scope.beans[i].location = $scope.beans[i]['orgnizationBean'].lat + ',' + $scope.beans[i]['orgnizationBean'].lon;
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
        
         
   
        //Table
        $scope.dtColumns = [
     DTColumnBuilder.newColumn('id').withTitle('id'),
            DTColumnBuilder.newColumn('orgnizationBean.name').withTitle('المنشآة'),
                 DTColumnBuilder.newColumn(null).withTitle('الصورة').notSortable().renderWith(function (data, type, full, meta) {
                var imgUrl = full["orgnizationBean"]["orgImage"] != null ? full["orgnizationBean"]["orgImage"]["name"] : "";
                return '<button onclick=showImgDialog(`' + imgUrl + '`) class="btn btn-primary">الصورة</button>';
            }),
            DTColumnBuilder.newColumn('orgnizationBean.ownerBean.name').withTitle('المالك'),
            DTColumnBuilder.newColumn('userBean.name').withTitle('المراقب'),
            DTColumnBuilder.newColumn('violations.length').withTitle('المخالفات'),
            DTColumnBuilder.newColumn(null).withTitle('بيانات المنشآة').notSortable().renderWith(function (data, type, full, meta) {

                return '<a href="#/orgs/' + full["orgnizationBean"]["id"] + '" class="btn btn-primary btn-xs"><i class="fa fa-edit"></i> View </a>';
            }),
            DTColumnBuilder.newColumn(null).withTitle('المخالفة').notSortable().renderWith(function (data, type, full, meta) {
                var imgUrl = full["destoriedRecord"];
                return '<button onclick=showImgDialog(`'+imgUrl+'`) class="btn btn-primary">الصورة</button>';
            }),
            DTColumnBuilder.newColumn(null).withTitle('الإتلافية').notSortable().renderWith(function (data, type, full, meta) {
                var imgUrl = full["violationRecord"];
                return '<button onclick=showImgDialog(`' + imgUrl + '`) class="btn btn-primary">الصورة</button>';
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
        };
   
    }]);




