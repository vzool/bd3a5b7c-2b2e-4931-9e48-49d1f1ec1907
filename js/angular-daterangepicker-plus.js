/*
 * @license Angular-DateRangePicker-Plus v0.1.16
 */
(function () {
    var picker;

    picker = angular.module('daterangepicker', []);

    picker.value('dateRangePickerConfig', {
        separator: ' - ',
        format: 'YYYY-MM-DD'
    });

    picker.directive('dateRangePicker', ['$compile', '$timeout', '$parse', 'dateRangePickerConfig', function ($compile, $timeout, $parse, dateRangePickerConfig) {
        return {
            require: 'ngModel',
            restrict: 'A',
            scope: {
                dateMin: '=min',
                dateMax: '=max',
                model: '=ngModel',
                opts: '=options'
            },
            link: function ($scope, element, attrs, modelCtrl) {
                var el, opts, _formatted, _init, _picker, _validateMax, _validateMin;
                el = $(element);
                opts = angular.extend({}, dateRangePickerConfig, $scope.opts);
                _picker = null;

                var setStartDate = function (newValue) {
                    $timeout(function () {
                        var m = moment(newValue);
                        if (_picker.endDate < m)
                            _picker.setEndDate(m);
			if(newValue)
			    _picker.setStartDate(m);
                    });
                };

                var setEndDate = function (newValue) {
                    $timeout(function () {
                        var m = moment(newValue);
                        if (_picker.startDate > m)
                            _picker.setStartDate(m);
			if(newValue)
                            _picker.setEndDate(m);
                    });
                };

                $scope.$watch('model.startDate', function (newValue) {
                    setStartDate(newValue);
                });

                $scope.$watch('model.endDate', function (newValue) {
                    setEndDate(newValue);
                });
                
                _formatted = function (viewVal) {
                    var f;
                    f = function (date) {
                        if (!moment.isMoment(date)) {
                            return moment(date).format(opts.format);
                        }
                        return date.format(opts.format);
                    };
                    if (opts.singleDatePicker) {
                        return f(viewVal.startDate);
                    } else {
                        return [f(viewVal.startDate), f(viewVal.endDate)].join(opts.separator);
                    }
                };

                _validateMin = function (min, start) {
                    var valid;
                    min = moment(min);
                    start = moment(start);
                    valid = min.isBefore(start) || min.isSame(start, 'day');
                    modelCtrl.$setValidity('min', valid);
                    return valid;
                };

                _validateMax = function (max, end) {
                    var valid;
                    max = moment(max);
                    end = moment(end);
                    valid = max.isAfter(end) || max.isSame(end, 'day');
                    modelCtrl.$setValidity('max', valid);
                    return valid;
                };

                modelCtrl.$formatters.push(function (val) {
                    if (val && val.startDate && val.endDate) {
                        setStartDate(val.startDate);
                        setEndDate(val.endDate);
                        return val;
                    }
                    return '';
                });

                modelCtrl.$parsers.unshift(function (val) {
                    if (!angular.isObject(val) || !(val.hasOwnProperty('startDate') && val.hasOwnProperty('endDate'))) {
                        return modelCtrl.$modelValue;
                    }
                    if ($scope.dateMin && val.startDate) {
                        _validateMin($scope.dateMin, val.startDate);
                    } else {
                        modelCtrl.$setValidity('min', true);
                    }
                    if ($scope.dateMax && val.endDate) {
                        _validateMax($scope.dateMax, val.endDate);
                    } else {
                        modelCtrl.$setValidity('max', true);
                    }
                    return val;
                });

                modelCtrl.$isEmpty = function (val) {
                    return !val || (val.startDate === null || val.endDate === null);
                };

                modelCtrl.$render = function () {
                    if (!modelCtrl.$modelValue) {
                        return el.val('');
                    }
                    if (modelCtrl.$modelValue.startDate === null) {
                        return el.val('');
                    }
                    return el.val(_formatted(modelCtrl.$modelValue));
                };

                _init = function () {
                    el.daterangepicker(opts, function (start, end, label) {
                        return $timeout(function () {
                            modelCtrl.$setViewValue({
                                startDate: start,
                                endDate: end
                            });
                            return modelCtrl.$render();
                        });
                    });
                    _picker = el.data('daterangepicker');
                    return el;
                };

                _init();

                el.change(function () {
                    if ($.trim(el.val()) === '') {
                        return $timeout(function () {
                            return modelCtrl.$setViewValue({
                                startDate: null,
                                endDate: null
                            });
                        });
                    }
                });

                if (attrs.min) {
                    $scope.$watch('dateMin', function (date) {
                        if (date) {
                            if (!modelCtrl.$isEmpty(modelCtrl.$modelValue)) {
                                _validateMin(date, modelCtrl.$modelValue.startDate);
                            }
                            opts['minDate'] = moment(date);
                        } else {
                            opts['minDate'] = false;
                        }
                        return _init();
                    });
                }

                if (attrs.max) {
                    $scope.$watch('dateMax', function (date) {
                        if (date) {
                            if (!modelCtrl.$isEmpty(modelCtrl.$modelValue)) {
                                _validateMax(date, modelCtrl.$modelValue.endDate);
                            }
                            opts['maxDate'] = moment(date);
                        } else {
                            opts['maxDate'] = false;
                        }
                        return _init();
                    });
                }

                if (attrs.options) {
                    $scope.$watch('opts', function (newOpts) {
                        opts = angular.extend(opts, newOpts);
                        return _init();
                    });
                }

                return $scope.$on('$destroy', function () {
                    return _picker.remove();
                });
            }
        };
    }]);

}).call(this);