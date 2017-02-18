/**
 * Created by Haytham on 11/22/2015.
 */
app.directive('icheck', function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr,ngModel) {
            scope.$watch(attr['ngModel'], function(newValue){
                elem.iCheck('update');
            })
            var value = attr['value'];
            elem.iCheck({radioClass: 'iradio_square-green',increaseArea: '20%'}).on('ifChanged', function(event) {

                return scope.$apply(function() {
                    return ngModel.$setViewValue(value);
                });


            });
        }
    }
});