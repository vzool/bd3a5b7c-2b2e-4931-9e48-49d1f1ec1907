
app.controller('empKPICtrl', ['$scope', 'DTOptionsBuilder', 'DTColumnBuilder', '$http', 'CRUDServices', '$base64', '$routeParams', 'setting', '$location', 'growl', '$uibModal', function ($scope, DTOptionsBuilder, DTColumnBuilder, $http, CRUDServices, $base64, $routeParams, setting, $location, growl, $uibModal) {
        $scope.years = [1436, 1437, 1438, 1439, 1440, 1441, 1442, 1443, 1444, 1445];
        $scope.months = [{"name": 'محرم', "value": 1}, {"name": 'صفر', "value": 2}, {"name": 'ربيع الأول', "value": 3}, {"name": 'ربيع الثانى', "value": 4}, {"name": 'جمادى الأول', "value": 5}, {"name": 'جمادى الآخر', "value": 6}, {"name": 'رجب', "value": 7}, {"name": 'شعبان', "value": 8}, {"name": 'رمضان', "value": 9}, {"name": 'شوال', "value": 10}, {"name": 'ذو القعدة', "value": 11}, {"name": 'ذو الحجة', "value": 12}];
        $scope.selectedUser = {};
        $scope.selectedYear = null;
        $scope.selectedMonth = null;
        $scope.search = {
            "fromMonth": 1,
            "hijriYear": $scope.selectedYear,
            "toMonth": 12,
            "userId": $scope.selectedUser.id

        }
        $scope.empActions = [];
        initData();
        var calendar = $.calendars.instance('ummalqura', 'ar');

//setInterval(function test(){
//    $scope.visitCount.push( Math.floor((Math.random() * 100) + 1));
//        $scope.violationCount.push( Math.floor((Math.random() * 100) + 1));
//    $scope.alarmCount.push( Math.floor((Math.random() * 100) + 1));
//    $scope.violationCost.push( Math.floor((Math.random() * 100) + 1));
//
//   echartBarLine.setOption({ series: [{
//                    name: 'جولات',
//                    type: 'bar',
//                    data: $scope.visitCount
//                }, {
//                    name: 'عدد مخالفات',
//                    type: 'bar',
//                    data: $scope.violationCount
//                }, {
//                    name: 'عدد انذارات',
//                    type: 'bar',
//                    data: $scope.alarmCount
//                }, {
//                    name: 'قيمة مخالفات',
//                    type: 'line',
//                    yAxisIndex: 1,
//                    data: $scope.violationCost
//                }]
//    });
//    
//}, 1000);

       function initData(){
                   $scope.visitCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.violationCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.alarmCount = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        $scope.violationCost = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
       }
        $scope.getUserBeans = function () {
            CRUDServices.getAllCustom('user').success(function (data) {
                $scope.users = data.result;
                console.log($scope.users);
            });
        };
        $scope.getUserBeans();
        var theme = {
            color: [
                '#26B99A', '#34495E', '#BDC3C7', '#3498DB',
                '#9B59B6', '#8abb6f', '#759c6a', '#bfd3b7'
            ],
            title: {
                itemGap: 8,
                textStyle: {
                    fontWeight: 'normal',
                    color: '#408829'
                }
            },
            dataRange: {
                color: ['#1f610a', '#97b58d']
            },
            toolbox: {
                color: ['#408829', '#408829', '#408829', '#408829']
            },
            tooltip: {
                backgroundColor: 'rgba(0,0,0,0.5)',
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        color: '#408829',
                        type: 'dashed'
                    },
                    crossStyle: {
                        color: '#408829'
                    },
                    shadowStyle: {
                        color: 'rgba(200,200,200,0.3)'
                    }
                }
            },
            dataZoom: {
                dataBackgroundColor: '#eee',
                fillerColor: 'rgba(64,136,41,0.2)',
                handleColor: '#408829'
            },
            grid: {
                borderWidth: 0
            },
            categoryAxis: {
                axisLine: {
                    lineStyle: {
                        color: '#408829'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: ['#eee']
                    }
                }
            },
            valueAxis: {
                axisLine: {
                    lineStyle: {
                        color: '#408829'
                    }
                },
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: ['#eee']
                    }
                }
            },
            timeline: {
                lineStyle: {
                    color: '#408829'
                },
                controlStyle: {
                    normal: {color: '#408829'},
                    emphasis: {color: '#408829'}
                }
            },
            k: {
                itemStyle: {
                    normal: {
                        color: '#68a54a',
                        color0: '#a9cba2',
                        lineStyle: {
                            width: 1,
                            color: '#408829',
                            color0: '#86b379'
                        }
                    }
                }
            },
            map: {
                itemStyle: {
                    normal: {
                        areaStyle: {
                            color: '#ddd'
                        },
                        label: {
                            textStyle: {
                                color: '#c12e34'
                            }
                        }
                    },
                    emphasis: {
                        areaStyle: {
                            color: '#99d2dd'
                        },
                        label: {
                            textStyle: {
                                color: '#c12e34'
                            }
                        }
                    }
                }
            },
            force: {
                itemStyle: {
                    normal: {
                        linkStyle: {
                            strokeColor: '#408829'
                        }
                    }
                }
            },
            chord: {
                padding: 4,
                itemStyle: {
                    normal: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        },
                        chordStyle: {
                            lineStyle: {
                                width: 1,
                                color: 'rgba(128, 128, 128, 0.5)'
                            }
                        }
                    },
                    emphasis: {
                        lineStyle: {
                            width: 1,
                            color: 'rgba(128, 128, 128, 0.5)'
                        },
                        chordStyle: {
                            lineStyle: {
                                width: 1,
                                color: 'rgba(128, 128, 128, 0.5)'
                            }
                        }
                    }
                }
            },
            gauge: {
                startAngle: 225,
                endAngle: -45,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: [[0.2, '#86b379'], [0.8, '#68a54a'], [1, '#408829']],
                        width: 8
                    }
                },
                axisTick: {
                    splitNumber: 10,
                    length: 12,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: 'auto'
                    }
                },
                splitLine: {
                    length: 18,
                    lineStyle: {
                        color: 'auto'
                    }
                },
                pointer: {
                    length: '90%',
                    color: 'auto'
                },
                title: {
                    textStyle: {
                        color: '#333'
                    }
                },
                detail: {
                    textStyle: {
                        color: 'auto'
                    }
                }
            },
            textStyle: {
                fontFamily: 'Arial, Verdana, sans-serif'
            }
        };
        var echartBarLine = echarts.init(document.getElementById('mainb'), theme);
        echartBarLine.setOption({
            title: {
                x: 'center',
                y: 'top',
                padding: [0, 0, 20, 0],
                text: 'قياس آداء موظف',
                textStyle: {
                    fontSize: 15,
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {
                        show: true,
                        readOnly: false,
                        title: "Text View",
                        lang: [
                            "Text View",
                            "Close",
                            "Refresh",
                        ],
                    },
                    restore: {
                        show: true,
                        title: 'Restore'
                    },
                    saveAsImage: {
                        show: true,
                        title: 'Save'
                    }
                }
            },
            calculable: true,
            legend: {
                data: ['جولات', 'عدد مخالفات', 'عدد انذارات', 'قيمة مخالفات'],
                y: 'bottom'
            },
            xAxis: [{
                    type: 'category',
                    data: ['محرم', 'صفر', 'ربيع 1', 'ربيع2', 'جمادى', 'جمادى2', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذوالقعدة', 'ذوالحجة']
                }],
            yAxis: [{
                    type: 'value',
                    name: 'العدد',
                    axisLabel: {
                        formatter: '{value}'
                    }
                }, {
                    type: 'value',
                    name: 'Hours',
                    axisLabel: {
                        formatter: '{value}'
                    }
                }],
            series: [{
                    name: 'عدد المحلات',
                    type: 'bar',
                    data: $scope.visitCount
                }, {
                    name: 'عدد مخالفات',
                    type: 'bar',
                    data: $scope.violationCount
                }, {
                    name: 'عدد انذارات',
                    type: 'bar',
                    data: $scope.alarmCount
                }, {
                    name: 'قيمة مخالفات',
                    type: 'line',
                    yAxisIndex: 1,
                    data: $scope.violationCost
                }]
        });
        CRUDServices.methodLink = 'report';
        console.log(echartBarLine);
        $scope.getReport = function () {
            $scope.search.userId = $scope.selectedUser.id;
            $scope.search.hijriYear = $scope.selectedYear;
            if ($scope.search.userId == null)
                return [];
            if ($scope.search.hijriYear == null)
                return [];
            CRUDServices.customMethod("monthly-analysis-report-for-user", $scope.search).success(function (data) {
                $scope.empActions = data.result;
                initData();
                for (i = 0; i < $scope.empActions.length; i++) {
                    var eachBean=$scope.empActions[i];
                      $scope.visitCount[eachBean.hijriMonth-1]=eachBean.visitCount;
                $scope.violationCount[eachBean.hijriMonth-1]=eachBean.violationCount;
                $scope.alarmCount[eachBean.hijriMonth-1]=eachBean.alarmCount;
                $scope.violationCost[eachBean.hijriMonth-1]=eachBean.violationCost;

                }
              
                echartBarLine.setOption({series: [{
                            name: 'جولات',
                            type: 'bar',
                            data: $scope.visitCount
                        }, {
                            name: 'عدد مخالفات',
                            type: 'bar',
                            data: $scope.violationCount
                        }, {
                            name: 'عدد انذارات',
                            type: 'bar',
                            data: $scope.alarmCount
                        }, {
                            name: 'قيمة مخالفات',
                            type: 'line',
                            yAxisIndex: 1,
                            data: $scope.violationCost
                        }]
                });

            });
        };
        $scope.testExp = function () {
            console.log("test export");
            $('#test').tableExport({type: 'png', escape: 'false'});
        }

        $scope.onSelect = function (id) {
            $location.url('/orgs/' + id);
        };
    }]);


