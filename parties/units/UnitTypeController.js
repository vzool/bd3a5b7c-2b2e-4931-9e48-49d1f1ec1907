
app.controller('unitTypeCtrl', ['$scope', '$http', 'CRUDServices', '$routeParams', 'growl', function ($scope, $http, CRUDServices, $routeParams, growl) {
    $scope.bean = {"id": null, "name": ""};
    CRUDServices.methodLink = 'unit';
    $scope.getBeans = function () {
        CRUDServices.getAll().success(function (data) {
            $scope.beans = data.result;

        });
    }
    $scope.getBeans();

    $scope.resetFields = function () {
        $scope.bean = {"id": null, "name": ""};
    }

    $scope.saveBean = function () {
        if ($scope.bean.id === null) {
            CRUDServices.add($scope.bean).success(function (data) {
                growl.success('تمت الإضافة بنجاح ', {title: 'عملية ناجحة!'});

                $scope.getBeans();
            });
        } else {
            CRUDServices.update($scope.bean).success(function (data) {
                $scope.getBeans();
                growl.success('تمت تحديثة بنجاح ', {title: 'عملية ناجحة!'});

            });

        }
        $scope.resetFields();
    }

    $scope.selectBean = function (xBean) {
        $scope.bean = xBean;
    }
}]);
